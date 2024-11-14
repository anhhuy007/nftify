import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

function Filter() {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Button className="flex items-center py-7 justify-between px-4 whitespace-nowrap">
            <SlidersHorizontal size={20} />
            <p className="ml-3 text-base">Filters</p>
          </Button>
        </SheetTrigger>
        <SheetContent side="left"></SheetContent>
      </Sheet>
    </>
  );
}

export default Filter;
