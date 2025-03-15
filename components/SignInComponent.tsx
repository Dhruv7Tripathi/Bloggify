"use client";
// import React from "react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { signIn } from "next-auth/react";

// const SignInComponent = () => {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
//       <Card className="w-[90%] p-1 rounded-lg bg-gradient-to-br from-white via-gray-200 to-white shadow-2xl shadow-slate-900 sm:w-[400px] space-y-3">
//         <div className="relative h-32 bg-gradient-to-r from-blue-700 to-blue-200 dark:to-black">
//           <div className="absolute inset-0 bg-black opacity-20"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Image
//               src="/logo.webp"
//               width={80}
//               height={80}
//               alt="Logo"
//               className="rounded-full bg-white p-2"
//             />
//           </div>
//         </div>
//         <CardHeader>
//           <CardTitle className="text-center text-3xl font-bold text-gray-800 dark:text-gray-900">
//             Welcome
//           </CardTitle>
//           <CardDescription className="text-center text-[14px] text-gray-800 dark:text-gray-900">
//             Sign in to access your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col gap-2">
//             <Button
//               className="gap-2 font-semibold"
//               variant="outline"
//               onClick={() => {
//                 signIn("google", { callbackUrl: "/" });
//               }}
//             >
//               <Image src="/google.webp" width={22} height={22} alt="google" />
//               Continue with Google
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default SignInComponent;
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
// import Link from 'next/link';
import { signIn } from "next-auth/react";

export default function Home() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your authentication logic here
  };

  return (
    <>
      <Head>
        <title>Bloggify- Everything you need</title>
        <meta name="description" content="Create content like never before" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex h-screen w-full">
        <div className="relative flex-1 hidden lg:block">
          <div className="absolute top-8 left-8 z-10">
            <span className="text-white text-2xl font-bold">Bloggify</span>
          </div>
          <div className="absolute inset-0 flex items-center z-10 px-16">
            <div>
              <h1 className="text-white text-5xl font-bold leading-tight mb-6">
                Everything you need,<br />
                to make anything you want.
              </h1>
              <p className="text-white text-xl opacity-90">
                Dozens of creative tools to ideate, generate and edit<br />
                content like never before.
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-60 z-[1]"></div>

          <Image
            src="/city-background.jpg"
            alt="City skyline"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex-1 flex items-center justify-center p-8 bg-gray-500">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-center mb-6 text-black">Welcome to Bloggify</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="email"
                  placeholder="Username or Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full flex items-center text-black justify-center gap-2 border border-gray-300 font-medium py-3 px-4 rounded-md hover:bg-gray-50 transition duration-300"
                  required
                />
              </div>

              {/* <Button
                className="gap-2 font-semibold"
                variant="outline"
                onClick={() => {
                  signIn("google", { callbackUrl: "/" });
                }}
              >
                <Image src="/google.png" width={10} height={10} alt="google" />
                Continue with Google
              </Button> */}

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-black text-sm">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <Button
                type="button"
                className="w-full flex items-center text-white justify-center gap-2 border border-gray-300 font-medium py-3 px-4 rounded-full transition duration-300"
                onClick={() => {
                  signIn("google", { callbackUrl: "/" });
                }}
              >
                <Image src="/google.webp" alt="Google" width={20} height={20} />
                Log in with Google
              </Button>

              {/* <div className="text-center mt-6">
                <Link href="/forgot-password" className="text-gray-600 hover:text-gray-800">
                  Forgot Password
                </Link>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}