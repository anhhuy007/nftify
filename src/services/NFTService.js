import { ethers } from "ethers";
import NFTMarketplace from "../../contract/artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json" assert { type: "json" };

class NFTService {
  constructor() {
    this.provider = new ethers.JsonRpcProvider("http://localhost:8545");
    this.contract = null;
    this.signer = null;
  }

  async init() {
    try {
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

      // Use hardhat's first account private key
      const privateKey =
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

      // Create wallet and connect to provider
      this.signer = new ethers.Wallet(privateKey, this.provider);

      // Initialize contract with wallet
      this.contract = new ethers.Contract(
        contractAddress,
        NFTMarketplace.abi,
        this.signer
      );

      return true;
    } catch (error) {
      console.error("Failed to initialize NFT service:", error);
      throw error;
    }
  }

  async initializeNFTs(nftData) {
    if (!this.contract) {
      await this.init();
    }

    try {
      const formattedNFTs = nftData.map((nft) => ({
        owner: nft.metamaskAddress,
        tokenURI: nft.cid,
        price: ethers.parseEther(nft.price.toString()),
        isListed: nft.sellingStatus,
      }));

      console.log("Formatted NFTs:", formattedNFTs);

      const tx = await this.contract.bulkInitializeNFTs(formattedNFTs, {
        gasLimit: 5000000,
      });

      return await tx.wait();
    } catch (error) {
      console.error("NFT initialization failed:", error);
      throw error;
    }
  }

  async createToken(tokenURI, price, currentlyListed = false) {
    try {
      const listPrice = await this.contract.getListPrice();
      const tx = await this.contract.createToken(
        tokenURI,
        ethers.parseEther(price.toString()),
        currentlyListed,
        { value: listPrice }
      );
      return await tx.wait();
    } catch (error) {
      console.error("Token creation failed:", error);
      throw error;
    }
  }

  async executeSale(tokenId, price) {
    try {
      const tx = await this.contract.excuteSale(tokenId, {
        value: ethers.parseEther(price.toString()),
      });
      return await tx.wait();
    } catch (error) {
      console.error("Sale execution failed:", error);
      throw error;
    }
  }

  async updateTokenPrice(tokenId, newPrice) {
    try {
      const tx = await this.contract.updateTokenPrice(
        tokenId,
        ethers.parseEther(newPrice.toString())
      );
      return await tx.wait();
    } catch (error) {
      console.error("Price update failed:", error);
      throw error;
    }
  }

  async getAllNFTs() {
    try {
      const nfts = await this.contract.getAllNFTs();
      // console.log("NFTs:", nfts.tokenURIs);
      return this.formatNFTResponse(nfts);
    } catch (error) {
      console.error("Failed to get all NFTs:", error);
      throw error;
    }
  }

  async getMyNFTs() {
    try {
      const nfts = await this.contract.getMyNFTs();
      return this.formatNFTResponse(nfts);
    } catch (error) {
      console.error("Failed to get owned NFTs:", error);
      throw error;
    }
  }

  async getTokenPriceHistory(tokenId) {
    try {
      const history = await this.contract.getTokenPriceHistory(tokenId);
      return history.map((item) => ({
        price: ethers.formatEther(item.price),
        timestamp: Number(item.timestamp),
        setter: item.setter,
      }));
    } catch (error) {
      console.error("Failed to get price history:", error);
      throw error;
    }
  }

  formatNFTResponse([
    tokenIds,
    tokenURIs,
    creators,
    owners,
    prices,
    currentlyListeds,
  ]) {
    return tokenIds.map((id, index) => ({
      tokenId: Number(id),
      tokenURI: tokenURIs[index],
      creator: creators[index],
      owner: owners[index],
      price: ethers.formatEther(prices[index]),
      currentlyListed: currentlyListeds[index],
    }));
  }
}

export default new NFTService();
