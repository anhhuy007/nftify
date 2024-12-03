import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Maximize2 } from "lucide-react";

function CollectionAbout({ collection }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="w-full rounded-xl text-primary-foreground px-44 py-16">
        <div className="flex items-center gap-52">
          <div className="flex flex-col space-y-6">
            <span className="font-bold text-5xl">{collection.author.name}</span>
            <p>{collection.abstract}</p>
            <Button size="xl" variant="buy" className="text-xl">
              Follow
            </Button>
          </div>
          <div className="relative">
            <img
              src={collection.imageUrl}
              alt="NFT Image"
              className="w-full mx-auto md:mx-0 h-auto max-w-xs md:max-w-[600px] xl:w-[500px] aspect-square border-2 border-primary rounded-xl"
            />
            <Dialog open={collection.isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-black/50 hover:bg-primary hover:text-primary-foreground text-white rounded-full p-1"
                  aria-label="View full image"
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl p-2">
                <img
                  src={collection.imageUrl}
                  alt="Full size NFT"
                  className="w-full h-full"
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}

export default CollectionAbout;
