import React from 'react'
import Photo from '../../../Assets/photo.JPG'
import './Graphics.styles.css'
export default function Graphics() {
    return (
        <div className="container-p">
        <div className="image-cropper ">
            <img src={Photo} alt="Logo" className="image" />
        </div>
        </div>
    )
}
