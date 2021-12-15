import React from 'react'
import Slogan from './Slogan/Slogan'
import Graphics from './Graphics/Graphics'
import './Hero-styles.css'
export default function Hero() {
    return (
        <div className="whole-container">
            <div className="slogan-container compartment">
                <Slogan />
            </div>
            <div className = "graphics-container compartment">
                <Graphics/>
            </div>
        </div>

    )
}
