import React, { useState } from 'react'
import Aux from '../aux/Aux'
import classes from './Layout.css'
import Toolbar from '../../components/navigation/toolbar/Toolbar'
import SideDrawer from '../../components/navigation/SideDrawer/SideDrawer'


const Layout = (props) => {
  const [show, setShow] = useState(false)

  const sideDrawerClosedHandler = () => {
    setShow(false)
  }

  const toggleDrawerHandler = () => {
    setShow(!show)
  }

  return (
    <Aux>
      <Toolbar toggle={toggleDrawerHandler} />
      <SideDrawer open={show} closed={sideDrawerClosedHandler} />
      <main className={classes.content}>
        {props.children}
      </main>
    </Aux>
  )
}

export default Layout