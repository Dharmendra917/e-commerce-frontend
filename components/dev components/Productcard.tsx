import { useState } from "react";
import { Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  image: {
    url: string;
  };
}

interface ProductCardProps {
  product: Product;
  onUpdateProduct: (productId: string) => void;
  onDeleteProduct: (productId: string) => void;
  isForm: boolean;
  setIsForm: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdateForm: boolean;
  setIsUpdateForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ProductCard({
  product,
  onUpdateProduct,
  onDeleteProduct,
  isForm,
  setIsForm,
  isUpdateForm,
  setIsUpdateForm,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { isAdmin } = useSelector(
    (state: { user: { isAdmin: boolean } }) => state.user
  );

  const discountedPrice = product.price * (1 - 10 / 100);

  const handleUpdateProduct = () => {
    setIsUpdateForm(true);
    onUpdateProduct(product._id);
  };

  const handleDeleteProduct = () => {
    onDeleteProduct(product._id);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-4">
        <div className="relative">
          <img
            src={product.image.url}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md"
          />
          {!isAdmin && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart
                className={isWishlisted ? "fill-current text-red-500" : ""}
              />
            </Button>
          )}
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{product.description}</p>
          <div className="flex items-center justify-between mt-2">
            <div>
              <span className="text-lg font-bold">${discountedPrice}</span>
              {product.discountPercentage > 0 && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  ${product.price}
                </span>
              )}
            </div>
            {product.discountPercentage > 0 && (
              <span className="text-sm font-semibold text-green-600">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
          </div>
        </div>
      </CardContent>
      {isAdmin ? (
        <CardFooter className="p-4 pt-0 grid gap-1">
          <Button className="w-full" onClick={handleUpdateProduct}>
            Update Product
          </Button>
          <Button className="w-full" onClick={handleDeleteProduct}>
            Delete Product
          </Button>
        </CardFooter>
      ) : (
        <CardFooter className="p-4 pt-0">
          <Button className="w-full">Add to Cart</Button>
        </CardFooter>
      )}
    </Card>
  );
}
