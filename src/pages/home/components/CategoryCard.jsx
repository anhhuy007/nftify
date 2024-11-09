import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function CategoryCard({
  name = "Collectibles and Virtual World",
  image1 = "https://th.bing.com/th/id/OIP.eDc2GuZjTwCSpl984kcQ5QHaJ0?w=133&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
  image2 = "http://ts2.mm.bing.net/th?id=OIP.XF0rmCin3cOQ2EIyA1HyBAAAAA&pid=15.1",
  image3 = "http://ts3.mm.bing.net/th?id=OIP.VPzXER2CgmM4fmxC5aokZgHaJA&pid=15.1",
}) {
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
          {name}
        </h3>
      </CardFooter>
    </Card>
  );
}
