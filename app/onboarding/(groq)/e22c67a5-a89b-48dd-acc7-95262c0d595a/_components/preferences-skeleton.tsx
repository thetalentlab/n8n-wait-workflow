import { Skeleton } from "@/components/ui/skeleton";

export default function PreferencesSkeleton() {
  return (
    <div className="w-full max-w-2xl">
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="relative flex cursor-pointer flex-col gap-4 rounded-lg border border-input p-4 shadow-sm shadow-black/5"
          >
            <div className="flex justify-between gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-4 opacity-60" />
            </div>
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
      </div>
      <Skeleton className="mt-4 h-10 w-full rounded bg-gray-200" />
    </div>
  );
}
