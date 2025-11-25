"use client";

import { InvitationProps } from "@/src/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, Sparkles, SquarePen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function InvitationCard({ mode, invitations }: InvitationProps) {
  const router = useRouter();
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-2">
      {invitations.map((data, idx) => (
        <Card className="w-full h-full relative" key={idx}>
          {/* Corner Badge */}
          {data.expired && (
            <div className="absolute -right-0 -top-0">
              <Badge variant={"outline"} className="rounded-sm bg-amber-300 text-black h-7">
                Kadaluarsa
              </Badge>
            </div>
          )}
          <CardContent className="p-3">
            <div className="mb-5">
              {data.image ? (
                <Link
                  href={
                    data.urlInvitation
                      ? data.urlInvitation
                      : data.urlTemplate ?? ""
                  }
                >
                  <Image
                    src={data.image}
                    alt={`image-${data.name}`}
                    width={250}
                    height={250}
                    className="object-cover object-center rounded-md h-full w-full"
                  />
                </Link>
              ) : (
                <div className="aspect-square rounded-md bg-gray-100">
                  <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
                    No Image
                  </div>
                </div>
              )}
            </div>
            <CardTitle className="text-sm mb-1">{data.name}</CardTitle>
            <CardDescription className="text-xs mb-2 line-clamp-2">
              {data.description}
            </CardDescription>
            <div className="flex items-center space-x-1 mb-2">
              <span className="text-xs text-muted-foreground capitalize">
                {data.type}
              </span>
            </div>
            <div className="flex items-center justify-end">
              {mode === "create" ? (
                <Button
                  size="sm"
                  className="text-xs px-2 py-1 h-8 flex items-center gap-2"
                  onClick={() => {
                    router.push(`/checkout?templateId=${data.templateId}`);
                  }}
                >
                  <PlusCircle className="h-4 w-4" />
                  Gunakan Template
                </Button>
              ) : (
                <>
                  {!data.expired ? (
                    <Button
                      size="sm"
                      className="text-sm px-2 py-1 h-8 flex items-center gap-2"
                      onClick={() => {
                        router.push(
                          `/dashboard/invitation/edit?invitationId=${data.invitationId}`
                        );
                      }}
                    >
                      <SquarePen className="h-4 w-4" />
                      Edit undangan
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="text-sm px-2 py-1 h-8 flex items-center gap-2"
                      onClick={() => {
                        router.push(
                          `/checkout/upgrade?invitationId=${data.invitationId}`
                        );
                      }}
                    >
                      <Sparkles className="h-4 w-4" />
                      Upgrade undangan
                    </Button>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
