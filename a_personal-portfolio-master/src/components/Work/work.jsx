import React,{useState,useEffect} from 'react'
import {fetchRepo} from '../../Globals/fetchRepo'
import Card from '../cards/card'
import './work.css'
export default function Work() {
    const [repo, setRepo] = useState([])
    useEffect(() => {
      fetchRepo(setRepo)
    }, [])
    return (
        <div className="main-card-container">
        <div className="card-container">
           {
            (repo.length === 0) ? 
                <div className="loading">.</div>
                        : repo.map(el => {
                            return (
                                <Card key={el.id} repo={el} />
                            )
                        }
                        )
           }
        </div>
        </div>
    )
}
