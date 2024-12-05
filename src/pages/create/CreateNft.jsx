import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import FileUpload from "@/pages/create/components/FileUpload";
import { Switch } from "@/components/ui/switch";
import CollectionChooser from "./components/CollectionChooser";

const user = {
  name: "John Doe",
  address: "0x1234567890",
  isConnected: true,
  collections: [
    { id: "1", name: "Name..", icon: "/placeholder.svg?height=40&width=40" },
    { id: "2", name: "Name..", icon: "/placeholder.svg?height=40&width=40" },
    { id: "3", name: "Name..", icon: "/placeholder.svg?height=40&width=40" },
    { id: "4", name: "Name..", icon: "/placeholder.svg?height=40&width=40" },
  ],
};

function CreateNft() {
  const [isOnMarketplace, setIsOnMarketplace] = useState(false);

  // State to store nft information
  const [collection, setCollection] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleCollectionSelect = (collection) => {
    setCollection(collection);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen my-20 mx-72 ">
        <h1 className="text-primary-foreground text-6xl font-bold">
          Create New NFT
        </h1>
        <span className="text-muted-foreground mt-5 text-2xl">
          Once your item is minted you will not be able to change any of its
          information.
        </span>
        <div className="grid grid-cols-[60%_10%_30%] mt-10">
          <div className="space-y-14">
            {/* Blockchain connection */}
            <div className="bg-card p-5 rounded-xl border-2">
              <div className="flex items-center justify-between gap-10">
                {/* Image */}
                <div className="flex gap-10 items-center">
                  <img
                    src="/EthereumIcon.svg"
                    alt="Ethereum Icon"
                    className="w-16 h-16"
                  />
                  <div className="flex flex-col">
                    <span className="text-primary-foreground text-2xl font-bold">
                      {user.address}
                    </span>
                    <span className="text-muted-foreground text-2xl font-bold">
                      Ethereum
                    </span>
                  </div>
                </div>
                <div>
                  {user.isConnected ? (
                    <div className="bg-green-500 text-white px-4 py-2 rounded">
                      Connected
                    </div>
                  ) : (
                    <div className="bg-red-500 text-white px-4 py-2 rounded">
                      Not Connected
                    </div>
                  )}
                </div>
              </div>
            </div>

            <FileUpload onFileSelect={handleFileSelect} />

            <div className="flex items-center justify-between">
              <div>
                <span className="text-primary-foreground text-3xl font-bold">
                  Put on marketplace
                </span>
                <p className="text-xl mt-2 text-muted-foreground">
                  Enter price to allow users instantly purchase your NFT
                </p>
              </div>
              <Switch
                checked={isOnMarketplace}
                onCheckedChange={setIsOnMarketplace}
                aria-label="Toggle marketplace listing"
              />
            </div>
            {isOnMarketplace && (
              <div className="space-y-4">
                <span className="text-primary-foreground text-3xl font-bold">
                  Price
                </span>
                <div className="relative">
                  <Input
                    id="price"
                    placeholder="Enter price"
                    value={price}
                    onChange={handlePriceChange}
                    className="pl-5 py-8 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-primary-foreground font-medium">
                    ETH
                  </div>
                </div>
              </div>
            )}

            {/* Collection */}
            <div className="space-y-4">
              <CollectionChooser
                collections={user.collections}
                onCollectionSelect={handleCollectionSelect}
              />
            </div>
            {/* Name */}
            <div className="space-y-4">
              <span className="text-primary-foreground text-3xl font-bold">
                Name <span className="text-destructive">*</span>
              </span>
              <div className="relative">
                <Input
                  id="name"
                  placeholder="Name your NFT"
                  value={name}
                  onChange={handleNameChange}
                  className="pl-5 py-8 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <span className="text-primary-foreground text-3xl font-bold">
                Description <span className="text-destructive">*</span>
              </span>
              <div className="relative">
                <Input
                  id="description"
                  placeholder="Enter a description"
                  value={description}
                  onChange={handleDescriptionChange}
                  className="pl-5 py-8 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]"
                />
              </div>
            </div>
          </div>

          {/* Gap */}
          <div></div>

          {/* Preview */}
          <div className="max-h-[600px] sticky top-20 w-full overflow-auto">
            <div className="space-y-4">
              <span className="text-primary-foreground text-3xl font-bold">
                Preview
              </span>
              <div className="border h-[450px] rounded-xl text-center p-4 flex justify-between items-center">
                <span className="text-muted-foreground text-xl">
                  Upload file to preview your brand new NFT
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateNft;
