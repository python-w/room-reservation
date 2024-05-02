import { useCallback, useState } from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(true);

    const sendRequest = useCallback(async (requestConfig) => {
        setIsLoading(true);

        try {
            let response = null;

            if (requestConfig?.method && requestConfig?.method.toUpperCase() === 'POST') {
                response = await fetch(requestConfig.url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestConfig.body)
                });
            } else {
                response = await fetch(requestConfig.url);
            }

            if (!response.ok) {
                throw new Error('Something went wrong. Please try again later.');
            }

            setIsLoading(false);
            return response; // Return the entire response object
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

export default useHttp;