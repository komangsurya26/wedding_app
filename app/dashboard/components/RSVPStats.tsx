"use client";

import { RSVPStats as RSVPStatsType } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Eye, Users, X } from "lucide-react";

interface RSVPStatsProps {
  stats: RSVPStatsType;
  loading?: boolean;
}

export function RSVPStats({ stats, loading }: RSVPStatsProps) {
  const statItems = [
    {
      title: "Pengunjung Websitemu",
      value: stats.totalGuests,
      icon: Eye,
      color: "text-black",
      bgColor: "bg-secondary",
    },
    {
      title: "Total Hadir",
      value: stats.totalAttending,
      icon: Check,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Tidak Hadir",
      value: stats.totalNotAttending,
      icon: X,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Total Tamu",
      value: stats.totalGuests,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item) => (
        <Card key={item.title} className="h-28">
          {/* <CardHeader className="flex flex-row items-center justify-between space-y-0"></CardHeader> */}
          <CardContent className="space-y-1">
            <div className="flex justify-between">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              <div className={`p-2 rounded-full h-full ${item.bgColor}`}>
                <item.icon className={`h-4 w-4 ${item.color}`} />
              </div>
            </div>
            {loading ? (
              <div className="h-5 w-16 bg-muted animate-pulse rounded-full" />
            ) : (
              <div className="text-2xl font-bold">{item.value}</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
