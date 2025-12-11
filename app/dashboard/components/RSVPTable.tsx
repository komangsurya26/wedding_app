"use client";

import { RSVPItem } from "@/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface RSVPTableProps {
    data: RSVPItem[];
    loading?: boolean;
    onViewMessage: (item: RSVPItem) => void;
}

export function RSVPTable({ data, loading, onViewMessage }: RSVPTableProps) {
    if (loading) {
        return (
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">No</TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead>Kehadiran</TableHead>
                            <TableHead>Tamu</TableHead>
                            <TableHead>Tanggal</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell><Skeleton className="h-4 w-6" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="rounded-md border p-8">
                <div className="flex flex-col items-center justify-center text-center text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mb-4 opacity-50" />
                    <p className="text-lg font-medium">Belum ada RSVP</p>
                    <p className="text-sm">Data RSVP akan muncul di sini ketika tamu mengisi form konfirmasi kehadiran.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12">No</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Kehadiran</TableHead>
                        <TableHead>Tamu</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead className="text-right">Ucapan</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell className="capitalize font-medium">{item.name}</TableCell>
                            <TableCell>
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
                            </TableCell>
                            <TableCell>{item.guestCount}</TableCell>
                            <TableCell>
                                {formatDate(item.createdAt)}
                            </TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onViewMessage(item)}
                                    title="Lihat Ucapan"
                                >
                                    <MessageSquare className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
