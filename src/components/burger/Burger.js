import React from 'react'
import BurgerIngredient from './BurgerIngredient'
import classes from './Burger.css'


const Burger = ({ ingredients }) => {
  let trasformedIngredients = Object.keys(ingredients).map(k => {
    return [...Array(ingredients[k])].map((_, i) => {
      return <BurgerIngredient key={k + i} type={k} />
    })
  }).reduce((arr, el) => {
    return arr.concat(el)
  }, [])

  if (trasformedIngredients.length === 0) {
    trasformedIngredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className={classes.burger}>
      <BurgerIngredient type="bread-top" />
      {trasformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
}

export default Burger