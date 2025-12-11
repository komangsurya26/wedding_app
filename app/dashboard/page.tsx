import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TotalVisitors } from "./components/TotalVisitors";
import { RSVPSection } from "./components/RSVPSection";

export default function DashboardPage() {
  return (
    <main className="h-full w-full overflow-y-auto hide-scrollbar">
      {/* RSVP Section */}
      <RSVPSection />
    </main>
  );
}
