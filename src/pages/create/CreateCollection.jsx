import React, { useState } from "react";
import { FileLogoUpload } from "@/pages/create/components/FileUpload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useWallet } from "@/context/WalletProvider";
import IpfsService from "@/services/IpfsService";
import { useAuthHandler } from "@/handlers/AuthHandler";
import { useAuth } from "@/context/AuthProvider";
import { USER_ENDPOINTS } from "../../handlers/Endpoints";

function CreateCollection() {
  const [collection, setCollection] = useState({
    name: "",
    description: "",
    thumbUrl: "",
  });

  const { user, isAuth } = useAuth();
  console.log(user, isAuth);

  const { fetchWithAuth } = useAuthHandler();
  const [isLoading, setIsLoading] = useState(false);
  const wallet = useWallet();

  const handleFileSelect = (file) => {
    setCollection({ ...collection, thumbUrl: file });
  };

  const handleNameChange = (e) => {
    setCollection({ ...collection, name: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setCollection({ ...collection, description: e.target.value });
  };

  const createCollection = async () => {
    if (
      !collection ||
      !collection.name ||
      !collection.description ||
      !collection.thumbUrl
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    setIsLoading(true);
    let updatedThumbUrl;

    try {
      // Upload thumbnail image to IPFS
      const thumbImg = await IpfsService.uploadCollectionImage(
        collection.thumbUrl
      );
      if (!thumbImg || !thumbImg.url) {
        toast.error("Error uploading thumb image");
        throw new Error("Failed to upload image");
      }

      toast.success("Uploaded thumb image successfully");
      updatedThumbUrl = thumbImg.url;
    } catch (error) {
      console.error("Error during thumbnail upload:", error);
      toast.error("Error uploading thumbnail image");
      setIsLoading(false);
      return;
    }

    try {
      // Send collection data to the backend

      const collectionData = {
        name: collection.name,
        description: collection.description,
        thumbUrl: updatedThumbUrl,
      };

      console.log("Creating collection with data:", collectionData);

      const response = await fetchWithAuth(USER_ENDPOINTS.CREATE_COLLECTION, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(collectionData),
      });

      if (response.success !== true) {
        const data = await response.json();
        console.error("Error creating collection:", data);
        toast.error(
          data.message || "An error occurred while creating the collection"
        );
        return;
      }
      toast.success("Collection created successfully");

      // Reset the form
      setCollection({
        name: "",
        description: "",
        thumbUrl: "",
      });

      handleFileSelect(null);
    } catch (error) {
      console.error("Error creating collection:", error);
      toast.error(
        error.message || "An error occurred while creating the collection"
      );
    } finally {
      setIsLoading(false);
    }
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
                {/* thumbUrl */}
                <div className="flex gap-10 items-center">
                  <img
                    src="/EthereumIcon.svg"
                    alt="Ethereum Icon"
                    className="w-16 h-16"
                  />
                  <div className="flex flex-col">
                    <span className="text-primary-foreground text-2xl font-bold">
                      {wallet.address}
                    </span>
                    <span className="text-muted-foreground text-2xl font-bold">
                      Ethereum
                    </span>
                  </div>
                </div>
                <div>
                  {wallet.isConnected ? (
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
            disabled={isLoading}
          >
            Create collection
          </Button>
        </div>
      </div>
    </>
  );
}

export default CreateCollection;
