import React, { useState } from "react";
import { FileLogoUpload } from "@/pages/create/components/FileUpload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const user = {
  name: "John Doe",
  address: "0x1234567890",
  isConnected: true,
};

function CreateCollection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [description, setDescription] = useState("");

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const createCollection = () => {
    // Create
    console.log("Creating collection...");
    console.log("File", selectedFile);
    console.log("Name", name);
    console.log("Token", token);
    console.log("Description", description);
  };

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
          </div>
          {/* Logo upload */}
          <FileLogoUpload onFileSelect={handleFileSelect} />

          {/* Collection information */}
          <div className="grid grid-cols-[60%_5%_35%]">
            {/* Name */}
            <div className="flex flex-col gap-4">
              <span className="text-primary-foreground text-3xl font-bold">
                Name
              </span>
              <Input
                placeholder="Name your collection"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-5 py-8 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]"
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
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="pl-5 py-8 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]"
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="pl-5 py-8 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]"
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
