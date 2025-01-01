import { useState } from "react";
import { useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CollectionGeneralInformation from "@/pages/collection/components/CollectionGeneralInformation";
import { fetcher } from "@/handlers/Endpoints";
import LoadingAnimation from "@/components/ui/loading";
import ErrorAnimation from "@/components/ui/error";
import { useQuery } from "react-query";
import CollectionItems from "./components/CollectionItems";
import { COLLECTION_ENDPOINTS } from "../../handlers/Endpoints";

function CollectionImageViewer({ imageUrl, name }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover mx-auto md:mx-0 max-w-xs md:max-w-[600px] xl:w-[500px] aspect-square border-2 border-white/20 rounded-xl"
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
          <img src={imageUrl} alt={name} className="w-full h-full object-contain" />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function useCollectionData(collectionId) {
  const collectionQuery = useQuery(
    "collection-about",
    function fetchCollectionAbout() {
      return fetcher(
        COLLECTION_ENDPOINTS.DETAIL.ABOUT.replace(":id", collectionId)
      );
    }
  );

  const itemsQuery = useQuery(
    "collection-items",
    function fetchCollectionItems() {
      return fetcher(
        COLLECTION_ENDPOINTS.DETAIL.ITEMS.replace(":id", collectionId)
      );
    }
  );

  return {
    collection: collectionQuery.data?.data,
    collectionItems: itemsQuery.data?.data,
    isLoading: collectionQuery.isLoading || itemsQuery.isLoading,
    isError: collectionQuery.error || itemsQuery.error,
  };
}

function CollectionDetail() {
  const { id } = useParams();
  const { collection, collectionItems, isLoading, isError } =
    useCollectionData(id);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (isError) {
    return <ErrorAnimation />;
  }

  return (
    <div className="w-full flex flex-col my-20 p-0 md:px-32 items-center justify-center gap-10">
      <div className="w-full rounded-xl bg-cover bg-center text-primary-foreground px-44 py-16" style={{backgroundImage: "url('https://img.freepik.com/free-vector/speed-light-spotlights-digital-background_23-2148821702.jpg')"}}>
        <div className="flex items-center gap-40">
          <CollectionImageViewer
            imageUrl={collection.thumbUrl}
            name={collection.name}
          />
          <CollectionGeneralInformation collection={collection} />
        </div>
      </div>
      <CollectionItems collection={collectionItems} />
    </div>
  );
}

export default CollectionDetail;
