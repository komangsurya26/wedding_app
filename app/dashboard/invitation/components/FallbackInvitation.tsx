import { Skeleton } from "@/components/ui/skeleton";

export function FallbackInvitation() {
  return (
    <div className="w-full h-full">
      <div className="mb-10 flex flex-row gap-3">
        <Skeleton className="h-10 w-50" />
        <Skeleton className="h-10 w-30" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-2">
        <Skeleton className="h-100 w-full" />
        <Skeleton className="h-100 w-full" />
      </div>
    </div>
  );
}
