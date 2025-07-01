import React, { useState, useEffect } from 'react'
import './blog.css'

// Helper to fetch Medium RSS and convert to JSON
async function fetchMediumBlogs(setBlogs) {
    const rssUrl = 'https://medium.com/feed/@eshnehapaudyal'; // Replace with your Medium username
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setBlogs(data.items || []);
    } catch (e) {
        setBlogs([]);
    }
}

function Blog() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetchMediumBlogs(setBlogs);
    }, []);

    return (
        <div className="main-card-container">
            <div className="card-container">
                {blogs.length === 0 ? (
                    <div className="loading">Loading...</div>
                ) : (
                    blogs.map(blog => (
                        <div className="blog-card" key={blog.guid}>
                            <a href={blog.link} target="_blank" rel="noopener noreferrer">
                                <h3>{blog.title}</h3>
                                {/* <p>{blog.pubDate.slice(0, 10)}</p> */}
                            </a>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Blog;