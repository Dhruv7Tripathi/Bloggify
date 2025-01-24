"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

type Props = { text: string };

const SignInButton = ({ text }: Props) => {
  return (
    <Button>
      <Link href="/signin">
        {text}
      </Link>
    </Button>
  );
};

export default SignInButton;