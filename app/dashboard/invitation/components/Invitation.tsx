"use client";

import { InvitationProps } from "@/src/types";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import { InvitationCard } from "./InvitationCard";

export function Invitation({ mode, invitations }: InvitationProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const weddingInvs =
    invitations &&
    invitations
      .filter((i) => i.type === "wedding")
      .filter((data) =>
        data.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
  const metatahInvs =
    invitations &&
    invitations
      .filter((i) => i.type === "metatah")
      .filter((data) =>
        data.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <Tabs defaultValue="wedding" className="h-full w-full space-y-5">
      <div className="flex gap-5">
        <Input
          placeholder="Filter undangan..."
          className="h-9 w-40 lg:w-[250px]"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <TabsList>
          <TabsTrigger value="wedding">Wedding</TabsTrigger>
          <TabsTrigger value="metatah">Metatah</TabsTrigger>
        </TabsList>
      </div>

      <Separator className="shadow-sm" />

      <TabsContent value="wedding" className="overflow-y-auto hide-scrollbar">
        <InvitationCard mode={mode} invitations={weddingInvs} />
      </TabsContent>

      <TabsContent value="metatah" className="overflow-y-auto hide-scrollbar">
        <InvitationCard mode={mode} invitations={metatahInvs} />
      </TabsContent>
    </Tabs>
  );
}
