import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import FileUpload from "@/pages/create/components/FileUpload";
import { Switch } from "@/components/ui/switch";
import CollectionChooser from "./components/CollectionChooser";
import { PreviewNftCard } from "@/components/NFT/NftCard";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import CustomDateInput from "@/components/ui/date-input";
import IpfsService from "@/services/IpfsService";
import { useAuthHandler } from "@/api/AuthHandler";

function CreateNft() {
  const navigate = useNavigate();
  const [isOnMarketplace, setIsOnMarketplace] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchWithAuth } = useAuthHandler();

  const { isAuth, user } = useAuth();
  console.log(user);
  if (!isAuth) {
    toast.error("Please login to create NFTs");
    navigate("/");
  }

  const [nft, setNft] = useState({
    title: "",
    imgUrl: "",
    price: "",
    ownerDetails: {
      username: user.username,
      avatarUrl: user.avatarUrl,
      id: user.id,
    },
    issuedBy: "",
    denom: "",
    function: "",
    color: "",
    releasedDate: "",
    metadata: "",
  });

  const handleFileSelect = (file) => {
    setNft({ ...nft, imgUrl: file });
    setIsCreated(true);
  };

  const handlePriceChange = (e) => {
    setNft((prev) => ({ ...prev, price: e.target.value }));
  };

  const handleNameChange = (e) => {
    setNft((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleDescriptionChange = (e) => {
    setNft((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleCreateNft = async () => {
    console.log("Creating NFT", nft);

    // Validate NFT fields
    if (
      !nft.title ||
      !nft.imgUrl ||
      !nft.description ||
      !nft.issuedBy ||
      !nft.denom ||
      !nft.color ||
      !nft.releasedDate ||
      !nft.function
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const updates = {};
      const uploadTasks = [];

      // Upload image to IPFS
      const stampImgUploadTask = IpfsService.uploadStampImage(nft.imgUrl).then(
        (stampImg) => {
          if (stampImg) {
            updates.imgUrl = stampImg.url;
            toast.success("Image uploaded on Pinata successfully");
          } else {
            throw new Error("Failed to upload image");
          }
        }
      );

      uploadTasks.push(stampImgUploadTask);

      await Promise.all(uploadTasks);

      // Upload metadata to IPFS
      const metadata = {
        creatorId: user.id,
        title: nft.title,
        issuedBy: nft.issuedBy,
        function: nft.function,
        color: nft.color,
        date: nft.releasedDate,
        denom: nft.denom,
        color: nft.color,
        imgUrl: updates.imgUrl,
      };

      const metadataUploadTask = IpfsService.uploadStampMetadata(metadata).then(
        (metadataUpload) => {
          if (metadataUpload) {
            updates.metadata = metadataUpload.ipfsHash;
            console.log(metadataUpload);
            toast.success("Metadata uploaded on Pinata successfully");
          } else {
            throw new Error("Failed to upload metadata");
          }
        }
      );

      uploadTasks.push(metadataUploadTask);

      // Wait for all uploads to finish
      await Promise.all(uploadTasks);

      console.log("Updates", updates);

      setNft((prev) => ({
        ...prev,
        imgUrl: updates.imgUrl,
        metadataUrl: updates.metadataUrl,
      }));

      // Upload NFT to backend
    } catch (error) {
      console.error("Error uploading to IPFS:", error);
      toast.error("Error uploading to IPFS");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen my-20 mx-20 xl:mx-72 ">
        <h1 className="text-primary-foreground text-6xl font-bold">
          Create New NFT
        </h1>
        <span className="text-muted-foreground mt-5 text-2xl">
          Once your item is minted you will not be able to change any of its
          information.
        </span>
        <div className="grid grid-cols-[60%_5%_35%] mt-10">
          <div className="space-y-14">
            {/* Blockchain connection */}
            <div className="bg-card p-5 rounded-xl border-2">
              <div className="flex items-center flex-col md:flex-row justify-between gap-10">
                {/* Image */}
                <div className="flex gap-10 items-center">
                  <img
                    src="/EthereumIcon.svg"
                    alt="Ethereum Icon"
                    className="w-16 h-16"
                  />
                  <div className="flex flex-col">
                    <span className="text-primary-foreground text-2xl font-bold">
                      {/* {user.address} */}
                    </span>
                    <span className="text-muted-foreground text-2xl font-bold">
                      Ethereum
                    </span>
                  </div>
                </div>
                <div>
                  {/* {user.isConnected ? (
                    <div className="bg-green-500 text-white px-4 py-2 rounded">
                      Connected
                    </div>
                  ) : (
                    <div className="bg-red-500 text-white px-4 py-2 rounded">
                      Not Connected
                    </div>
                  )} */}
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
                    value={nft.price}
                    onChange={handlePriceChange}
                    className={`pl-5 py-8 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]
                      ${
                        !nft.price && isOnMarketplace
                          ? "border-destructive border-2"
                          : "border-2 border-primary"
                      }
                    `}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-primary-foreground font-medium">
                    ETH
                  </div>
                </div>
              </div>
            )}

            {/* Collection */}
            {/* <div className="space-y-4">
              <CollectionChooser
                collections={user.collections}
                onCollectionSelect={handleCollectionSelect}
              />
            </div> */}
            {/* Name */}
            <div className="space-y-4">
              <span className="text-primary-foreground text-3xl font-bold">
                Name
              </span>
              <div className="relative">
                <Input
                  id="name"
                  placeholder="Name your NFT"
                  value={nft.title}
                  onChange={handleNameChange}
                  className={`pl-5 py-8 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]
                    ${
                      !nft.title
                        ? "border-destructive border-2"
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
              <div className="relative">
                <Input
                  id="description"
                  placeholder="Enter a description"
                  value={nft.description}
                  onChange={handleDescriptionChange}
                  className={`pl-5 py-8 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)]
                    ${
                      !nft.description
                        ? "border-destructive border-2"
                        : "border-2 border-primary"
                    }
                  `}
                />
              </div>
            </div>
            <div className="grid grid-cols-[48%_4%_48%]">
              <div className="space-y-4">
                <span className="text-primary-foreground text-3xl font-bold">
                  Issued By
                </span>
                <div className="relative">
                  <Input
                    id="issuedBy"
                    placeholder="Enter country"
                    value={nft.issuedBy}
                    onChange={(e) =>
                      setNft((prev) => ({ ...prev, issuedBy: e.target.value }))
                    }
                    className={`pl-5 py-8 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)] border-2 border-primary
                      ${
                        !nft.issuedBy
                          ? "border-destructive border-2"
                          : "border-2 border-primary"
                      }
                      `}
                  />
                </div>
              </div>
              <div></div>
              <div className="space-y-4">
                {/* released date */}
                <span className="text-primary-foreground text-3xl font-bold">
                  Released Date
                </span>
                <div className="">
                  <CustomDateInput
                    id="released-date"
                    value={
                      nft.releasedDate
                        ? new Date(nft.releasedDate).toLocaleDateString("en-US")
                        : ""
                    }
                    onChange={(formattedDate) => {
                      const [day, month, year] = formattedDate.split("/");
                      const isoDate =
                        month && day && year
                          ? new Date(`${year}-${month}-${day}`).toISOString()
                          : "";

                      setNft((prev) => ({
                        ...prev,
                        releasedDate: isoDate,
                      }));
                    }}
                    className={`pl-5 py-8 w-full text-sm text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)] border-2 border-primary
                      ${
                        !nft.releasedDate
                          ? "border-destructive border-2"
                          : "border-2 border-primary"
                      }
                      `}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[48%_4%_48%]">
              <div className="space-y-4">
                <span className="text-primary-foreground text-3xl font-bold">
                  Face value
                </span>
                <div className="relative">
                  <Input
                    id="denom"
                    placeholder="Enter price"
                    value={nft.denom}
                    onChange={(e) =>
                      setNft((prev) => ({ ...prev, denom: e.target.value }))
                    }
                    className={`pl-5 py-8 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)] border-2 border-primary
                      ${
                        !nft.denom
                          ? "border-destructive border-2"
                          : "border-2 border-primary"
                      }
                      `}
                  />
                </div>
              </div>
              <div></div>
              <div className="space-y-4">
                {/* Color */}
                <span className="text-primary-foreground text-3xl font-bold">
                  Color
                </span>
                <div className="relative">
                  <Input
                    id="color"
                    placeholder="Color"
                    value={nft.color}
                    onChange={(e) =>
                      setNft((prev) => ({ ...prev, color: e.target.value }))
                    }
                    className={`pl-5 py-8 text-4xl text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)] border-2 border-primary
                      ${
                        !nft.color
                          ? "border-destructive border-2"
                          : "border-2 border-primary"
                      }
                      `}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4 w-[48%]">
              <span className="text-primary-foreground text-3xl font-bold">
                Function
              </span>
              <Select
                onValueChange={(value) =>
                  setNft((prev) => ({ ...prev, function: value }))
                }
              >
                <SelectTrigger
                  className={`pl-5 py-8 text-sm text-primary-foreground rounded-xl bg-[hsl(232,40%,35%)] border-2 border-primary
                  ${
                    !nft.function
                      ? "border-destructive border-2"
                      : "border-2 border-primary"
                  }
                  
                  `}
                >
                  <SelectValue placeholder="Select a function" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Function</SelectLabel>
                    <SelectItem value="postage">Postage</SelectItem>
                    <SelectItem value="airmail">Airmail</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Gap */}
          <div></div>

          {/* Preview */}
          <div className="max-h-[600px] sticky top-20 w-full overflow-auto">
            <div className="flex flex-col gap-10 mx-5">
              <span className="text-primary-foreground text-3xl font-bold">
                Preview
              </span>
              {nft.imgUrl ? (
                <PreviewNftCard stamp={nft} />
              ) : (
                <div className="border h-[450px] rounded-xl text-center p-4 flex justify-between items-center">
                  <span className="text-muted-foreground text-xl">
                    Upload file to preview your brand new NFT
                  </span>
                </div>
              )}
            </div>
          </div>

          <Button
            className="mt-10 w-1/2 mx-auto p-8 bg-white text-black  text-2xl font-bold"
            onClick={handleCreateNft}
            disabled={isLoading}
          >
            Create NFT
          </Button>
        </div>
      </div>
    </>
  );
}

export default CreateNft;
