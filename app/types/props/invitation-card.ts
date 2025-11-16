export type Invitation = {
    templateId?: number | string; //invitationId atau templateId
    invitationId?: number | string;
    urlInvitation?: string
    urlTemplate?: string
    name: string;
    description?: string;
    type?: string;
    image?: string;
    expired?: boolean;
};

export type InvitationProps = {
    mode?: "create" | "my";
    invitations: Invitation[];
};