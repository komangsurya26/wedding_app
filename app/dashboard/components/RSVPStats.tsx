"use client";

import { RSVPStats as RSVPStatsType } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Users, X } from "lucide-react";

interface RSVPStatsProps {
    stats: RSVPStatsType;
    loading?: boolean;
}

export function RSVPStats({ stats, loading }: RSVPStatsProps) {
    const statItems = [
        {
            title: "Total Hadir",
            value: stats.totalAttending,
            icon: Check,
            color: "text-green-600",
            bgColor: "bg-green-100 dark:bg-green-900/20",
        },
        {
            title: "Tidak Hadir",
            value: stats.totalNotAttending,
            icon: X,
            color: "text-red-600",
            bgColor: "bg-red-100 dark:bg-red-900/20",
        },
        {
            title: "Total Tamu",
            value: stats.totalGuests,
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-100 dark:bg-blue-900/20",
        },
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-3">
            {statItems.map((item) => (
                <Card key={item.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                        <div className={`p-2 rounded-full ${item.bgColor}`}>
                            <item.icon className={`h-4 w-4 ${item.color}`} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="h-8 w-16 bg-muted animate-pulse rounded" />
                        ) : (
                            <div className="text-2xl font-bold">{item.value}</div>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
