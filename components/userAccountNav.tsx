"use client";

import type { User } from "next-auth";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

type Props = {
  user: Pick<User, "name" | "image" | "email">;
};

const UserAccountNav = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          className="w-10 h-10"
          user={{
            name: user.name || null,
            image: user.image || null,
          }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white dark:bg-black" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium text-zinc-700 dark:text-zinc-300">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-zinc-700 dark:text-zinc-300">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/" className="text-zinc-700 dark:text-zinc-300">Home</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            signOut()
          }}
          className="text-red-600 cursor-pointer"
        >
          Sign out
          <LogOut className="w-4 h-4 ml-1 " />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
