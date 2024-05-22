import { useCallback, useState } from "react";
import axios from "axios";

const useAPI = () => {
    const [isLoading, setIsLoading] = useState(true);

    const sendRequest = useCallback(async (requestConfig) => {
        setIsLoading(true);

        try {
            let response = null;

            if (requestConfig?.method && requestConfig?.method.toUpperCase() === 'POST') {
                response = await axios.post(requestConfig.url, requestConfig.body, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                response = await axios.get(requestConfig.url);
            }

            setIsLoading(false);
            return response.data; // Return response data instead of the entire response object
        } catch (err) {
            setIsLoading(false);
            throw new Error("Something went wrong. Please try again later.");
        }

    }, []);

    return {
        loading: isLoading,
        sendRequest
    };
};

export default useAPI;
