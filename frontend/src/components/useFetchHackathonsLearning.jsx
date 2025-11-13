'use client';
import { useState, useEffect } from "react";

// ==============================================
// 🎯 Custom React Hook: useFetchHackathonsLearning
// ==============================================
//
// ✅ Purpose:
// Fetches hackathons or learning events from the backend API `/api/hackathon_learning`
// with optional filtering (by event type), pagination, and built-in loading/error handling.
//
// ✅ Usage Example:
// const { data, loading, error } = useFetchHackathonsLearning({ event: "learning", limit: 5, page: 1 });
//
// ==============================================
const useFetchHackathonsLearning = ({ event, limit = 3, page = 1 }) => {
  const [data, setData] = useState([]);       
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);     

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const baseUrl = process.env.NEXT_PUBLIC_URL;
        
        // ✅ Build URL dynamically — only add event if provided
        let url = `${baseUrl}/api/hackathon_learning?limit=${limit}&page=${page}`;
        if (event) {
          url += `&event=${event}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch hackathon/learning data");

        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [event, limit, page]);

  return { data, loading, error };
};

export default useFetchHackathonsLearning;
