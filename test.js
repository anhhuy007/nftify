import NFTService from "./src/services/NFTService.js";

const listAllNFTs = async () => {
  try {
    // Initialize NFT service and connect to network
    await NFTService.init();
    console.log("Connected to network");

    // Get all NFTs
    const nfts = await NFTService.getAllNFTs();
    console.log("\nTotal NFTs found:", nfts.length);

    // Display NFT details
    nfts.forEach((nft, index) => {
      console.log(`\nNFT #${index + 1}:`);
      console.log(`Token ID: ${nft.tokenId}`);
      console.log(`Token URI: ${nft.tokenURI}`);
      console.log(`Creator: ${nft.creator}`);
      console.log(`Owner: ${nft.owner}`);
      console.log(`Price: ${nft.price} ETH`);
      console.log(`Listed: ${nft.currentlyListed ? "Yes" : "No"}`);
    });
  } catch (error) {
    console.error("Failed to list NFTs:", error);
    process.exit(1);
  }
};

// Run the script
listAllNFTs();
