"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

export default function CollectionChooser({
  collections,
  onCollectionSelect,
  initialCollection,
}) {
  const [selectedCollectionId, setSelectedCollectionId] = useState(
    initialCollection?._id
  );
  useEffect(() => {
    if (initialCollection && initialCollection._id) {
      setSelectedCollectionId(initialCollection._id);
    }
  }, [initialCollection]);

  // Handler when a collection is clicked
  const handleCollectionClick = (collection) => {
    setSelectedCollectionId(collection.id); // Update the selected collection
    onCollectionSelect(collection); // Pass the selected collection to the parent
  };

  const renderCollectionItems = () => (
    <>
      {/* Create New Collection Card */}
      <CarouselItem className="sm:basis-1/2 md:basis-1/3 lg:basis-1/3">
        <Link to="/create/collection">
          <Card className="border-2 border-border bg-card/50 hover:bg-card/80 transition-colors cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center aspect-square p-6">
              <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-4">
                <Plus className="w-10 h-10 bg-primary-foreground rounded-full text-background" />
              </div>
              <span className="text-xl font-medium">Create</span>
            </CardContent>
          </Card>
        </Link>
      </CarouselItem>

      {/* Collection Cards */}
      {collections.map((collection) => (
        <CarouselItem
          key={collection._id}
          className={`pl-3 sm:basis-1/2 md:basis-1/3 lg:basis-1/3 flex flex-col`} // Apply shadow effect on hover
          onClick={() => handleCollectionClick(collection)}
        >
          <Card
            className={`bg-background/50 transition-colors cursor-pointer rounded-2xl overflow-hidden
              ${
                selectedCollectionId === collection._id
                  ? "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-1"
                  : ""
              } 
              hover:bg-background/80 hover:shadow-lg`}
          >
            <img
              src={collection.thumbUrl}
              alt={collection.name}
              className={`w-full h-full object-cover aspect-square rounded-2xl`}
            />
          </Card>
          <span className="text-primary-foreground text-lg font-medium mt-2 text-center truncate max-w-full block">
            {collection.name}
          </span>
        </CarouselItem>
      ))}
    </>
  );

  return (
    <div className="w-full max-w-4xl space-y-4">
      <span className="text-primary-foreground text-3xl font-bold">
        Collection
      </span>
      <div className="px-6 ">
        {/* Ensure that Carousel wraps the items properly */}
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          {collections.length > 2 ? (
            <>
              <CarouselContent className="ml-[px]">
                {renderCollectionItems()}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </>
          ) : (
            <div className="flex flex-wrap items-center justify-center">
              {renderCollectionItems()}
            </div>
          )}
        </Carousel>
      </div>
    </div>
  );
}
