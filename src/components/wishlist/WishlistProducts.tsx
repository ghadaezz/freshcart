
"use client";

import { useContext, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { removeWishlistProduct } from "@/actions/wishlist.action";
import { WishlistContext } from "@/context/wishlistContext";
import AddProductToCartBtn from "@/components/cart/AddProductToCartBtn";

type WishlistProduct = {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  category?: {
    name: string;
  };
};

type Props = {
  products: WishlistProduct[];
};

export default function WishlistProducts({ products }: Props) {
  const [wishlist, setWishlist] = useState(products);
  const [isPending, startTransition] = useTransition();

  const { handleWishlist } = useContext(WishlistContext);

  async function handleRemove(productId: string) {
    try {
      const result = await removeWishlistProduct(productId);

      if (result?.status === "success") {
        setWishlist((prev) =>
          prev.filter((product) => product._id !== productId)
        );

        await handleWishlist();

        toast.success("Product removed from wishlist");
      } else {
        toast.error(result?.message || "Could not remove product");
      }
    } catch {
      toast.error("Something went wrong");
    }
  }

  async function handleAddToCartSuccess(productId: string) {
    try {
      const result = await removeWishlistProduct(productId);

      if (result?.status !== "success") {
        toast.error(
          "Added to cart, but could not remove from wishlist"
        );
        return;
      }

      setWishlist((prev) =>
        prev.filter((product) => product._id !== productId)
      );

      await handleWishlist();

      toast.success("Product removed from wishlist");
    } catch {
      toast.error(
        "Added to cart, but could not remove from wishlist"
      );
    }
  }

  return (
    <div>
      {/* Wishlist heading */}
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
          <Heart className="fill-red-500 text-red-500" size={25} />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            My Wishlist
          </h1>

          <p className="text-sm text-gray-500">
            {wishlist.length} items saved
          </p>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="rounded-xl border border-dashed p-12 text-center">
          <Heart className="mx-auto mb-4 text-gray-300" size={42} />

          <h2 className="text-xl font-semibold">
            Your wishlist is empty
          </h2>

          <p className="mt-2 text-gray-500">
            Add your favorite products and find them here.
          </p>

          <Link
            href="/products"
            className="mt-5 inline-flex rounded-lg bg-primary px-6 py-3 font-semibold text-white"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead className="bg-gray-50 text-sm text-gray-500">
                <tr>
                  <th className="px-6 py-5 font-medium">Product</th>

                  <th className="px-6 py-5 font-medium">Price</th>

                  <th className="px-6 py-5 text-right font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {wishlist.map((product) => (
                  <tr
                    key={product._id}
                    className="border-t border-gray-100 transition-colors hover:bg-gray-50/70"
                  >
                    {/* Product image and name */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/products/${product._id}`}
                          className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white p-2"
                        >
                          <Image
                            src={product.imageCover}
                            alt={product.title}
                            width={100}
                            height={100}
                            className="h-full w-full object-contain"
                          />
                        </Link>

                        <div className="min-w-0">
                          <Link
                            href={`/products/${product._id}`}
                            className="font-medium text-gray-900 hover:text-primary"
                          >
                            {product.title}
                          </Link>

                          {product.category?.name && (
                            <p className="mt-1 text-sm text-gray-400">
                              {product.category.name}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="whitespace-nowrap px-6 py-5">
                      <span className="font-semibold text-gray-900">
                        {product.price} EGP
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <AddProductToCartBtn
                          productId={product._id}
                          onSuccess={() =>
                            handleAddToCartSuccess(product._id)
                          }
                          className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                        >
                          <ShoppingCart size={16} />
                          Add to Cart
                        </AddProductToCartBtn>

                        <button
                          type="button"
                          onClick={() => {
                            startTransition(() => {
                              void handleRemove(product._id);
                            });
                          }}
                          disabled={isPending}
                          aria-label="Remove from wishlist"
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-1 text-sm text-gray-500 transition hover:text-primary"
          >
            ← Continue Shopping
          </Link>
        </>
      )}
    </div>
  );
}
