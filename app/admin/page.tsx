"use client";
import Adminavbar from "@/components/dev components/Adminnav";
import React, { useEffect, useState } from "react";
import { ProductCard } from "@/components/dev components/Productcard";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncDeleteProducts,
  asyncShowProducts,
} from "@/store/action/productAction";
import { ProductForm } from "@/components/dev components/forms/Addproduct";
import { Button } from "@/components/ui/button";
import { UpdateProduct } from "@/components/dev components/forms/Updateproduct";
import { useRouter } from "next/navigation";

interface UpdateProductProps {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: {
    url: string;
  };
}

const page = () => {
  const { isAdmin } = useSelector((state: any) => state.user);
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [isForm, setIsForm] = useState(false);
  const [isUpdateForm, setIsUpdateForm] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<UpdateProductProps | null>(null);
  const dispatch = useDispatch();

  // console.log(products, "empty");
  const fetchData = async () => {
    const res = await dispatch(asyncShowProducts());
    setProducts(res.products);
  };
  useEffect(() => {
    fetchData();
    isAdmin ? router.push("/admin") : router.push("/");
  }, [isForm, isUpdateForm, dispatch]);

  const handleUpdateProduct = (product: any) => {
    setSelectedProduct(product);
    setIsUpdateForm(true);
  };

  const handleDeleteProduct = async (productId: any) => {
    const resp = await dispatch(asyncDeleteProducts(productId));

    await fetchData();
  };

  return (
    <div>
      <Adminavbar />
      <div className="p-1">
        <h1>Admin...</h1>
        <div className="flex justify-end pb-1">
          <Button
            onClick={(e) => {
              setIsForm(true);
            }}
          >
            Add Product
          </Button>
        </div>
        {isForm ? <ProductForm setIsForm={setIsForm} /> : ""}
        {isUpdateForm && selectedProduct ? (
          <UpdateProduct
            product={selectedProduct}
            setIsUpdateForm={setIsUpdateForm}
          />
        ) : (
          ""
        )}
        <hr />
        {products.length == 0 ? (
          <h3>No Product Found...</h3>
        ) : (
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">All Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onUpdateProduct={() => handleUpdateProduct(product)}
                  onDeleteProduct={() => handleDeleteProduct(product._id)}
                  isForm={isForm}
                  setIsForm={setIsForm}
                  isUpdateForm={isUpdateForm}
                  setIsUpdateForm={setIsUpdateForm}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
