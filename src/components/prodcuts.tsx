import Image from "next/image";

interface ProductProps {
  imageSrc: string;
  altText: string;
  name: string;
  price: string;
}

const Product: React.FC<ProductProps> = ({ imageSrc, altText, name, price }) => {
  return (
    <div className="border p-5 rounded-lg">
      <Image
        src={imageSrc}
        alt={altText}
        width={200}
        height={200}
        className="w-full h-auto mb-3"
      />
      <h3 className="text-lg font-medium">{name}</h3>
      <p className="text-gray-600">{price}</p>
      <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded">
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
