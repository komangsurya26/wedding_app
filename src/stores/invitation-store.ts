"use client";

import { create } from "zustand";
import { Invitation as InvitationTypes } from "@/src/types";
import { toast } from "sonner";

interface InvitationState {
  invitations: InvitationTypes[];
  loading: boolean;
  error: string | null;
  fetchInvitations: () => Promise<void>;
  setInvitations: (data: InvitationTypes[]) => void;
}

export const useInvitationStore = create<InvitationState>((set) => ({
  invitations: [],
  loading: false,
  error: null,

  // set invitations langsung
  setInvitations: (data) => set({ invitations: data }),

  // fetch invitations dari API
  fetchInvitations: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/invitations", {
        credentials: "include",
        cache: "no-store",
      });
      const json = await res.json();

      const data: InvitationTypes[] = json.data.map((item: any) => ({
        invitationId: item.id,
        name: item.invitation_name,
        templateType: item.template_type,
        image: item.image,
        expired: item.expires_at
          ? new Date() > new Date(item.expires_at)
          : false,
        urlInvitation: item.invitation_url,
        templateId: item.template_id,
        slug: item.slug
      }));

      set({ invitations: data });
    } catch (err) {
      toast.warning("Terjadi Kesalahan");
      set({ error: "Gagal memuat invitations" });
    } finally {
      set({ loading: false });
    }
  },
}));
