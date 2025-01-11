"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import {
  //   ShoppingCart,
  UserCircle,
  //   UserCircle,
} from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { asyncCurrentUser, asyncSignoutUser } from "@/store/action/userAction";

const Adminavbar = () => {
  const { cart } = useSelector((state: any) => state);
  const { isAuthenticated, isAdmin, user } = useSelector(
    (state: any) => state.user
  );
  const router = useRouter();
  console.log(isAuthenticated, ";ldfgkdf;");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncCurrentUser());
    console.log("navv effect", isAdmin, isAuthenticated);
    if (isAuthenticated) {
      isAdmin && router.push("/admin");
    }
  }, [isAdmin, isAuthenticated]);

  const Signout = async () => {
    const res = await dispatch(asyncSignoutUser());
    router.push("/");
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
          </nav>
          <div className="flex items-center gap-4">
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
        </div>
      </div>
    </header>
  );
};

export default Adminavbar;
