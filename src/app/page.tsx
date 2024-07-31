import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const Product = dynamic(() => import("../components/prodcuts"), {
  suspense: true,
});

const products = [
  {
    imageSrc: "/product1.jpg",
    altText: "Product 1",
    name: "Product 1",
    price: "$19.99"
  },
  {
    imageSrc: "/product2.jpg",
    altText: "Product 2",
    name: "Product 2",
    price: "$29.99"
  },
  {
    imageSrc: "/product3.fwejpg",
    altText: "Product 3",
    name: "Product 3",
    price: "$39.99"
  },
  {
    imageSrc: "/product4.jpg",
    altText: "Product 4",
    name: "Product 4",
    price: "$49.99"
  }
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="mt-10 w-full max-w-6xl">
        <h2 className="text-2xl font-semibold mb-5">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Suspense fallback={<div>Loading...</div>}>
            {products.map((product, index) => (
              <Product
                key={index}
                imageSrc={product.imageSrc}
                altText={product.altText}
                name={product.name}
                price={product.price}
              />
            ))}
          </Suspense>
        </div>
      </section>
    </div>
  );
}
