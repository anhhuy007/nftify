import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { InitializeService } from './src/services/InitializeService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const initData = async () => {
    try {
        const service = new InitializeService();
        const jsonData = await import('./data/nfts.json', {
            assert: { type: 'json' }
        });
        
        await service.initializeFromJSON(jsonData.default);
        console.log('NFT data initialized successfully');
    } catch (error) {
        console.error('Failed to initialize NFT data:', error);
        process.exit(1);
    }
};

initData();