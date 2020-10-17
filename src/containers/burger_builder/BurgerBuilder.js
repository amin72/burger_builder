import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Aux from '../../hoc/aux/Aux'
import Burger from '../../components/burger/Burger'
import BuildControls from '../../components/burger/build_control/BuildControls'
import Modal from '../../components/ui/modal/Modal'
import OrderSummary from '../../components/burger/order_summary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/ui/spinner/Spinner'
import withErrorHandler from '../../hoc/error-handler/withErrorHandler'
import {
  addIngredient,
  initIngredients,
  purchaseInit,
  removeIngredient,
  setAuthRedirectPath
} from '../../store/actions'


export class BurgerBuilder extends Component {
  state = {
    purchasing: false
  }

  componentDidMount() {
    if (!this.props.ingredients || this.props.purchased) {
      this.props.fetchIngredients()
    }
  }

  purchaseHandle = () => {
    if (this.props.isAuthenticated) {
      this.setState({
        purchasing: true
      })
    } else {
      this.props.onSetRedirectPath('/checkout')
      this.props.history.push('/auth')
    }
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((sum, el) => {
      return sum + el
    })
    return sum > 0
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase()
    this.props.history.push('/checkout')
  }

  render () {
    const { purchasing } = this.state
    const { ingredients, totalPrice, error } = this.props

    const disabledInfo = {
      ...ingredients
    }

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null

    // load spinner if ingredients is empty in state
    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />

    if (ingredients) {
      // ingredients are set so set burger
      burger = (
        <Aux>
          <Burger ingredients={ingredients} />
          <BuildControls
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={totalPrice}
            purchasable={this.updatePurchaseState(ingredients)}
            ordered={this.purchaseHandle}
          />
        </Aux>
      )

      orderSummary =  (
        <OrderSummary
          ingredients={ingredients}
          price={totalPrice}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      )
    }

    return (
      <Aux>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )        
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.burderBuilder.ingredients,
  totalPrice: state.burderBuilder.totalPrice,
  error: state.order.error,
  isAuthenticated: state.auth.token !== null,
  purchased: state.order.purchased
})

const mapDispatchToProps = (dispatch) => ({
  onIngredientAdded: ingredientName => dispatch(addIngredient(ingredientName)),
  onIngredientRemoved: ingredientName => dispatch(removeIngredient(ingredientName)),
  fetchIngredients: () => dispatch(initIngredients()),
  onInitPurchase: () => dispatch(purchaseInit()),
  onSetRedirectPath: (path) => dispatch(setAuthRedirectPath(path))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(BurgerBuilder, axios)
))