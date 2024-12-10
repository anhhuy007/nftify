export const fetchWithAuth = async (url, options = {}, refreshAccessToken) => {
    const token = localStorage.getItem("jwtToken");
    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
        Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {  
        const newToken = await refreshAccessToken();
        if (newToken) {
            const newHeaders = {
                ...headers,
                Authorization: `Bearer ${newToken}`,
            };  

            console.log("New headers: ", newHeaders);

            const newResponse = await fetch(url, { ...options, headers: newHeaders });
            if (!newResponse.ok) {
                throw new Error("Error fetching data");
            }

            return newResponse.json();
        }
        else {
            throw new Error("Error refreshing token");
        }
    }

    if (!response.ok) {
        throw new Error("Error fetching data");
    }

    return response.json();
}