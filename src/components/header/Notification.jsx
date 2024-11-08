import React from "react";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sheet,
} from "@/components/ui/sheet";
import { Bell } from "lucide-react";

function Notification() {
  return (
    <>
      <Sheet>
        <SheetTrigger className="border-none">
          <div className="flex items-center justify-center p-3 rounded-lg border border-[var(--border)] transition-all transform hover:scale-105 cursor-pointer hover:bg-primary hover:text-primary-foreground">
            <Bell size={20} />
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Notifications</SheetTitle>
          </SheetHeader>
          <SheetDescription>
            <p>No new notifications</p>
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Notification;
