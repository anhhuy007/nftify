const protocol = "http";
const host = "localhost:3000";
export const baseUrl = `${protocol}://${host}/api/v1`;

export const fetcher = (url) => fetch(url).then((res) => res.json());

// authentification endpoints
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

// test auth endpoint
export const testEndpoint = `${baseUrl}/auth/posts`;

// user setting endpoints
export const userSettingApiEndpoint = `${baseUrl}/user/settings`;
export const userSettingUploadApiEndpoint = `${baseUrl}/user/settings/upload`;
export const userCheckPasswordApiEndpoint = `${baseUrl}/user/settings/check-password`;
export const userChangePasswordApiEndpoint = `${baseUrl}/user/settings/change-password`;
export const userChangeEmailApiEndpoint = `${baseUrl}/user/settings/change-email`;
