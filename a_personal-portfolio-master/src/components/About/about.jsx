import React from 'react'
import Intro from './intro/intro'
import Timeline from './Timeline/Timeline'
export default function About() {
    return (
        <div className="whole-container">
            <div className="compartment">
                <Intro />
            </div>
            <div className="compartment">
                <Timeline />
            </div>
        </div>
    )
}
