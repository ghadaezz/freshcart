
"use client";

import { getUserWishlist } from "@/actions/wishlist.action";
import { useSession } from "next-auth/react";
import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";

type WishlistContextType = {
  noOfWishlistItems: number;
  handleWishlist: () => Promise<void>;
};

export const WishlistContext = createContext<WishlistContextType>({
  noOfWishlistItems: 0,
  handleWishlist: async () => {},
});

export default function WishlistContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();

  const [noOfWishlistItems, setNoOfWishlistItems] = useState(0);

  const handleWishlist = useCallback(async () => {
    if (status !== "authenticated") {
      setNoOfWishlistItems(0);
      return;
    }

    try {
      const data = await getUserWishlist();

      setNoOfWishlistItems(data.data.length);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setNoOfWishlistItems(0);
    }
  }, [status]);

  useEffect(() => {
    if (status !== "authenticated") return;

    let cancelled = false;

    getUserWishlist()
      .then((data) => {
        if (!cancelled) setNoOfWishlistItems(data.data.length);
      })
      .catch((error) => {
        console.error("Error fetching wishlist:", error);
        if (!cancelled) setNoOfWishlistItems(0);
      });

    return () => {
      cancelled = true;
    };
  }, [status]);

  return (
    <WishlistContext.Provider
      value={{
        noOfWishlistItems:
          status === "authenticated" ? noOfWishlistItems : 0,
        handleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
