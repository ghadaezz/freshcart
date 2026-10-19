
import { getUserWishlist } from "@/actions/wishlist.action";
import WishlistProducts from "@/components/wishlist/WishlistProducts";

export default async function WishlistPage() {
  const result = await getUserWishlist();

  if (result?.status !== "success") {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">My Wishlist</h1>
        <p className="mt-3 text-gray-500">
          Could not load your wishlist.
        </p>
      </div>
    );
  }

  const products = result.data || [];

  return (
    <main className="container mx-auto px-4 py-10 mt-16 ">


      {products.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <p className="text-lg font-semibold">
            Your wishlist is empty
          </p>
          <p className="mt-2 text-gray-500">
            Add products you love and find them here.
          </p>
        </div>
      ) : (
        <WishlistProducts products={products} />
      )}
    </main>
  );
}
