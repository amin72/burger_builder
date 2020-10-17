import React, { useEffect } from 'react'
import Order from '../../components/order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/error-handler/withErrorHandler'
import { connect } from 'react-redux'
import { fetchOrders } from '../../store/actions/order'
import Spinner from '../../components/ui/spinner/Spinner'
import { Redirect } from 'react-router-dom'


const Orders = ({ orders, loading, token, userId, onFetchOrders }) => {
  useEffect(() => {
    if (token) {
      onFetchOrders(token, userId)
    }
  }, [])

  // redirect unauthenticated user to /
  if (!token) {
    return <Redirect to='/' />
  }

  return loading ? (
    <Spinner />
  ) : (
    <div>
      {orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ))}
    </div>
  )
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
})

const mapDispatchToProps = dispatch => ({
  onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(Orders, axios)
)