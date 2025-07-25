"use client"

import { Lock, Mail, User } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { Button } from "../ui/button";
import Spinner from "../ui/spiner";
import UseLogin from "./hooks/login-hook";

export default function LoginPage() {
  const { errors, isPending, onSubmit, register } = UseLogin();
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="shadow-2xl  dark:bg-gray-800 p-10 rounded-xl space-y-6">
        <div className="flex flex-col gap-3 items-center">
          <h1 className="font-bold text-3xl">Welcome Back</h1>
          <p className="text-xl">Sign in to continue your fitness journey</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-lg">
              Username/Email
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-6 w-6 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Enter your username/email"
                className="pl-10 h-12 !text-lg"
                {...register("identity")}
              />
            </div>
            <p className="text-red-500 text-sm">{errors.identity?.message}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-lg">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-6 w-6 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                className="pl-10 h-12 !text-lg"
                {...register("password")}
              />
            </div>
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>
          <Button className="w-full" disabled={isPending} type="submit">
            {isPending ? <Spinner /> : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
