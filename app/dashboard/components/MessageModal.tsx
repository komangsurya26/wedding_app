"use client";

import { RSVPItem } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageSquare, User, Users } from "lucide-react";

interface MessageModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: RSVPItem | null;
}

export function MessageModal({ isOpen, onClose, item }: MessageModalProps) {
    if (!item) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        Ucapan dari {item.name}
                    </DialogTitle>
                    <DialogDescription>
                        Pesan dan konfirmasi kehadiran
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 pt-2">
                    {/* Guest Info */}
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span className="capitalize">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{item.guestCount} tamu</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(item.createdAt).toLocaleDateString("id-ID")}</span>
                        </div>
                    </div>

                    {/* Attendance Badge */}
                    <div>
                        <Badge
                            variant={item.attendance === "Hadir" ? "default" : "destructive"}
                            className={
                                item.attendance === "Hadir"
                                    ? "bg-green-600 hover:bg-green-700"
                                    : ""
                            }
                        >
                            {item.attendance}
                        </Badge>
                    </div>

                    {/* Message */}
                    <div className="rounded-lg border bg-muted/50 p-4">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {item.message || "Tidak ada pesan."}
                        </p>
                    </div>

                    {/* Invitation Info */}
                    <div className="text-xs text-muted-foreground">
                        Undangan: <span className="font-medium">{item.invitationName}</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
