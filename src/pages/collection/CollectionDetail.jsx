import { useState } from "react";
import { useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CollectionGeneralInformation from "@/pages/collection/components/CollectionGeneralInformation";
import CollectionDetailTabs from "@/pages/collection/components/CollectionDetailTabs";
import { Description } from "@radix-ui/react-dialog";

const collection = {
  id: 1,
  imageUrl:
    "https://th.bing.com/th/id/OIP.GubYybcE-2aUiHUBmhl53wHaI-?w=164&h=183&c=7&r=0&o=5&dpr=1.5&pid=1.7",
  name: "Tên nè",
  owner: "1234567890",
  abstract:
    "“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce iaculis, erat interdum lobortis tempor.”",
  totalVolume: 100,
  floorPrice: 0.1,
  owners: 9010,
  author: {
    name: "Author Name",
    avatar:
      "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-cute.jpg?ssl=1",
    description:
      "“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce iaculis, erat interdum lobort",
  },
  activity: [
    {
      image: "https://via.placeholder.com/150",
      name: "Activity 1",
      time: "2024-12-01",
      previousOwner: "Owner A",
      currentOwner: "Owner B",
      type: "transferred",
      price: 0.05,
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Activity 2",
      time: "2024-12-02",
      previousOwner: "Owner B",
      currentOwner: "Owner C",
      type: "listed",
      price: 0.1,
    },
    {
      image: "https://via.placeholder.com/150",
      name: "Activity 3",
      time: "2024-12-03",
      previousOwner: "Owner C",
      currentOwner: "Owner D",
      type: "purchased",
      price: 0.15,
    },
  ],
};

function CollectionDetail() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { imageUrl } = collection;
  return (
    <div className="w-full flex flex-col my-20 p-0 md:px-32 items-center justify-center gap-10">
      <div className="w-full rounded-xl bg-[hsl(232,45%,77%)] text-primary-foreground px-44 py-16">
        <div className="flex items-center gap-40">
          <div className="relative">
            <img
              src={imageUrl}
              alt="NFT Image"
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
                  src={imageUrl}
                  alt="Full size NFT"
                  className="w-full h-full"
                />
              </DialogContent>
            </Dialog>
          </div>
          <CollectionGeneralInformation collection={collection} />
        </div>
      </div>
      <CollectionDetailTabs collection={collection} />
    </div>
  );
}

export default CollectionDetail;
