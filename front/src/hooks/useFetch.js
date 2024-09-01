import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export function useFetch(url, options = {}) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        fetch(url, {
            ...options,
            headers: {
                "Accept": "application/json; charset=UTF-8",
                ...options.headers
            }
        }).then(r => r.json()).then(data => {
            if (data?.error && data?.code === 401) {
                localStorage.clear()
                navigate("/");
            } else {
                setData(data)
            }
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