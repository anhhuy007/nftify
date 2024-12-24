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

  async uploadAvatarImage(file) {
    try {
      if (!(file instanceof File)) {
        throw new Error("Input không phải là tệp hợp lệ");
      }

      const uploadOptions = {
        pinataMetadata: {
          name: `Avatar-${Date.now()}`,
          groupId: this.avatarImgGroup.id,
        },
      };

      const upload = await this.pinata.upload.file(file, uploadOptions);

      return {
        ipfsHash: upload.IpfsHash,
        pinSize: upload.PinSize,
        timestamp: upload.Timestamp,
        url: `https://plum-glamorous-cephalopod-335.mypinata.cloud/ipfs/${upload.IpfsHash}`,
      };
    } catch (error) {
      console.error("Lỗi tải lên avatar:", error);
      throw new Error(`Không thể tải lên avatar: ${error.message}`);
    }
  }

  async uploadBackgroundImage(file) {
    try {
      if (!(file instanceof File)) {
        throw new Error("Input không phải là tệp hợp lệ");
      }

      const uploadOptions = {
        pinataMetadata: {
          name: `Background-${Date.now()}`,
          groupId: this.bgImgGroup.id,
        },
      };

      const upload = await this.pinata.upload.file(file, uploadOptions);

      return {
        ipfsHash: upload.IpfsHash,
        pinSize: upload.PinSize,
        timestamp: upload.Timestamp,
        url: `https://plum-glamorous-cephalopod-335.mypinata.cloud/ipfs/${upload.IpfsHash}`,
      };
    } catch (error) {
      console.error("Lỗi tải lên background:", error);
      throw new Error(`Không thể tải lên background: ${error.message}`);
    }
  }

  async uploadStampImage(file) {
    try {
      if (!(file instanceof File)) {
        throw new Error("Input không phải là tệp hợp lệ");
      }

      const uploadOptions = {
        pinataMetadata: {
          name: `Stamp-${Date.now()}`,
          groupId: this.stampImgGroup.id,
        },
      };

      const upload = await this.pinata.upload.file(file, uploadOptions);

      return {
        ipfsHash: upload.IpfsHash,
        pinSize: upload.PinSize,
        timestamp: upload.Timestamp,
        url: `https://plum-glamorous-cephalopod-335.mypinata.cloud/ipfs/${upload.IpfsHash}`,
      };
    } catch (error) {
      console.error("Lỗi tải lên stamp:", error);
      throw new Error(`Không thể tải lên stamp: ${error.message}`);
    }
  }

  async uploadStampMetadata(metadata) {
    console.log("Metadata:", metadata);
    try {
      if (!metadata || typeof metadata !== "object") {
        throw new Error("Metadata không hợp lệ");
      }

      const uploadOptions = {
        pinataMetadata: {
          name: `Stamp-${metadata.title}-${Date.now()}`,
          groupId: this.metedataGroup.id,
        },
      };

      const upload = await this.pinata.upload.json(metadata, uploadOptions);
      console.log("Upload metadata:", upload);

      return {
        ipfsHash: upload.IpfsHash,
        pinSize: upload.PinSize,
        timestamp: upload.Timestamp,
        url: `https://plum-glamorous-cephalopod-335.mypinata.cloud/ipfs/${upload.IpfsHash}`,
      };
    } catch (error) {
      console.error("Lỗi tải lên metadata:", error);
      throw new Error(`Không thể tải lên metadata: ${error.message}`);
    }
  }
}

export default new IpfsService();
