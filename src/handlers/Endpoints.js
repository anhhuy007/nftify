const protocol = "http";
const host = "localhost:3000";
export const baseUrl = `${protocol}://${host}/api/v1`;

export const fetcher = (url) => fetch(url).then((res) => res.json());

// authentification endpoints
export const registerApiEndpoint = `${baseUrl}/auth/register`;  
export const loginApiEndpoint = `${baseUrl}/auth/login`;
export const signupApiEndpoint = `${baseUrl}/auth/signup`;
export const refreshTokenApiEndpoint = `${baseUrl}/auth/refresh-token`;
export const logoutApiEndpoint = `${baseUrl}/auth/logout`;

// home page endpoints
export const trendingNftsApiEndpoint = `${baseUrl}/marketplace/list/trending/stamps`;
export const trendingCollectionsApiEndpoint = `${baseUrl}/marketplace/list/trending/collections`;
export const trendingCreatorsApiEndpoint = `${baseUrl}/marketplace/list/trending/creators`;

// nfts marketplace endpoints
export const nftsApiEndpoint = `${baseUrl}/marketplace/list/stamps`;

// nft detail endpoints
export const stampDetailApiEndpoint = `http://localhost:3000/api/v1/marketplace/stamp`;

// cart endpoints
export const cartApiEndpoint = `${baseUrl}/user/cart`;

// test auth endpoint
export const testEndpoint = `${baseUrl}/auth/posts`;

// user setting endpoints
export const getUserApiEndpoint = `${baseUrl}/user/`;
export const userApiEndpoint = `${baseUrl}/user/settings`;
export const userSettingApiEndpoint = `${baseUrl}/user/settings`;
export const userSettingUploadApiEndpoint = `${baseUrl}/user/settings/upload`;
export const userCheckPasswordApiEndpoint = `${baseUrl}/user/settings/check-password`;
export const userChangePasswordApiEndpoint = `${baseUrl}/user/settings/change-password`;
export const userChangeEmailApiEndpoint = `${baseUrl}/user/settings/change-email`;
export const userInitWalletApiEndpoint = `${baseUrl}/user/init-wallet`;

// collection detail endpoints
export const collectionDetailApiEndpoint = `${baseUrl}/collection/:collectionId/detail`;
export const collectionAboutApiEndpoint = `${baseUrl}/collection/:id/about`;
export const collectionItemsApiEndpoint = `${baseUrl}/collection/:id/items`;

// User detail endpoints
export const userDetailApiEndpoint = `${baseUrl}/user/profile/:userId`;
export const userOwnedNftsApiEndpoint = `${baseUrl}/user/profile/:userId/owned`;
export const userOnSaleNftsApiEndpoint = `${baseUrl}/user/profile/:userId/on-sale`;
export const userCreatedNftsApiEndpoint = `${baseUrl}/user/profile/:userId/created`;
export const userLikedNftsApiEndpoint = `${baseUrl}/user/profile/:userId/liked`;
export const userCollectionsApiEndpoint = `${baseUrl}/user/profile/:userId/collections`;

// Marketplace endpoints
export const usersApiEndpoint = `${baseUrl}/marketplace/list/creators`;
export const collectionsApiEndpoint = `${baseUrl}/marketplace/list/collections`;
