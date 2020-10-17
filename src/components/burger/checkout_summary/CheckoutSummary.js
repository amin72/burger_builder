import React from 'react'
import Burger from '../Burger'
import Button from '../../ui/button/Button'
import classes from './CheckoutSummary.css'


const CheckoutSummary = ({ ingredients, checkoutCanceled, checkoutContinued }) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it teast well!</h1>
      <div style={{ width: '100%', margin: 'auto'}}>
        <Burger ingredients={ingredients} />
      </div>
      <Button
        btnType='Danger'
        clicked={checkoutCanceled}
      >
        CANCEL
      </Button>
      <Button
        btnType='Success'
        clicked={checkoutContinued}
      >
        CONTINUE
      </Button>
    </div>
  )
}

export default CheckoutSummary