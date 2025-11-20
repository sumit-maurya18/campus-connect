"use client";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";

const useSearchOpportunities = ({ type, search, page = 1, limit = 9 }) => {
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 🔹 If search box is empty → immediately reset
        if (!search || search.trim() === "") {
            setData([]);
            setTotalPages(1);
            setError(null);
            setLoading(false);
            return;
        }

        const fetchSearch = async () => {
            try {
                setLoading(true);
                setError(null);

                const baseUrl = process.env.NEXT_PUBLIC_URL;
                const params = new URLSearchParams({
                    q: search,
                    type,
                    page,
                    limit,
                });

                const res = await fetch(`${baseUrl}/search?${params.toString()}`);
                if (!res.ok) throw new Error("Failed to search opportunities");

                const json = await res.json();

                // -------------------------
                // 🟢 CASE 1 — Full API: success + data + totalPages
                // -------------------------
                if (json.success && json.data) {
                    setData(json.data);
                    setTotalPages(json.totalPages || 1);
                }

                // -------------------------
                // 🟡 CASE 2 — API returns array only
                // -------------------------
                else if (Array.isArray(json)) {
                    setData(json);
                    setTotalPages(1);
                }

                // -------------------------
                // 🔴 CASE 3 — API returns {data, total}
                // -------------------------
                else {
                    const list = json.data || [];
                    const total = json.total || json.data?.length || 0;

                    setData(list);
                    setTotalPages(Math.ceil(total / limit));
                }

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSearch();
    }, [search, type, page, limit]);

    return { data, totalPages, loading, error };
};

export default useSearchOpportunities;
