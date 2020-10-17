import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CheckoutSummary from '../../components/burger/checkout_summary/CheckoutSummary'
import ContactData from './ContactData'


const Checkout = ({ history, match }) => {
  const { ingredients } = useSelector(state => state.burderBuilder)
  const { purchased } = useSelector(state => state.order)

  const checkoutCanceledHandler = () => {
    history.goBack()
  }
  
  const checkoutContinuedHandler = () => {
    history.replace('/checkout/contact-data')
  }

  // redirect to orders if user purchased a burger successfully
  if (purchased) {
    return <Redirect to='/' />
  }

  return ingredients ? (
    <div>
      <CheckoutSummary
        ingredients={ingredients}
        checkoutCanceled={checkoutCanceledHandler}
        checkoutContinued={checkoutContinuedHandler}
      />
      <Route path={match.path + '/contact-data'} component={ContactData} />
    </div>
  ) : (
    <Redirect to='/' />
  )
}

export default withRouter(Checkout)