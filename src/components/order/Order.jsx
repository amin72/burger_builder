import React from 'react'
import classes from './Order.css'


const Order = ({ ingredients, price }) => {
  const localIngredients = []
  for (let ingName in ingredients) {
    localIngredients.push({
      name: ingName,
      amount: ingredients[ingName]
    })
  }

  const ingredientOutput = localIngredients.map(ig => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          magin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px'
        }}
      >
          {ig.name} ({ig.amount})
      </span>
    )})

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>USD {price.toFixed(2)}</strong></p>
    </div>    
  )
}

export default Order