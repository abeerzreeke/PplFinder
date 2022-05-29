import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "@material-ui/core";
import {NavLink} from 'react-router-dom';

const NavBar = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_e, newValue) => {
    setValue(newValue);
  };

  const handleClick = (e)=>{
    setValue(parseInt( e.currentTarget.getAttribute('index')))
    
  }

  return (
    <AppBar position="static" color="transparent" style={{ position: "fixed", top: 0 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Navigation"
        indicatorColor="primary"
        textColor="primary"
      >
        <NavLink to="/">
          <Tab label="Home" index={0} onClick={handleClick} />
        </NavLink>
        <NavLink to="/Favorites">
          <Tab label="Favorites" index={1}  onClick={handleClick}/>
        </NavLink>
      </Tabs>
    </AppBar>
  );
};

export default NavBar;
