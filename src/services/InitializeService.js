import NFTService from './NFTService.js';

export class InitializeService {
  constructor() {
    this.nftService = NFTService;
  }

  async initializeFromJSON(jsonData) {
    try {
      await this.nftService.init();
      
      const batchSize = 10;
      for (let i = 0; i < jsonData.length; i += batchSize) {
        const batch = jsonData.slice(i, i + batchSize);
        await this.nftService.initializeNFTs(batch);
        console.log(`Processed batch ${Math.floor(i/batchSize) + 1}`);
      }
      
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to initialize NFTs: ${error.message}`);
    }
  }
}

export default InitializeService;