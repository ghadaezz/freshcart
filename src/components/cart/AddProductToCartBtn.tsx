
"use client";

import { addToCart } from "@/actions/cart.action";
import { useContext, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { cartContext } from "@/context/cartContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {
  productId: string;
  children: ReactNode;
  className?: string;
  onSuccess?: () => Promise<void> | void;
};

export default function AddProductToCartBtn({
  productId,
  children,
  className,
  onSuccess,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const { handleCart } = useContext(cartContext) as {
    handleCart: () => void;
  };

  const router = useRouter();

  async function addProduct() {
    try {
      setIsLoading(true);

      const data = await addToCart(productId);

      toast.success(data.message);

      handleCart();

      await onSuccess?.();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      type="button"
      onClick={addProduct}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? <Spinner /> : children}
    </Button>
  );
}
