import { useState } from "react";
import { useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CollectionGeneralInformation from "@/pages/collection/components/CollectionGeneralInformation";
import CollectionDetailTabs from "@/pages/collection/components/CollectionDetailTabs";
import { Description } from "@radix-ui/react-dialog";
import { collectionAboutApiEndpoint, collectionItemsApiEndpoint, fetcher } from "@/api/Endpoints";
import LoadingAnimation from "@/components/ui/loading";
import ErrorAnimation from "@/components/ui/error";
import { useQuery } from "react-query";
import CollectionItems from "./components/CollectionItems";

function CollectionDetail() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: collection, error: aboutError, isLoading: aboutLoading } = useQuery('collection-about', () => fetcher(collectionAboutApiEndpoint.replace(":id", id)));
  const { data: collectionItems, error: itemsError, isLoading: itemsLoading } = useQuery('collection-items', () => fetcher(collectionItemsApiEndpoint.replace(":id", id)));

  if (aboutLoading || itemsLoading) return <LoadingAnimation />;
  if (aboutError || itemsError) return <ErrorAnimation />;

  return (
    <div className="w-full flex flex-col my-20 p-0 md:px-32 items-center justify-center gap-10">
      <div className="w-full rounded-xl bg-[hsl(232,45%,77%)] text-primary-foreground px-44 py-16">
        <div className="flex items-center gap-40">
          <div className="relative">
            <img
              src={collection.thumbUrl}
              alt={collection.name}
              className="w-full mx-auto md:mx-0 h-auto max-w-xs md:max-w-[600px] xl:w-[500px] aspect-square border-2 border-primary rounded-xl"
            />
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
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
                  src={collection.thumbUrl}
                  alt={collection.name}
                  className="w-full h-full"
                />
              </DialogContent>
            </Dialog>
          </div>
          <CollectionGeneralInformation collection={collection} />
        </div>
      </div>
      <CollectionItems collection={collectionItems} />
    </div>
  );
}

export default CollectionDetail;
