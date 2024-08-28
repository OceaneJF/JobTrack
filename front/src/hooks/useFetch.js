import {useEffect, useState} from "react";

export function useFetch(url, options = {}) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url, {
            ...options,
            headers: {
                "Accept": "application/json; charset=UTF-8",
                ...options.headers
            }
        }).then(r => r.json()).then(data => {
            setData(data)
        }).catch((e) => {
            setError(e)
        }).finally(() => {
            setLoading(false);
        })
    }, []);
    return {
        loading, data, error
    }
}