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
          <div className="flex items-center justify-center p-3 rounded-lg border-[var(--border)] transition-all transform hover:scale-105 cursor-pointer hover:bg-white hover:text-black text-white bg-white/[.2]">
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
