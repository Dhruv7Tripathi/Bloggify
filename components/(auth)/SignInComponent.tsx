"use client";
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function Home() {
  const [formData] = useState({
    email: '',
    password: '',
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}