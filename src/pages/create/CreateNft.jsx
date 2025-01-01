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
import { useAuthHandler } from "@/handlers/AuthHandler";
import { useWallet } from "@/context/WalletProvider";
import { USER_ENDPOINTS } from "@/handlers/Endpoints";
import NFTService from "../../services/NFTService";
import { ethers } from "ethers";
import { TRANSACTION_ENDPOINTS } from "../../handlers/Endpoints";

function CreateNft() {
  const navigate = useNavigate();
  const [isOnMarketplace, setIsOnMarketplace] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchWithAuth } = useAuthHandler();
  const [collection, setCollection] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);

  const { isAuth, user } = useAuth();
  if (!isAuth) {
    toast.error("Please login to create NFTs");
    navigate("/");
  }

  async function saveTransaction(transaction) {
    try {
      const response = await fetchWithAuth(TRANSACTION_ENDPOINTS.BASE, {
        method: "POST",
        body: JSON.stringify(transaction),
      });

      if (!response.success) {
        throw new Error("Failed to save transaction");
      }

      return response.data;
    } catch (error) {
      console.error("Failed to save transaction:", error);
    }
  }

  async function fetchCollections() {
    try {
      const result = await fetchWithAuth(USER_ENDPOINTS.GET_COLLECTIONS);
      setCollection(result.data);
    } catch (error) {
      console.error("Error fetching collections", error);
    }
  }

  async function uploadNFTAssets(nft) {
    try {
      const stampImgUpload = await IpfsService.uploadStampImage(nft.imgUrl);
      if (!stampImgUpload?.url) {
        throw new Error("Failed to upload image");
      }

      const metadata = {
        creatorId: user._id,
        title: nft.title,
        issuedBy: nft.issuedBy,
        function: nft.function,
        color: nft.color,
        date: nft.releasedDate,
        denom: nft.denom,
        imgUrl: stampImgUpload.url,
      };

      const metadataUpload = await IpfsService.uploadStampMetadata(metadata);
      if (!metadataUpload?.url) {
        throw new Error("Failed to upload metadata");
      }

      return {
        imageUrl: stampImgUpload.url,
        metadataUrl: metadataUpload.url,
        ipfsHash: metadataUpload.ipfsHash,
      };
    } catch (error) {
      console.error("IPFS upload failed:", error);
      throw new Error("Failed to upload NFT assets to IPFS");
    }
  }

  // Mint NFT on blockchain
  async function mintNFTOnChain(metadataUrl, price, isListed) {
    try {
      const receipt = await NFTService.createNFT(
        metadataUrl,
        price || 0,
        isListed
      );
      if (!receipt?.success) {
        throw new Error("Minting failed");
      }

      const processedTransactions = processTransaction(receipt);
      if (processedTransactions) {
        await saveTransaction(processedTransactions);
      }

      return receipt;
    } catch (error) {
      console.error("Blockchain error:", error);
      throw new Error("Failed to mint NFT on blockchain");
    }
  }

  // Save NFT to backend
  async function saveNFTToBackend(nftData) {
    try {
      const result = await fetchWithAuth(USER_ENDPOINTS.CREATE_NFT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nftData),
      });

      if (!result.success) {
        throw new Error(result.message);
      }
      return result;
    } catch (error) {
      console.error("Backend error:", error);
      throw new Error("Failed to save NFT data");
    }
  }

  function resetForm() {
    setNft({
      title: "",
      imgUrl: "",
      description: "",
      issuedBy: "",
      denom: "",
      color: "",
      releasedDate: "",
      function: "",
      price: ""
    });
  }

  useEffect(() => {
    fetchCollections();
  }, []);

  const { isConnected, address } = useWallet();

  const [nft, setNft] = useState({
    title: "",
    imgUrl: "",
    price: "",
    ownerDetails: {
      username: user.name,
      avatarUrl: user.avatarUrl,
      id: user.id,
    },
    issuedBy: "",
    denom: "",
    function: "",
    color: "",
    releasedDate: "",
    cid: "",
  });

  const handleFileSelect = (file) => {
    setNft({ ...nft, imgUrl: file });
    setIsCreated(true);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setNft((prev) => ({ ...prev, price: value }));
    }
  };

  const handleNameChange = (e) => {
    setNft((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleDescriptionChange = (e) => {
    setNft((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleCreateNft = async () => {
    const requiredFields = [
      "title",
      "imgUrl",
      "description",
      "issuedBy",
      "denom",
      "color",
      "releasedDate",
      "function",
    ];
    const missingFields = requiredFields.filter((field) => !nft[field]);

    if (missingFields.length > 0) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsLoading(true);
    let pinataImgUrl, pinataCid, pinataMetadataUrl;
    try {
      // Step 1: Upload assets
      const { imageUrl, metadataUrl, ipfsHash } = await uploadNFTAssets(nft);

      // Step 2: Mint on blockchain
      const receipt = await mintNFTOnChain(
        metadataUrl,
        nft.price,
        isOnMarketplace
      );

      // Step 3: Save to backend
      const nftData = {
        title: nft.title,
        issuedBy: nft.issuedBy,
        function: nft.function,
        color: nft.color,
        date: nft.releasedDate,
        denom: nft.denom,
        imgUrl: imageUrl,
        tokenID: Number(receipt.event.args[0]),
        price: nft.price || 0,
        tokenUrl: metadataUrl,
        description: nft.description,
        collection: selectedCollection,
        isListed: isOnMarketplace,
        creatorId: user._id,
      };

      await saveNFTToBackend(nftData);

      // Success handling
      toast.success("NFT created successfully");
      resetForm();
      navigate(`/user/${user._id}/created`);
    } catch (error) {
      console.error("NFT creation failed:", error);
      toast.error(error.message || "Failed to create NFT");
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
            <div
              className={`bg-card p-5 rounded-xl border-2
              ${isConnected ? "" : "w-fit"}
              `}
            >
              <div className="flex items-center flex-col md:flex-row">
                {/* Image */}
                <div className="flex gap-10 items-center">
                  <img
                    src="/EthereumIcon.svg"
                    alt="Ethereum Icon"
                    className="w-16 h-16"
                  />
                  <div className="flex flex-col max-w-[43%]">
                    <span className="text-primary-foreground text-2xl font-bold truncate">
                      {formatAddress(address)}
                    </span>
                    <span className="text-muted-foreground text-2xl font-bold">
                      Ethereum
                    </span>
                  </div>
                  <div className="">
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
            <div className="space-y-4">
              <CollectionChooser
                collections={collection}
                onCollectionSelect={setSelectedCollection}
              />
            </div>
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
                    type="number"
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
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="relative w-6 h-6">
                  {/* Outer ring */}
                  <div className="absolute w-full h-full border-2 border-black opacity-20 rounded-full" />
                  {/* Spinning ring */}
                  <div className="absolute w-full h-full border-2 border-black border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
            ) : (
              <span>Create NFT</span>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}

function formatAddress(address) {
  return `${address.slice(0, 20)}`;
}

function processTransaction(transactionData) {
  const { event, transaction: _transaction } = transactionData;
  if (!event || !_transaction) return null;

  try {
    const gasUsed = BigInt(_transaction.gasUsed);
    const gasPrice = BigInt(_transaction.gasPrice);
    const transactionFee = ethers.formatEther((gasUsed * gasPrice).toString());

    return {
      transactionHash: _transaction.blockHash,
      block: _transaction.blockNumber,
      from: _transaction.from,
      to: _transaction.to,
      tokenID: Number(event.args[0]),
      value: ethers.formatEther(event.args[3].toString()),
      transactionFee,
      gasPrice: ethers.formatEther(gasPrice.toString()),
    };
  } catch (error) {
    console.error("Failed to process transaction:", error);
    return null;
  }
}

export default CreateNft;
