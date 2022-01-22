import React from 'react'
import { Link } from "react-router-dom";

import starIcon from '../../assets/imgs/user-boards/star.png'
import goldStarIcon from '../../assets/imgs/user-boards/gold-star.png'


export function BoardPreview(props) {
    const {board, onEditBoard} = props
    const {_id,title,style} = board
    const {bgImg} = style

    const onToggleStar = async()=>{
        const newBoard = {...board}
        newBoard.isStarred = !newBoard.isStarred
        
        try{
            onEditBoard(newBoard);
        }
        catch(err){
            console.log("error", err);
        }
    }

    return (
        
        <div className="board-preview" style={{background:`url(${bgImg})`}}>
            <Link to={`/${_id}`}> 
            <div className='board-details'>
                <h2>{title}</h2>
                </div>

            </Link>
            {board?.isStarred ? <img src={goldStarIcon} className='star-btn' onClick={onToggleStar}/>  : <img src={starIcon} className='star-btn' onClick={onToggleStar}/>}

        </div>
    )
}

