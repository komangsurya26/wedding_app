"use client";

import { Invitation } from "@/src/types";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, Sparkles, SquarePen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChangeTemplate } from "./ChangeTemplate";

export type InvitationCardProps = {
  mode?: "all" | "mine";
  invitations: Invitation[] | [];
};

export function InvitationCard({ mode, invitations }: InvitationCardProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {invitations &&
        invitations.map((data, idx) => (
          <Card className="w-full h-full relative" key={idx}>
            {/* Corner Badge */}
            {data.expired && (
              <div className="absolute -right-0 -top-0">
                <Badge
                  variant={"outline"}
                  className="rounded-sm bg-amber-300 text-black h-7"
                >
                  Kedaluwarsa
                </Badge>
              </div>
            )}
            <CardContent>
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
              <CardTitle className="mb-1 flex justify-center">
                {data.name}
              </CardTitle>
              {data.description && (
                <CardDescription className="text-xs mb-1 line-clamp-2 flex justify-center">
                  {data.description}
                </CardDescription>
              )}
              {data.urlInvitation && (
                <CardDescription className="text-xs mb-1 text-center">
                  <Link
                    href={data.urlInvitation}
                    className="underline break-all"
                  >
                    {data.urlInvitation}
                  </Link>
                </CardDescription>
              )}
              <div className="flex items-center justify-center space-x-1 mb-4">
                <span className="text-sm text-muted-foreground uppercase">
                  {data.type}
                </span>
              </div>
              <div className="flex items-center justify-center">
                {mode === "all" ? (
                  <div className="w-full">
                    <Link
                      className="text-sm h-9 flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
                      href={`/checkout?templateId=${data.templateId}`}
                    >
                      <PlusCircle className="h-4 w-4" />
                      Gunakan Template
                    </Link>
                  </div>
                ) : (
                  <>
                    {!data.expired ? (
                      <div className="flex flex-col w-full gap-2">
                        <Link
                          className="text-sm h-9 flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
                          href={`/dashboard/invitation/edit?invitationId=${data.invitationId}`}
                        >
                          <SquarePen className="h-4 w-4" />
                          Edit Undangan
                        </Link>
                        <ChangeTemplate invitation={data} />
                      </div>
                    ) : (
                      <div className="w-full">
                        <Link
                          className="text-sm h-9 flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
                          href={`/checkout/?invitationId=${data.invitationId}`}
                        >
                          <Sparkles className="h-4 w-4" />
                          Aktifkan Undangan
                        </Link>
                      </div>
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
