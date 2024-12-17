import { PinataSDK } from "pinata-web3";

class IpfsService {
  constructor() {
    this.pinata = new PinataSDK({
      pinataJwt: process.env.PINATA_JWT,
      pinataGateway: process.env.GATEWAY_URL,
    });

    this.initializeGroups();
  }

  async initializeGroups() {
    try {
      this.avatarImgGroup = await this.ensureGroupExists("AvatarImage");
      this.bgImgGroup = await this.ensureGroupExists("BgImage");
      this.stampImgGroup = await this.ensureGroupExists("StampImage");
      this.metedataGroup = await this.ensureGroupExists("StampMetadata");
    } catch (error) {
      console.error("Error initializing groups:", error);
    }
  }

  async ensureGroupExists(groupName) {
    try {
      // Kiểm tra xem nhóm đã tồn tại chưa, nếu chưa thì tạo mới
      const groups = await this.pinata.groups.list().name(groupName);

      if (groups && groups.length > 0) {
        return groups[0];
      } else {
        const newGroup = await this.pinata.groups.create({
          name: groupName,
          is_public: true,
        });
        return newGroup;
      }
    } catch (error) {
      console.error(`Error ensuring group ${groupName} exists:`, error);
      throw error;
    }
  }

  async uploadAvatarImage(file, setIsLoading) {
    try {
      if (!(file instanceof File)) {
        throw new Error("Input không phải là tệp hợp lệ");
      }

      setIsLoading(true);

      const uploadOptions = {
        pinataMetadata: {
          name: `Avatar-${Date.now()}`,
          groupId: this.avatarImgGroup.id,
        },
      };

      const upload = await this.pinata.upload.file(file, uploadOptions);

      setIsLoading(false);

      return {
        ipfsHash: upload.IpfsHash,
        pinSize: upload.PinSize,
        timestamp: upload.Timestamp,
        url: `https://gateway.pinata.cloud/ipfs/${upload.IpfsHash}`,
      };
    } catch (error) {
      console.error("Lỗi tải lên avatar:", error);
      throw new Error(`Không thể tải lên avatar: ${error.message}`);
    }
  }

  async uploadBackgroundImage(file, setIsLoading) {
    try {
      if (!(file instanceof File)) {
        throw new Error("Input không phải là tệp hợp lệ");
      }

      setIsLoading(true);

      const uploadOptions = {
        pinataMetadata: {
          name: `Background-${Date.now()}`,
          groupId: this.bgImgGroup.id,
        },
      };

      // Tải lên tệp bình thường (File)
      const upload = await this.pinata.upload.file(file, uploadOptions);

      setIsLoading(false);

      return {
        ipfsHash: upload.IpfsHash,
        pinSize: upload.PinSize,
        timestamp: upload.Timestamp,
        url: `https://gateway.pinata.cloud/ipfs/${upload.IpfsHash}`,
      };
    } catch (error) {
      console.error("Lỗi tải lên background:", error);
      throw new Error(`Không thể tải lên background: ${error.message}`);
    }
  }
}

export default new IpfsService();
