import React from "react";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

function Notification() {
  return (
    <>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          <p>No new notifications</p>
        </SheetDescription>
      </SheetContent>
    </>
  );
}

export default Notification;
