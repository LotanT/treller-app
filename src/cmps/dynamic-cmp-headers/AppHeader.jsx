import React from 'react'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { AppHeaderMain } from './AppHeaderMain'
import { AppHeaderUser } from './AppHeaderUser'





function _AppHeader() {
    const [isHomePage, setIsHomePage] = useState((window.location.hash === '#/'))
    const history = useHistory()

    useEffect(() => {
        return history.listen((location) => {
            (location.pathname !== '/') ? setIsHomePage(false) : setIsHomePage(true)
            
            
        })
    }, [history])



    const DynamicCmp = () => {
        switch (isHomePage) {
            case true:
                return <AppHeaderMain />
            case false:
                return <AppHeaderUser />
            default:
                return <AppHeaderUser />
        }

    }
    return (
        <DynamicCmp />
    )
}

function mapStateToProps() {
    return {
    }
}
const mapDispatchToProps = {

}



export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)