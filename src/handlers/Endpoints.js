const protocol = process.env.PROTOCOL;
const host = process.env.HOST;
const apiPrefix = process.env.API_PREFIX;
const port = process.env.PORT;
export const baseUrl = `${protocol}://${host}:${port}/${apiPrefix}`;

export const fetcher = (url) => fetch(url).then((res) => res.json());

// Auth Routes
export const AUTH_ENDPOINTS = {
  REGISTER: `${baseUrl}/auth/register`,
  LOGIN: `${baseUrl}/auth/login`,
  SIGNUP: `${baseUrl}/auth/signup`,
  REFRESH: `${baseUrl}/auth/refresh-token`,
  LOGOUT: `${baseUrl}/auth/logout`,
  TEST: `${baseUrl}/auth/posts`,
};

// Home Page Endpoints
export const HOME_ENDPOINTS = {
  TRENDING_NFTS: `${baseUrl}/marketplace/list/trending/stamps`,
  TRENDING_COLLECTIONS: `${baseUrl}/marketplace/list/trending/collections`,
  TRENDING_CREATORS: `${baseUrl}/marketplace/list/trending/creators`,
};

// Cart Endpoints
export const CART_ENDPOINTS = {
  CART: `${baseUrl}/user/cart`,
};

// Marketplace Endpoints
export const MARKETPLACE_ENDPOINTS = {
  LIST_NFTS: `${baseUrl}/marketplace/list/stamps`,
  LIST_COLLECTIONS: `${baseUrl}/marketplace/list/collections`,
  LIST_CREATORS: `${baseUrl}/marketplace/list/creators`,
  NFT_DETAIL: `${baseUrl}/marketplace/stamp`,
};

// User Endpoints
export const USER_ENDPOINTS = {
  GET_USER: `${baseUrl}/user/`,
  SETTING: {
    BASE: `${baseUrl}/user/settings`,
    UPLOAD: `${baseUrl}/user/settings/upload`,
    CHANGE_PASSWORD: `${baseUrl}/user/settings/change-password`,
    CHANGE_EMAIL: `${baseUrl}/user/settings/change-email`,
  },
  CHECK_PASSWORD: `${baseUrl}/user/settings/check-password`,
  INIT_WALLET: `${baseUrl}/user/init-wallet`,
  PROFILE: {
    BASE: `${baseUrl}/user/profile/:userId`,
    OWNED_NFTS: `${baseUrl}/user/profile/:userId/owned`,
    ON_SALE_NFTS: `${baseUrl}/user/profile/:userId/on-sale`,
    CREATED_NFTS: `${baseUrl}/user/profile/:userId/created`,
    LIKED_NFTS: `${baseUrl}/user/profile/:userId/liked`,
    COLLECTIONS: `${baseUrl}/user/profile/:userId/collections`,
    EDIT_NFT: `${baseUrl}/user/edit/nft`,
    DELETE_NFT: `${baseUrl}/user/delete/nft`,
    EDIT_COLLECTION: `${baseUrl}/user/edit/collection`,
    DELETE_COLLECTION: `${baseUrl}/user/delete/collection`,
  },
  CREATE_NFT: `${baseUrl}/user/create/nft`,
  GET_COLLECTIONS: `${baseUrl}/user/collectionList`,
  CREATE_COLLECTION: `${baseUrl}/user/collection/create`,
};

// Collection Detail Endpoints
export const COLLECTION_ENDPOINTS = {
  DETAIL: {
    ABOUT: `${baseUrl}/collection/:id/about`,
    ITEMS: `${baseUrl}/collection/:id/items`,
  },
};

// Transaction Endpoints
export const TRANSACTION_ENDPOINTS = {
  BASE: `${baseUrl}/transaction`,
  LIST: `${baseUrl}/transaction/list`,
  FIND: `${baseUrl}/transaction/find`,
};
