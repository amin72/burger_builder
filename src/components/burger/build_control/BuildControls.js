import React from 'react'
import { useSelector } from 'react-redux'
import BuildControl from './BuildControl'
import classes from './BuildControls.css'


const controls = [
  {
    label: 'Salad',
    type: 'salad'
  },
  {
    label: 'Bacon',
    type: 'bacon'
  },
  {
    label: 'Cheese',
    type: 'cheese'
  },
  {
    label: 'Meat',
    type: 'meat'
  },
  {
    label: 'Soda',
    type: 'soda'
  }
]

const BuildControls = (props) => {
  const { token } = useSelector(state => state.auth)

  return (
    <div className={classes.BuildControls}>
      <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
      {controls.map(control => (
        <BuildControl
          key={control.label}
          label={control.label}
          added={() => props.addIngredient(control.type)}
          removed={() => props.removeIngredient(control.type)}
          disabled={props.disabled[control.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        {token ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
      </button>
    </div>
  )
}

export default BuildControls