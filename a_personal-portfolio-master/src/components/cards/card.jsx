import React from 'react'
import './card.css'
export default function Card(props) {
    return (
        <div className="container-card" href="www.github.com">
            <h1 className="repo-name">{props.repo.name}</h1>
            <p className="repo-dis">{props.repo.description}</p>
            <a className="work-view" href={props.repo.html_url} target="_blank" rel="noreferrer">View Work</a>
        </div>
    )
}
