import { BsCreditCard2Back } from 'react-icons/bs';
import { BsPerson } from 'react-icons/bs';
import { BsTag } from 'react-icons/bs';
import { FiClock } from 'react-icons/fi';
import { FaRegWindowMaximize } from 'react-icons/fa';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { BsArchiveFill } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import { AddLabel } from '../pop-hover/AddLabel';
import { DatePickerPop } from '../pop-hover/DatePickerPop';
import { AddCover } from '../pop-hover/AddCover';
import { AddUserToTask } from '../pop-hover/AddUserToTask';


export function QuickBarBtn ({task, sideBarRef, openEditCard, onTaskArchived, quickBarPos}){
    const [isPopOpen, setPopOpen] = useState({
        isAddCheckList: false,
        isLabel: false,
        isAddMembers: false,
        isDueDatePop: false,
        isAddCover: false,
        isAttachment: false,
      });


    const toggleModal = (popHover) => {
        const stateCopy = { ...isPopOpen };
        const nextValue = !stateCopy[popHover];
        Object.keys(stateCopy).forEach((key) => (stateCopy[key] = false));
        stateCopy[popHover] = nextValue;
        setPopOpen(stateCopy);
      };

    return(
        <div className='quick-bar-btn' ref={sideBarRef} style={{left: quickBarPos.btnsLeft, top: quickBarPos.btnsTop}}>
            <div className="quick-bar-btn-container" style={{float: quickBarPos.btnFloat}} onClick={openEditCard}>
            <span className='icon'><BsCreditCard2Back/></span>
                <span>Open card</span>
            </div>        
            <div className="quick-bar-btn-container" style={{float: quickBarPos.btnFloat}} onClick={() => toggleModal("isLabel")}>
            <span className='icon'><BsTag/></span>
                <span>Edit labels</span>
               
            </div>   
            {isPopOpen.isLabel && (
          <AddLabel toggleModal={toggleModal} taskId={task.id} top={'0px'} left={'0px'}/>
          )}     
            <div className="quick-bar-btn-container" style={{float: quickBarPos.btnFloat}} onClick={() => toggleModal("isAddMembers")}>
            <span className='icon'><BsPerson/></span>
                <span>Change members</span>
            </div>        
          {isPopOpen.isAddMembers && (
        <AddUserToTask toggleModal={toggleModal} taskId={task.id} top={'0px'} left={'0px'}/>)}
            <div className="quick-bar-btn-container" style={{float: quickBarPos.btnFloat}} onClick={()=>toggleModal("isAddCover")}>
            <span className='icon'><FaRegWindowMaximize/></span>
                <span>Change cover</span>
            </div> 
            {isPopOpen.isAddCover && (
          <AddCover toggleModal={toggleModal} taskId={task.id} top={'0px'} left={'0px'} />
        )}       
            <div className="quick-bar-btn-container" style={{float: quickBarPos.btnFloat}}>
            <span className='icon'><AiOutlineArrowRight/></span>
                <span>Move</span>
            </div>        
            <div className="quick-bar-btn-container" style={{float: quickBarPos.btnFloat}}>
            <span className='icon'><BsCreditCard2Back/></span>
                <span>Copy</span>
            </div>        
            <div className="quick-bar-btn-container" style={{float: quickBarPos.btnFloat}} onClick={()=>toggleModal("isDueDatePop")}>
            <span className='icon'><FiClock/></span>
                <span>Edit Dates</span>
            </div>    
            {isPopOpen.isDueDatePop && (
          <DatePickerPop
            toggleModal={toggleModal}
            taskId={task.id}
            top={'-100px'} left={'0px'}
          />
        )}    
            <div className="quick-bar-btn-container" style={{float: quickBarPos.btnFloat}} onClick={onTaskArchived}>
            <span className='icon'><BsArchiveFill/></span>
                <span>Archive</span>
            </div>        
        </div>
    )
}