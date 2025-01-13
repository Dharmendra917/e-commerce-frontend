"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  //   ShoppingCart,
  Search,
  ShoppingCart,
  UserCircle,
  //   UserCircle,
} from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { asyncCurrentUser, asyncSignoutUser } from "@/store/action/userAction";

const Navbar = () => {
  const [token, setToken] = useState<string | null>(null);
  const { isAuthenticated, isAdmin, user } = useSelector(
    (state: any) => state.user
  );
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (storedToken) {
      dispatch(asyncCurrentUser(storedToken));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      isAdmin && router.push("/admin");
    }
  }, [isAdmin, isAuthenticated, router]);

  const Signout = async () => {
    if (token) {
      const res = await dispatch(asyncSignoutUser(token));
      router.push("/");
      localStorage.removeItem("token");
      setToken(null);
    }
  };

  return (
    <header className="border-b">
      <div className="max-w-[85%] mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex  items-center">
          <div className="text-2xl font-extrabold text-primary ">Logo</div>
        </div>
        <div className="flex items-center justify-between  md:gap-10 lg:gap-20">
          <nav className="hidden md:flex md:gap-5 lg:gap-10">
            <Link href="/" className="text-primary">
              Home
            </Link>
            <Link href="#" className="hover:text-primary">
              Categories
            </Link>
            <Link href="#" className="hover:text-primary">
              Explore
            </Link>
            <Link href="#" className="hover:text-primary">
              About
            </Link>
            <Link href="#" className="hover:text-primary">
              Blog
            </Link>
            <Link href="#" className="hover:text-primary">
              Contact Us
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="secondary" size="icon">
              <Search className="h-5 w-5" color="#64748B" />
            </Button>
            <Link href={"/cart"} className="relative">
              <span className="absolute -top-2 -right-2 text-white bg-red-500 rounded-full text-[10px] px-[5px]">
                {/* {cart.length} */}
                cart
              </span>
              <Button size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            {isAuthenticated ? (
              <div className="flex gap-1 items-center">
                <Button variant="secondary" size="icon">
                  <UserCircle className="h-5 w-5" color="#64748B" />
                </Button>
                <h2>{user?.name}</h2>
                <Button
                  onClick={Signout}
                  className="bg-red-500"
                  variant="secondary"
                >
                  Signout
                </Button>
              </div>
            ) : (
              <Link href={"signin"}>
                <h2>Signin</h2>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
