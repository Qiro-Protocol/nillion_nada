import { Skeleton } from "./ui/skeleton";

export function SkeletonTable() {
  return (
    <div className="space-y-2">
      {[...Array(5)].map((_, index) => (
        <Skeleton key={index} className="h-12 w-full" />
      ))}
    </div>
  );
}
