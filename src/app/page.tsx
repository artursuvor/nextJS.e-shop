import React, { Suspense } from "react";
import ProductCard from "../components/Product";
import { getProducts, Product } from "@/data/data"; 

export default async function Home() {
  const products: Product[] = await getProducts();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="mt-10 w-full max-w-6xl">
        <h2 className="text-2xl font-semibold mb-5">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
