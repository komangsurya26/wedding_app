"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { RSVPItem, RSVPFiltersState, InvitationOption, RSVPStats as RSVPStatsType } from "@/types";
import { RSVPStats } from "./RSVPStats";
import { RSVPFilters } from "./RSVPFilters";
import { RSVPTable } from "./RSVPTable";
import { MessageModal } from "./MessageModal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useInvitationStore } from "@/stores/invitation-store";
import { fetchAllUserRSVPs } from "@/actions/rsvp-actions";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

export function RSVPSection() {
    const [loading, setLoading] = useState(true);
    const [rsvpData, setRsvpData] = useState<RSVPItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<RSVPItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filters, setFilters] = useState<RSVPFiltersState>({
        invitationId: "all",
        searchQuery: "",
    });

    // Get invitations from store
    const invitations = useInvitationStore((state) => state.invitations);
    const fetchInvitations = useInvitationStore((state) => state.fetchInvitations);

    // Convert to invitation options for filter
    const invitationOptions: InvitationOption[] = useMemo(() => {
        return invitations.map((inv) => ({
            id: String(inv.invitationId),
            name: inv.name || "Undangan",
        }));
    }, [invitations]);

    // Load RSVPs from database
    const loadRSVPs = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchAllUserRSVPs();
            // Transform data to match RSVPItem type
            const transformed: RSVPItem[] = data.map((item) => ({
                id: String(item.id),
                name: item.name,
                attendance: item.attendance === "yes" ? "Hadir" : "Tidak Hadir",
                guestCount: item.guest_count,
                message: item.message || "",
                createdAt: item.created_at,
                invitationId: String(item.invitation_id),
                invitationName: item.invitation_name,
            }));
            setRsvpData(transformed);
        } catch (err) {
            toast.error("Gagal memuat data RSVP");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchInvitations();
        loadRSVPs();
    }, [fetchInvitations, loadRSVPs]);

    // Calculate stats
    const stats: RSVPStatsType = useMemo(() => {
        const attending = rsvpData.filter((item) => item.attendance === "Hadir");
        const notAttending = rsvpData.filter((item) => item.attendance === "Tidak Hadir");
        const totalGuests = rsvpData.reduce((acc, item) => acc + item.guestCount, 0);

        return {
            totalAttending: attending.length,
            totalNotAttending: notAttending.length,
            totalGuests,
        };
    }, [rsvpData]);

    // Filter data
    const filteredData = useMemo(() => {
        return rsvpData.filter((item) => {
            // Filter by invitation
            if (filters.invitationId !== "all" && item.invitationId !== filters.invitationId) {
                return false;
            }
            // Filter by search query
            if (filters.searchQuery) {
                const query = filters.searchQuery.toLowerCase();
                return item.name.toLowerCase().includes(query);
            }
            return true;
        });
    }, [rsvpData, filters]);

    const handleViewMessage = (item: RSVPItem) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Data RSVP</CardTitle>
                        <CardDescription>
                            Daftar konfirmasi kehadiran dan ucapan dari tamu undangan
                        </CardDescription>
                    </div>
                    <div>
                        <Button variant="outline" className="ml-auto" onClick={loadRSVPs}>
                            <RefreshCw className="mr-2 h-4 w-4" /> Segarkan Data
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Stats */}
                <RSVPStats stats={stats} loading={loading} />

                {/* Filters */}
                <RSVPFilters
                    filters={filters}
                    invitations={invitationOptions}
                    onFilterChange={setFilters}
                />

                {/* Table */}
                <RSVPTable
                    data={filteredData}
                    loading={loading}
                    onViewMessage={handleViewMessage}
                />

                {/* Message Modal */}
                <MessageModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    item={selectedItem}
                />
            </CardContent>
        </Card>
    );
}
