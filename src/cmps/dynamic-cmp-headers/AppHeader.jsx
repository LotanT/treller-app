import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AppHeaderMain } from "./AppHeaderMain";
import { AppHeaderUser } from "./AppHeaderUser";
// import { Link, NavLink } from 'react-router-dom'

function _AppHeader({ props }) {
  const [isLogin, setIsLogin] = useState(false);

  console.log("props:", window.location);
  useEffect(() => {
    console.log("hello hello from the other side");
    // console.log('props:' ,props)
  });

<<<<<<< HEAD
    function _AppHeader({props}) {
    const [isLogin, setIsLogin] = useState(false);
    

    console.log('props:' ,window.location)
    useEffect(()=>{
        console.log('hello from my side');
        // console.log('props:' ,props)
        
    })

    const type ='a'
    const DynamicCmp = () => {
        switch (type) {
            case 'a':
                return <AppHeaderMain />
            case '':
                return <AppHeaderUser/>
            default:
                return <AppHeaderUser/>
        }

=======
  const type = "a";
  const DynamicCmp = () => {
    switch (type) {
      case "a":
        return <AppHeaderMain />;
      case "":
        return <AppHeaderUser />;
      default:
        return <AppHeaderUser />;
>>>>>>> caf7782a3165593c56af656c212570e72a24b86d
    }
  };
  return <DynamicCmp />;
}

function mapStateToProps() {
  return {};
}
const mapDispatchToProps = {};

export const AppHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AppHeader);
