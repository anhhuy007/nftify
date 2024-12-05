"use client";

import * as React from "react";
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

export default function CollectionChooser({ collections, onCollectionSelect }) {
  const [selectedCollectionId, setSelectedCollectionId] = React.useState(null);

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
          <Card className="border-2 border-border bg-background/50 hover:bg-background/80 transition-colors cursor-pointer">
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
          key={collection.id}
          className={`sm:basis-1/2 md:basis-1/3 lg:basis-1/3 `} // Apply shadow effect on hover
          onClick={() => handleCollectionClick(collection)}
        >
          <Card
            className={`border-2 border-border bg-background/50 transition-colors cursor-pointer rounded-2xl 
                ${selectedCollectionId === collection.id ? "border-4 " : ""} 
                hover:bg-background/80 hover:shadow-lg`}
          >
            <CardContent className="flex flex-col items-center justify-center aspect-square p-6">
              <div className="w-12 h-12 rounded-lg bg-sky-100 mb-4 overflow-hidden">
                {collection.icon && (
                  <img
                    src={collection.icon}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <span className="text-xl font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                {collection.name}
              </span>
            </CardContent>
          </Card>
        </CarouselItem>
      ))}
    </>
  );

  return (
    <div className="w-full max-w-4xl space-y-4">
      <span className="text-primary-foreground text-3xl font-bold">
        Collection
      </span>
      <div className="px-10 pr-14">
        {/* Ensure that Carousel wraps the items properly */}
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          {collections.length > 3 ? (
            <>
              <CarouselContent>{renderCollectionItems()}</CarouselContent>

              <CarouselPrevious />
              <CarouselNext />
            </>
          ) : (
            <div className="flex flex-wrap  items-center justify-center">
              {renderCollectionItems()}
            </div>
          )}
        </Carousel>
      </div>
    </div>
  );
}
