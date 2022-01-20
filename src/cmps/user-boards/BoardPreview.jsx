import React from 'react'
import { Link } from "react-router-dom";



export function BoardPreview() {

    return (
        <div className="board-preview">
            <Link to={`/b101`}> 
                <div className='board-details' style={{background:'url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/b95de2cf239d179275031cf5eefc799d/photo-1642076573338-9bc6a667fe57.jpg)'}}>
                    Example Board
                </div>
            </Link>
        </div>
    )
}



