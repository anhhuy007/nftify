import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function NftDetailTabs({ data }) {
  return (
    <div className="w-full mx-auto max-w-[350px] md:max-w-[400px] xl:max-w-[650px] mt-8">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start gap-2 h-14 bg-transparent border-b border-foreground mb-6 rounded-none">
          <TabsTrigger
            value="overview"
            className="text-lg data-[state=active]:border-b-[6px] data-[state=active]:border-foreground data-[state=active]:p-[11px] data-[state=active]:shadow-none rounded-none"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="bids"
            className="text-lg data-[state=active]:border-b-[6px] data-[state=active]:border-foreground data-[state=active]:p-[11px] data-[state=active]:shadow-none rounded-none"
          >
            Bids
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            className="text-lg data-[state=active]:border-b-[6px] data-[state=active]:border-foreground data-[state=active]:p-[11px] data-[state=active]:shadow-none rounded-none"
          >
            Activity
          </TabsTrigger>
        </TabsList>

        <div className="min-w-[350px] md:min-w-[400px] xl:min-w-[650px] flex flex-col">
          <TabsContent value="overview" className="flex-1">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-primary-foreground">
                Description
              </h2>
              <p className="text-lg leading-relaxed text-primary-foreground">
                In the digital world, where bytes collide, Glitch ghouls emerge,
                a terrifying tide. Their forms corrupted, their power's might,
                Byte beasts, a digital fright.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="bids" className="flex-1">
            <div className="space-y-6 h-full flex flex-col">
              <h2 className="text-2xl font-semibold text-primary-foreground">
                Bids
              </h2>
              <div className="flex items-center justify-between p-4 rounded-2xl border">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                  <span className="text-lg text-primary-foreground">
                    user name
                  </span>
                </div>
                <span className="text-lg text-primary-foreground">
                  ~0.001 ETH
                </span>
              </div>
              <div className="flex-1" />
            </div>
          </TabsContent>

          <TabsContent value="activity" className="flex-1">
            <div className="h-full flex items-center justify-left text-primary-foreground">
              No activity to show
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
