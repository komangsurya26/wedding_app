"use client";

import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function ProfileAvatar({ user }: { user: any }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <GalleryVerticalEnd className="size-4" />;
  }

  return (
    <>
      {user?.avatar_url ? (
        <Image
          src={user.avatar_url}
          alt={"Avatar"}
          width={32}
          height={32}
          className="size-6 rounded-full object-cover"
        />
      ) : (
        <GalleryVerticalEnd className="size-4" />
      )}
    </>
  );
}
