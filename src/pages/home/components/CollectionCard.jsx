import { Card, CardContent } from "@/components/ui/card";

export default function CollectionCard() {
  const collection = {
    name: "Ten",
    owner: "RARI",
    description:
      "The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs - unique digital collectibles living on the Ethereum blockchain.",
    website: "10K",
    img: "https://th.bing.com/th/id/OIP.LI25-fRBRpBSBxaq-UmyFgHaHa?w=184&h=184&c=7&r=0&o=5&dpr=1.5&pid=1.7",
  };

  return (
    <Card className="w-full overflow-hidden bg-[#F15A24] text-white rounded-3xl">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 p-8">
          <div className="space-y-6">
            <h2 className="text-2xl xl:text-4xl font-bold">
              {collection.name} by {collection.owner}
            </h2>
            <p className="text-base xl:text-2xl leading-relaxed">
              {collection.description}
            </p>
            <div className="space-y-2">
              <p className="text-xl">Visit</p>
              <p className="text-3xl xl:text-6xl font-bold">
                {collection.website}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-t from-[#F15A24] to-black opacity-50 rounded-xl" />
              <img
                src={collection.img}
                alt="Stylized 3D number 10"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
