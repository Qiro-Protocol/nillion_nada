import { Skeleton } from "../components/ui/skeleton";

export function PortfolioStatCardSkelton() {
  return (
    <div className="w-full grid grid-cols-2 gap-10">
      <Skeleton className="h-24 w-full bg-primary/10" />
      <Skeleton className="h-24 w-full bg-primary/10" />
    </div>
  );
}
