import { Attendance } from "./rsvp";

// Single RSVP item for table display
export interface RSVPItem {
    id: string;
    name: string;
    attendance: Attendance;
    guestCount: number;
    message: string;
    createdAt: string;
    invitationId: string;
    invitationName: string;
}

// Statistics for RSVP summary
export interface RSVPStats {
    totalAttending: number;
    totalNotAttending: number;
    totalGuests: number;
}

// Filter state for RSVP table
export interface RSVPFiltersState {
    invitationId: string;
    searchQuery: string;
}

// Invitation option for filter dropdown
export interface InvitationOption {
    id: string;
    name: string;
}
