import React from 'react'
import classes from './Toolbar.css'
import drawerToggleClasses from './DrawerToggle.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'


const Toolbar = ({ toggle }) => (
  <header className={classes.Toolbar}>
    <div onClick={toggle} className={drawerToggleClasses.DrawerToggle}>
      <div></div>            
      <div></div>            
      <div></div>            
    </div>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
)

export default Toolbar