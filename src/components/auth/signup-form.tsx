'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import React from 'react';
import { AuthImage } from './auth-image';

const GoogleIcon = () => (
    <svg className="h-5 w-5 mr-2" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20z"></path>
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 35.245 44 30.024 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
    </svg>
);

export function SignupForm() {
  const { toast } = useToast();
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
        title: "Signup Successful (Mock)",
        description: "You have been successfully signed up.",
      })
  }
  
  return (
    <div className="flex flex-col lg:flex-row w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-lg bg-card">
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
            <div className="flex items-center mb-6">
                 <Link href="/" passHref>
                    <Button variant="ghost" size="icon" className="mr-2">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold font-headline text-center flex-grow">
                    Create an Account
                </h1>
            </div>
            <form onSubmit={handleSignup} className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Divyesh B" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                    id="email"
                    type="email"
                    placeholder="divyesh.b@example.com"
                    required
                    />
                </div>
                <div className="grid gap-2 relative">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type={passwordVisible ? "text" : "password"} placeholder="********" />
                     <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-8"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                        {passwordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                </div>
                <Button type="submit" className="w-full mt-4">
                    Sign Up
                </Button>
            </form>
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                    OR
                    </span>
                </div>
            </div>
            <Button variant="outline" className="w-full" type="button">
                <GoogleIcon />
                Sign up with Google
            </Button>
            <div className="mt-6 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="font-bold text-primary">
                    Log in
                </Link>
            </div>
        </div>
        <AuthImage />
    </div>
  );
}
