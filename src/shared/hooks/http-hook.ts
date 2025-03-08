import { useCallback, useEffect, useRef, useState } from 'react';

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState<Record<number, boolean>>({});
    const [errors, setErrors] = useState<Record<number, string | null>>({});
    const activeHttpRequests = useRef<Record<number, AbortController>>({});

    const sendRequest = useCallback(
        async ({
            key,
            url,
            method = 'GET',
            body = null,
            headers = {},
            onError,
            onSuccess,
        }: {
            key: number;
            url: string;
            method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
            body?: any;
            headers?: Record<string, string>;
            onError?: (error: string) => void;
            onSuccess?: (data: any) => void;
        }) => {
            setIsLoading((prev) => ({ ...prev, [key]: true }));
            const httpAbortCtrl = new AbortController();
            activeHttpRequests.current[key] = httpAbortCtrl;

            try {
                let requestUrl = url;
                if (method === 'GET' && body && typeof body === 'object') {
                    const params = new URLSearchParams(body).toString();
                    requestUrl = `${url}?${params}`;
                }

                const isJson = body && !(body instanceof FormData);
                const finalHeaders: HeadersInit = { 'Accept': 'application/json', ...headers };
                if (isJson) {
                    finalHeaders['Content-Type'] = 'application/json';
                }

                const response = await fetch(requestUrl, {
                    method,
                    body: method !== 'GET' ? (isJson ? JSON.stringify(body) : body) : null,
                    headers: finalHeaders,
                    signal: httpAbortCtrl.signal,
                    credentials: "include",
                });

                const responseData = await response.json();

                if (!response.ok) {
                    const errorMessage = responseData.message || 'Une erreur est survenue';
                    setErrors((prev) => ({ ...prev, [key]: errorMessage }));
                    onError?.(errorMessage);
                    return null;
                }

                setErrors((prev) => ({ ...prev, [key]: null }));
                onSuccess?.(responseData);
                return responseData;
            } catch (err: any) {
                if (err.name !== 'AbortError') {
                    const errorMessage = err.message || 'Erreur inconnue';
                    setErrors((prev) => ({ ...prev, [key]: errorMessage }));
                    onError?.(errorMessage);
                }
                return null;
            } finally {
                if (activeHttpRequests.current[key]) {
                    delete activeHttpRequests.current[key];
                }
                setIsLoading((prev) => ({ ...prev, [key]: false }));
            }
        },
        []
    );

    useEffect(() => {
        return () => {
            Object.values(activeHttpRequests.current).forEach((abortCtrl) => abortCtrl.abort());
        };
    }, []);

    return { isLoading, errors, sendRequest };
};