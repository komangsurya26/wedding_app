import { Skeleton } from "@/components/ui/skeleton";

export function FallbackCheckout() {
  return (
    <div className="container mx-auto h-screen">
      <div className="max-w-lg mx-auto p-6 space-y-8 h-full rounded-2xl">
        {/* Header */}
        <div className="flex flex-col justify-center items-center space-y-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-6 w-40" />
        </div>

        {/* Judul Undangan */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* URL Undangan */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />

          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-[200px]" />
            <Skeleton className="h-10 flex-1" />
          </div>

          <Skeleton className="h-4 w-48" />
        </div>

        {/* Detail Produk */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-40" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>

          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-5 w-full" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 pt-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-6 w-24" />
          </div>

          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    </div>
  );
}
