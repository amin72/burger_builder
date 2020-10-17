import React from 'react'
import { useSelector } from 'react-redux'
import NavigationItem from './NavigationItem'
import classes from './NavigationItems.css'


const NavigationItems = () => {
  const { token } = useSelector(state => state.auth)

  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/'>
        Burger Builder
      </NavigationItem>
      {token && <NavigationItem link='/orders'>
        Orders
      </NavigationItem>}
      {token ? (
        <NavigationItem link='/logout'>
          Logout
        </NavigationItem>
      ) : (
        <NavigationItem link='/auth'>
            Authenticate
        </NavigationItem>
      )}
    </ul>
  )
}

export default NavigationItems