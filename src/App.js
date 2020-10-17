import React, { Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import Layout from './hoc/layout/Layout'
import BurgerBuilder from './containers/burger_builder/BurgerBuilder'
import Orders from './containers/orders/Orders'
import Auth from './containers/auth/Auth'
import { authCheckState } from './store/actions'

const Checkout = React.lazy(() => import ('./containers/checkout/Checkout'))
const Logout = React.lazy(() => import ('./containers/auth/Logout'))


const App = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authCheckState())
  })

  return (
    <Layout>
      <Switch>
        <Route path='/checkout' render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <Checkout />
          </Suspense>)}
        />
        <Route path='/orders' render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <Orders />
          </Suspense>)}
        />
        <Route path='/logout' render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <Logout />
          </Suspense>)}
        />
        {/* <Route path='/auth' component={Auth} /> */}

        <Route path='/auth' render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <Auth />
          </Suspense>)}
        />

        <Route path='/' render={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <BurgerBuilder />
          </Suspense>)}
        />
        {/* <Route path='/' component={BurgerBuilder} /> */}
        <Redirect to='/' />
      </Switch>
    </Layout>
  )
}

export default App