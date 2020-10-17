import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../ui/backdrop/Backdrop'
import Aux from '../../../hoc/aux/Aux'
import classes from './SideDrawer.css'


const SideDrawer = ({ open, closed }) => {
  let attachedClasses = [classes.SideDrawer, classes.Close]
  if (open) {
    attachedClasses[1] = classes.Open
  }

  return (
    <Aux>
      <Backdrop show={open} clicked={closed} />
      <div
        className={attachedClasses.join(' ')}
        onClick={closed}
      >
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems /> 
        </nav>
      </div>
    </Aux>
  )
}

export default SideDrawer