import { ReactNode } from "react";
import { Button } from "./ui/button";
import { LucideFile } from "lucide-react";
import { cn } from "../lib/utils";

export function NoData({
  title,
  link,
  Icon,
  description,
  className,
}: {
  Icon?: ReactNode;
  title?: string;
  description?: string;
  link?: {
    href: string;
    label: string;
  };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center mt-3 justify-center bg-secondary p-8 rounded-md h-full w-full",
        className,
      )}
    >
      <div className="grid place-items-center">
        <h1 className="0 mb-4 text-xl font-bold">{title || "No Data"}</h1>
        {Icon || <LucideFile className="h-12 w-12 stroke-foreground" />}
        <p className="mb-0 text-center text-muted-foreground">{description}</p>
        {link ? (
          <a className="my-4" href={link?.href}>
            <Button size={"lg"} variant={"outline"} type="button">
              {link?.label}
            </Button>
          </a>
        ) : null}
      </div>
    </div>
  );
}
