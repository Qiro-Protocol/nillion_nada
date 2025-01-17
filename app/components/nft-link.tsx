"use client";

import { cn } from "../lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { MoveUpRight } from "lucide-react";

export function NFTLink(props: { id: string }) {
  return (
    <Link
      href={`/pools/${props.id}`}
      className={cn(
        buttonVariants({
          size: "icon",
          variant: "secondary",
        }),
      )}
    >
      <MoveUpRight />
    </Link>
  );
}
