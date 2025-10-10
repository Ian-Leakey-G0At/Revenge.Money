'use client';

import Image from 'next/image';

export function AuthImage() {
  return (
    <div className="hidden lg:block lg:w-1/2">
        <div className="relative w-full h-full">
            <Image
                src="https://images.unsplash.com/photo-1590000533592-28c9441712a2?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Aesthetic minimalist object"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-r-lg"
            />
        </div>
    </div>
  );
}
