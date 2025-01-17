import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "../lib/utils";
import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: ReactNode;
  Icon?: React.ElementType;
  currency: string;
  subValue?: string;
  className?: string;
  children?: ReactNode;
}

export function GlobalStatCard({
  Icon,
  currency = "$",
  label,
  value,
  subValue,
  className,
  children,
}: StatCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        {Icon && <Icon />}
      </CardHeader>
      <div className="flex justify-between items-center w-full">
        <CardContent className="flex flex-col w-full shrink-0">
          <div className="flex items-baseline text-xl font-bold">
            <span className="mr-1">{currency}</span>
            <span className="flex items-center">{value}</span>
          </div>
          <p className="text-xs text-muted-foreground">{subValue}</p>
        </CardContent>
        <div className="w-full">{children}</div>
      </div>
    </Card>
  );
}
