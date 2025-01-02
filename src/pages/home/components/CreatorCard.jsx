import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function CreatorCard({ creatorData }) {
  const creator = creatorData.creatorDetails;
  const images = creatorData.creatorStamps.filter(Boolean);
  const creatorName = creator?.name || "Unknown";
  const description = creator?.description || "No description available";

  const renderImages = () => {
    switch (images.length) {
      case 0:
        return <div className="w-full h-[364px] bg-gray-300 rounded-lg flex items-center justify-center">No images available</div>;
      case 1:
        return (
          <div className="w-full h-[364px] rounded-lg border-2">
            <img
              alt="Collectible image"
              className="w-full h-full object-cover rounded-lg"
              src={images[0]}
            />
          </div>
        );
      case 2:
        return (
          <div className="flex gap-4 h-[364px]">
            {images.map((image, index) => (
              <div key={index} className="flex-1 rounded-lg border-2">
                <img
                  alt={`Collectible image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                  src={image}
                />
              </div>
            ))}
          </div>
        );
      default:
        return (
          <div className="flex gap-4">
            <div className="flex flex-col gap-4">
              {images.slice(0, 2).map((image, index) => (
                <div key={index} className="rounded-lg border-2">
                  <img
                    alt={`Collectible image ${index + 1}`}
                    className="aspect-square object-cover"
                    height={145}
                    src={image}
                    width={170}
                  />
                </div>
              ))}
            </div>
            <div className="flex-1 rounded-lg border-2">
              <img
                alt="Collectible image 3"
                className="aspect-square object-cover h-full"
                height={350}
                src={images[2]}
                width={250}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <Link to={`/user/${creatorData._id}`}>
      <Card className="xl:w-[445px] xl:h-[470px] overflow-hidden">
        <CardContent className="p-4 pt-6">
          {renderImages()}
        </CardContent>
        <CardFooter className="rounded-b-xl">
          <h3 className="text-xl font-semibold text-center w-full break-words">
            {creatorName}
          </h3>
        </CardFooter>
      </Card>
    </Link>
  );
}

