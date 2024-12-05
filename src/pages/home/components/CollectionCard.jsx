import { Card, CardContent } from "@/components/ui/card";

export default function CollectionCard({ collection }) {
  collection.thumbUrl = "https://i.seadn.io/s/primary-drops/0x99815c8dfa51ed63e25b6c8fd91d3a8f75a3e251/31032972:about:media:812e69df-95b4-4a62-afd9-9c4181cd5193.jpeg?auto=format&dpr=1&w=1920";

  return (
    <Card className="w-full overflow-hidden bg-[#F15A24] text-white rounded-3xl">
      <CardContent className="p-0">
        <div className="flex items-center justify-between flex-col-reverse gap-5 md:flex-row md:gap-20 p-8">
          <div className="space-y-6 md:max-w-[280px] lg:max-w-[300px] xl:max-w-[500px]">
            <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold mx-auto">
              {collection.name}
            </h2>
            <p className="text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed">
              {collection.description}
            </p>
            <div className="space-y-2">
              <p className="text-base md:text-lg lg:text-xl xl:text-2xl">
                Visit
              </p>
              <p className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
                {collection.viewCount}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center flex-1 max-w-[250px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[500px]">
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-t from-[#F15A24] to-black opacity-50 rounded-xl" />
              <img
                src={collection.thumbUrl}
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
