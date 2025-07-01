import React, { useState, useEffect } from 'react'
import { fetchRepo } from '../../Globals/fetchRepo'
import './work.css' // Use the same CSS as blogs

export default function Work() {
    const [repo, setRepo] = useState([])

    useEffect(() => {
        fetchRepo(setRepo)
    }, [])

    return (
        <div className="main-card-container">
            <div className="card-container">
                {repo.length === 0 ? (
                    <div className="loading">Loading...</div>
                ) : (
                    repo.map(el => (
                        <div className="blog-card" key={el.id}>
                            <a href={el.html_url} target="_blank" rel="noopener noreferrer">
                                <h3>{el.name}</h3>
                                <p>{el.description}</p>
                            </a>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}