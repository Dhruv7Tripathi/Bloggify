"use client"
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <Image
        src="/logo.jpg"
        alt="Logo"
        width={150}
        height={150}
        className="animate-spin-slow"
      />
    </div>
  );
}