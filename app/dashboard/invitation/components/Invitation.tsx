"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvitationCard, InvitationCardProps } from "./InvitationCard";
import { TemplateType } from "@/src/types";

export function Invitation({ mode, invitations }: InvitationCardProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const basic =
    invitations &&
    invitations
      .filter((i) => i.templateType === TemplateType.BASIC)
      .filter((data) =>
        data.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
  const premium =
    invitations &&
    invitations
      .filter((i) => i.templateType === TemplateType.PREMIUM)
      .filter((data) =>
        data.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
  const vip =
    invitations &&
    invitations
      .filter((i) => i.templateType === TemplateType.VIP)
      .filter((data) =>
        data.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <Tabs defaultValue={TemplateType.BASIC} className="h-full w-full space-y-5">
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
          <TabsTrigger value={TemplateType.BASIC}>Basic</TabsTrigger>
          <TabsTrigger value={TemplateType.PREMIUM}>Premium</TabsTrigger>
          <TabsTrigger value={TemplateType.VIP}>VIP</TabsTrigger>
        </TabsList>
      </div>

      <Separator className="shadow-sm" />

      <TabsContent
        value={TemplateType.BASIC}
        className="overflow-y-auto hide-scrollbar"
      >
        <InvitationCard mode={mode} invitations={basic} />
      </TabsContent>

      <TabsContent
        value={TemplateType.PREMIUM}
        className="overflow-y-auto hide-scrollbar"
      >
        <InvitationCard mode={mode} invitations={premium} />
      </TabsContent>
      <TabsContent
        value={TemplateType.VIP}
        className="overflow-y-auto hide-scrollbar"
      >
        <InvitationCard mode={mode} invitations={vip} />
      </TabsContent>
    </Tabs>
  );
}
