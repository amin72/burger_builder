import React from 'react'
import Aux from '../../../hoc/aux/Aux'
import Button from '../../ui/button/Button'


const OrderSummary = ({ ingredients, price, purchaseCanceled, purchaseContinued }) => {
  const ingredientsSummary = Object.keys(ingredients).map(k => {
    return (
      <li key={k}>
        <span style={{ textTransform: "capitalize" }}>{k}</span>: {ingredients[k]}
      </li>
    )})

  return (
    <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientsSummary}
        </ul>
        <p><strong>Total Price: {price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType='Danger' clicked={purchaseCanceled}>CANCEL</Button>
        <Button btnType='Success' clicked={purchaseContinued}>CONTINUE</Button>
    </Aux>
  )
}

export default OrderSummary