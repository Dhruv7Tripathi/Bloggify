// "use client";
// import { useState } from 'react';
// import Head from 'next/head';
// import Image from 'next/image';
// import { Button } from "@/components/ui/button";
// import { signIn } from "next-auth/react";

// export default function Home() {
//   const [formData] = useState({
//     email: '',
//     password: '',
//   });
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//   };

//   return (
//     <>
//       <Head>
//         <title>Bloggify- Everything you need</title>
//         <meta name="description" content="Create content like never before" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <div className="flex h-screen w-full">
//         <div className="relative flex-1 hidden lg:block">
//           <div className="absolute top-8 left-8 z-10">
//             <span className="text-white text-2xl font-bold">Bloggify</span>
//           </div>
//           <div className="absolute inset-0 flex items-center z-10 px-16">
//             <div>
//               <h1 className="text-white text-5xl font-bold leading-tight mb-6">
//                 Everything you need,<br />
//                 to make anything you want.
//               </h1>
//               <p className="text-white text-xl opacity-90">
//                 Dozens of creative tools to ideate, generate and edit<br />
//                 content like never before.
//               </p>
//             </div>
//           </div>
//           <div className="absolute inset-0 bg-black bg-opacity-60 z-[1]"></div>

//           <Image
//             src="/city-background.jpg"
//             alt="City skyline"
//             fill
//             className="object-cover"
//             priority
//           />
//         </div>
//         <div className="flex-1 flex items-center justify-center p-8 bg-gray-500">
//           <div className="w-full max-w-md">
//             <h2 className="text-3xl font-bold text-center mb-6 text-black">Welcome to Bloggify</h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
// <Button
//   type="button"
//   className="w-full flex items-center text-black justify-center gap-2 border border-gray-300 font-medium py-3 px-4 rounded-full transition duration-300"
//   onClick={() => {
//     signIn("google", { callbackUrl: "/" });
//   }}
// >
//   <Image src="/google.webp" alt="Google" width={20} height={20} />
//   Log in with Google
// </Button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
"use client"

import * as React from "react"
import { Button } from "../ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";
export default function SignIn1() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignIn = () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    alert("Sign in successful! (Demo)");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] relative overflow-hidden w-full rounded-xl">
      {/* Centered glass card */}
      <div className="relative z-10 w-full max-w-sm rounded-3xl bg-gradient-to-r from-[#ffffff10] to-[#121212] backdrop-blur-sm  shadow-2xl p-8 flex flex-col items-center">
        {/* Logo */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-6 shadow-lg">
          <img src="/logo.jpg" className="rounded-sm " />
        </div>
        {/* Title */}
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Bloggify
        </h2>
        {/* Form */}
        <div className="flex flex-col w-full gap-4">
          <div className="w-full flex flex-col gap-3">

            {error && (
              <div className="text-sm text-red-400 text-left">{error}</div>
            )}
          </div>
          <hr className="opacity-10" />
          <div>
            {/* Google Sign In */}
            <Button
              type="button"
              className="w-full flex items-center text-black justify-center gap-2 border border-gray-300 font-medium py-3 px-4 rounded-full transition duration-300"
              onClick={() => {
                signIn("google", { callbackUrl: "/" });
              }}
            >
              <Image src="/google.webp" alt="Google" width={20} height={20} />
              Log in with Google
            </Button>

          </div>
        </div>
      </div>
      {/* User count and avatars */}
      <div className="relative z-10 mt-12 flex flex-col items-center text-center">
        <p className="text-gray-400 text-sm mb-2">
          Join <span className="font-medium text-white">thousands</span> of
          developers who are already using Bloggify.
        </p>
        <div className="flex">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="user"
            className="w-8 h-8 rounded-full border-2 border-[#181824] object-cover"
          />
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="user"
            className="w-8 h-8 rounded-full border-2 border-[#181824] object-cover"
          />
          <img
            src="https://randomuser.me/api/portraits/men/54.jpg"
            alt="user"
            className="w-8 h-8 rounded-full border-2 border-[#181824] object-cover"
          />
          <img
            src="https://randomuser.me/api/portraits/women/68.jpg"
            alt="user"
            className="w-8 h-8 rounded-full border-2 border-[#181824] object-cover"
          />
        </div>
      </div>
    </div>
  );
};
