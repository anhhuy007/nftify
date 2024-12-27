import React, { useState } from "react";
import { FileLogoUpload } from "@/pages/create/components/FileUpload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useWallet } from "@/context/WalletProvider";

const user = {
  name: "John Doe",
  address: "0x1234567890",
  isConnected: true,
};

function CreateCollection() {
  const [collection, setCollection] = useState({
    name: "",
    token: "",
    description: "",
    image: "",
  });

  const handleFileSelect = (file) => {
    setCollection({ ...collection, image: file });
  };

  const handleNameChange = (e) => {
    setCollection({ ...collection, name: e.target.value });
  };

  const handleTokenChange = (e) => {
    setCollection({ ...collection, token: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setCollection({ ...collection, description: e.target.value });
  };

  const createCollection = () => {
    let errors = [];

    if (!collection.image) {
      errors.push("Please upload an image");
    }

    if (!collection.name) {
      errors.push("Please enter a name");
    }

    if (!collection.token) {
      errors.push("Please enter a token symbol");
    }

    if (!collection.description) {
      errors.push("Please enter a description");
    }

    // If there are errors, show them and stop the NFT creation process
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return; // Stop execution if there are validation errors
    }

    toast.success("Collection created successfully");

    // Create
    console.log("Creating collection...");
    console.log("File", collection.image);
    console.log("Name", collection.name);
    console.log("Token", collection.token);
    console.log("Description", collection.description);
  };

  const { isConnected, address } = useWallet();

  return (
    <>

      <div className="flex flex-col min-h-screen my-20 mx-56 ">
        <h1 className="text-primary-foreground text-6xl font-bold mb-10">
          Create New Collection
        </h1>
        <div className="space-y-20">
          <div className="space-y-4">
            {/* Blockchain */}
            <span className="text-primary-foreground text-3xl font-bold">
              Blockchain
            </span>
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
                      {address}
                    </span>
                    <span className="text-muted-foreground text-2xl font-bold">
                      Ethereum
                    </span>
                  </div>
                </div>
                <div>
                  {isConnected ? (
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
          </div>
          {/* Logo upload */}
          <FileLogoUpload onFileSelect={handleFileSelect} />

          {/* Collection information */}
          <div className="grid grid-cols-[60%_5%_35%]">
            {/* Name */}
            <div className="flex flex-col gap-4">
              <span className="text-primary-foreground text-3xl font-bold">
                Name <span className="text-destructive">*</span>
              </span>
              <Input
                placeholder="Name your collection"
                id="name"
                value={collection.name}
                onChange={handleNameChange}
                className={`pl-5 py-8 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]
                  ${
                    !collection.name
                      ? "border-2 border-destructive"
                      : "border-2 border-primary"
                  }
                  `}
              />
            </div>
            {/* Gap */}
            <div></div>

            {/* Token */}
            <div className="flex flex-col gap-4">
              <span className="text-primary-foreground text-3xl font-bold">
                Token Symbol
              </span>
              <Input
                placeholder="Enter token symbol"
                value={collection.token}
                id="token"
                onChange={handleTokenChange}
                className={`pl-5 py-8 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]
                ${
                  !collection.token
                    ? "border-2 border-destructive"
                    : "border-2 border-primary"
                }
                  `}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <span className="text-primary-foreground text-3xl font-bold">
              Description
            </span>
            <Input
              placeholder="Enter a description"
              id="description"
              value={collection.description}
              onChange={handleDescriptionChange}
              className={`pl-5 py-8 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]
                ${
                  !collection.description
                    ? "border-2 border-destructive"
                    : "border-2 border-primary"
                }
                `}
            />
          </div>
          {/* Create button */}
          <Button
            size="xl"
            className="text-black bg-primary-foreground p-10 text-xl"
            onClick={createCollection}
          >
            Create collection
          </Button>
        </div>
      </div>
    </>
  );
}

export default CreateCollection;
