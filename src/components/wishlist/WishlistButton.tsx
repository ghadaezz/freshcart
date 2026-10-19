

"use client";

import { Heart } from "lucide-react";
import { useState, useTransition, useContext } from "react";
import { toast } from "sonner";
import {
  addToWishlist,
  removeWishlistProduct,
} from "@/actions/wishlist.action";
import { WishlistContext } from "@/context/wishlistContext";

type WishlistButtonProps = {
  productId: string;
  initialIsWishlisted?: boolean;
};

export default function WishlistButton({
  productId,
  initialIsWishlisted = false,
}: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);
  const [isPending, startTransition] = useTransition();

  const { handleWishlist: refreshWishlist } = useContext(WishlistContext);

  function handleWishlist() {
    startTransition(async () => {
      try {
        const result = isWishlisted
          ? await removeWishlistProduct(productId)
          : await addToWishlist(productId);

        if (result?.status === "success") {
          const newIsWishlisted = !isWishlisted;

          setIsWishlisted(newIsWishlisted);

          // تحديث عدد منتجات الـ Wishlist في الـ Navbar
          await refreshWishlist();

          toast.success(
            newIsWishlisted
              ? "Added to wishlist"
              : "Removed from wishlist"
          );
        } else {
          toast.error(result?.message || "Something went wrong");
        }
      } catch {
        toast.error("Please login to use your wishlist");
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleWishlist}
      disabled={isPending}
      aria-label={
        isWishlisted ? "Remove from wishlist" : "Add to wishlist"
      }
      className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-all duration-200 hover:scale-110 disabled:opacity-50"
    >
      <Heart
        size={21}
        className={`transition-colors duration-200 ${
          isWishlisted
            ? "fill-red-500 text-red-500"
            : "text-gray-600 hover:text-red-500"
        }`}
      />
    </button>
  );
}
