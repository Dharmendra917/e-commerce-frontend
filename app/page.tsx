"use client";
import Navbar from "@/components/dev components/Nav";
import { ProductCard } from "@/components/dev components/Productcard";
import { asyncShowProducts } from "@/store/action/productAction";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const { user, isAdmin } = useSelector((state: any) => state);
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const fetchData = async () => {
    const res = await dispatch(asyncShowProducts());
    setProducts(res.products);
  };
  useEffect(() => {
    fetchData();
    isAdmin ? router.push("/admin") : router.push("/");
  }, []);
  return (
    <>
      <Navbar />
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
                onUpdateProduct={() => {}}
                onDeleteProduct={() => {}}
                isForm={false}
                setIsForm={() => {}}
                isUpdateForm={false}
                setIsUpdateForm={() => {}}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
