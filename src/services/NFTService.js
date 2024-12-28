import { ethers } from "ethers";
import NFTMarketplace from "../../contract/NFTMarketplace.json";
class NFTService {
  async connect(contract) {
    this.contract = contract;
  }

  isInitialized() {
    return this.contract !== undefined
  }

  async createToken(tokenURI, price, currentlyListed = false) {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }

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

  async executeSale(tokenId) {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }

      const nft = await this.contract.getListedTokenForId(tokenId);
      const price = nft.price_;

      const tx = await this.contract.executeSale(tokenId, {
        value: price,
        gasLimit: 5000000,
      });

      const receipt = await tx.wait();

      const event = receipt.logs
        .map((log) => {
          try {
            return this.contract.interface.parseLog(log);
          } catch (error) {
            return null;
          }
        })
        .find((event) => event && event.name === "TokenSold");

      return {
        success: true,
        transaction: receipt,
        event: event,
      };
    } catch (error) {
      console.error("Sale execution failed:", error);
      throw error;
    }
  }

  async checkoutCart(cartItems) {
    try {
      const results = [];

      for (const item of cartItems) {
        const response = await this.executeSale(item.tokenID);
        results.push(response);
      }

      return {
        success: results.every((result) => result.success),
        results: results,
      }
    } catch (error) {
      console.error("Checkout failed:", error);
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
