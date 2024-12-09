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


export const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem("jwtToken");
    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
        Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
        throw new Error("Error fetching data");
    }

    return response.json();
}