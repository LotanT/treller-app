import React from 'react'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { useHistory } from 'react-router-dom'

import MainLogo from '../../assets/imgs/header/user-header-still.gif'
import DownArrow from '../../assets/imgs/header/down-arrow.svg'
// import { Link, NavLink } from 'react-router-dom'



function _AppHeaderUser() {

    const [isBoardsPage, setIsBoardsPage] = useState((window.location.hash === '#/userboards'))
    const history = useHistory()

    useEffect(() => {        
        return history.listen((location) => {
            setIsBoardsPage((window.location.hash === '#/userboards'))
            
        })
    }, [history])
    

    return (
        <header className={`app-header-user ${isBoardsPage? "user-boards":""}`}  >
            <div className="header-content flex">

                <a href='#/' className="user-header-logo">
                    <img src={MainLogo}></img>
                </a>
                <div className="nav-links ">
                    <a className='nav-link-btn'>Workspaces </a>
                    <img className='arrow' src={DownArrow}/>
                </div>
                
                <div className="nav-links ">
                    <a className='nav-link-btn'>Recent </a>
                    <img className='arrow' src={DownArrow}/>
                </div>
                
                <div className="nav-links ">
                    <a className='nav-link-btn'>Starred </a>
                    <img className='arrow' src={DownArrow}/>
                </div>
                
                <div className="nav-links ">
                    <a className='nav-link-btn'>Templates </a>
                    <img className='arrow' src={DownArrow}/>
                </div>
                <div className="nav-btn">
                    <a>Create</a>
                </div>


                <div className='user-container'>
                <div className="user-profile "></div>
                </div>
            </div>
        </header >
    )
}

function mapStateToProps(state) {
    return {
    }
}
const mapDispatchToProps = {

}



export const AppHeaderUser = connect(mapStateToProps, mapDispatchToProps)(_AppHeaderUser)