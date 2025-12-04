import { Skeleton } from "@/components/ui/skeleton";

export function FallbackOrder() {
  return (
    <div className="w-full h-full">
      <div className="mb-10 flex">
        <Skeleton className="h-10 w-50" />
      </div>
      <div className="space-y-3">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-10" />
      </div>
    </div>
  );
}
