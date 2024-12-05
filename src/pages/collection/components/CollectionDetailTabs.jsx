import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import CollectionAbout from "@/pages/collection/components/CollectionAbout";
import CollectionItems from "@/pages/collection/components/CollectionItems";
import CollectionActivities from "@/pages/collection/components/CollectionActivities";

function CollectionDetailTabs({ collection }) {
  return (
    <>
      <div className="w-full">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="w-full justify-start gap-2 h-14 bg-transparent border-b border-foreground mb-6 rounded-none">
            <TabsTrigger
              value="about"
              className="text-lg data-[state=active]:border-b-[6px] data-[state=active]:border-foreground data-[state=active]:p-[11px] data-[state=active]:shadow-none rounded-none"
            >
              About
            </TabsTrigger>
            <TabsTrigger
              value="items"
              className="text-lg data-[state=active]:border-b-[6px] data-[state=active]:border-foreground data-[state=active]:p-[11px] data-[state=active]:shadow-none rounded-none"
            >
              Items
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="text-lg data-[state=active]:border-b-[6px] data-[state=active]:border-foreground data-[state=active]:p-[11px] data-[state=active]:shadow-none rounded-none"
            >
              Activity
            </TabsTrigger>
          </TabsList>

          <div className="w-full flex flex-col">
            <TabsContent value="about" className="flex-1">
              <CollectionAbout collection={collection} />
            </TabsContent>

            <TabsContent value="items" className="flex-1">
              <CollectionItems collection={collection} />
            </TabsContent>

            <TabsContent value="activity" className="flex-1">
              <CollectionActivities collection={collection} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  );
}

export default CollectionDetailTabs;
