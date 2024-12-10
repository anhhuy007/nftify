const protocol = "http";
const host = "localhost:3000";
export const baseUrl = `${protocol}://${host}/api/v1`;

export const fetcher = (url) => fetch(url).then((res) => res.json());

// home page endpoints
export const trendingNftsApiEndpoint = `${baseUrl}/marketplace/list/trending/stamps`;
export const trendingCollectionsApiEndpoint = `${baseUrl}/marketplace/list/trending/collections`;
export const trendingCreatorsApiEndpoint = `${baseUrl}/marketplace/list/trending/creators`;

// nfts marketplace endpoints
export const nftsApiEndpoint = `${baseUrl}/marketplace/list/stamps`;