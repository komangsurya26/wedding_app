"use client";

import { InvitationOption, RSVPFiltersState } from "@/types";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface RSVPFiltersProps {
    filters: RSVPFiltersState;
    invitations: InvitationOption[];
    onFilterChange: (filters: RSVPFiltersState) => void;
}

export function RSVPFilters({
    filters,
    invitations,
    onFilterChange,
}: RSVPFiltersProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4">
            {/* Invitation Filter */}
            <Select
                value={filters.invitationId}
                onValueChange={(value) =>
                    onFilterChange({ ...filters, invitationId: value })
                }
            >
                <SelectTrigger className="w-full sm:w-[250px]">
                    <SelectValue placeholder="Pilih Undangan" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Semua Undangan</SelectItem>
                    {invitations.map((inv) => (
                        <SelectItem key={inv.id} value={inv.id}>
                            {inv.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Search Input */}
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Cari nama tamu..."
                    value={filters.searchQuery}
                    onChange={(e) =>
                        onFilterChange({ ...filters, searchQuery: e.target.value })
                    }
                    className="pl-9"
                />
            </div>
        </div>
    );
}
