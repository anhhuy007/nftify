import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function CreatorCard({ creatorData }) {
  const creator = creatorData.creatorDetails;
  // console.log("Creator Details: ", creator.name);

  // const image1 = creatorData.images[0];
  // const image2 = creatorData.images[1];
  // const image3 = creatorData.images[2];

  const image1 = "https://stampdata.com/files/stash/00/Colnect-3615-900-Christmas.jpg";
  const image2 = "https://stampdata.com/files/thumbs/05/300px-Colnect-3591-805-Conductor.jpg";
  const image3 = "https://stampdata.com/files/thumbs/lu/300px-Colnect-2859-487-King-Luis-I---Type-of-1870.jpg";
  const creatorName = creator?.name || "Unknown";

  console.log("Creator Name: ", creatorName);

  return (
    <Card className="xl:w-[445px] xl:h-[470px] overflow-hidden">
      <CardContent className="p-4 pt-6">
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            <div className="rounded-lg border-2">
              <img
                alt="Collectible image 1"
                className="aspect-square object-cover"
                height={145}
                src={image1}
                width={170}
              />
            </div>
            <div className="rounded-lg border-2">
              <img
                alt="Collectible image 2"
                className="aspect-square object-cover"
                height={145}
                src={image2}
                width={170}
              />
            </div>
          </div>
          <div className="flex-1 rouned-lg border-2">
            <img
              alt="Collectible image 3"
              className="aspect-square object-cover h-full"
              height={350}
              src={image3}
              width={250}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="rounded-b-xl">
        <h3 className="text-xl font-semibold text-center w-full break-words">
          { creatorName }
        </h3>
      </CardFooter>
    </Card>
  );
}
