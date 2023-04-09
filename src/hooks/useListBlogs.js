import { useState, useEffect, useCallback } from 'react';

export function useListBlogs(url = 'http://localhost:3001/v1/api/posts') {
    const [id, setId] = useState(0);
    const [blogs, setBlogs] = useState(null);

    // Begin fetching data if url changes
    useEffect(() => {
        // If there is no data, we must fetch it
        if (!blogs || blogs instanceof Error)
            fetch(url) // Fetch data from url
                .then((response) => response.json()) // Parse response as JSON
                .then(setBlogs) // Set blogs to data
                .catch((error) => setBlogs(error)); // Set error to error
    }, [id]);

    // Define a hook to cause a refresh in the case of Error
    const reload = useCallback(() => setId((id) => id + 1), []);

    // Return data and refresh function
    return [blogs, reload];
}
