import { BsCreditCard2Back } from 'react-icons/bs';
import { BsPerson } from 'react-icons/bs';
import { BsTag } from 'react-icons/bs';
import { FiClock } from 'react-icons/fi';
import { FaRegWindowMaximize } from 'react-icons/fa';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { BsArchiveFill } from 'react-icons/bs';
// BsStar

export function QuickBarBtn ({sideBarRef}){
    return(
        <div className='quick-bar-btn' ref={sideBarRef}>
            <div className="quick-bar-btn-container">
            <span className='icon'><BsCreditCard2Back/></span>
                <span>Open card</span>
            </div>        
            <div className="quick-bar-btn-container">
            <span className='icon'><BsTag/></span>
                <span>Edit labels</span>
            </div>        
            <div className="quick-bar-btn-container">
            <span className='icon'><BsPerson/></span>
                <span>Change members</span>
            </div>        
            <div className="quick-bar-btn-container">
            <span className='icon'><FaRegWindowMaximize/></span>
                <span>Change cover</span>
            </div>        
            <div className="quick-bar-btn-container">
            <span className='icon'><AiOutlineArrowRight/></span>
                <span>Move</span>
            </div>        
            <div className="quick-bar-btn-container">
            <span className='icon'><BsCreditCard2Back/></span>
                <span>Copy</span>
            </div>        
            <div className="quick-bar-btn-container">
            <span className='icon'><FiClock/></span>
                <span>Edit Dates</span>
            </div>        
            <div className="quick-bar-btn-container">
            <span className='icon'><BsArchiveFill/></span>
                <span>Archive</span>
            </div>        
        </div>
    )
}