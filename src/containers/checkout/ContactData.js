import React, { useState } from 'react'
import Button from '../../components/ui/button/Button'
import classes from './ContactData.css'
import Input from '../../components/ui/input/Input'
import Spinner from '../../components/ui/spinner/Spinner'
import { connect } from 'react-redux'
import withErrorHandler from '../../hoc/error-handler/withErrorHandler'
import axios from '../../axios-orders'
import { purchaseBurger } from '../../store/actions'
import { checkValidity } from '../../utlity/checkValidity'


const ContactData = ({ ingredients, totalPrice, token, userId, onOrderBurger, loading }) => {
  const [formIsValid, setFormIsValid] = useState(false)
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        name: 'name',
        placeholder: 'Your Name'
      },
      value: '',
      validation: {
        required: true,
        maxLength: 60,
      },
      valid: false,
      touched: false
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        name: 'email',
        placeholder: 'Your Email'
      },
      value: '',
      validation: {
        required: true,
        maxLength: 100,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        name: 'street',
        placeholder: 'Street'
      },
      value: '',
      validation: {
        required: true,
        maxLength: 100
      },
      valid: false,
      touched: false
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        name: 'zipCode',
        placeholder: 'ZIP Code'
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
        isNumeric: true
      },
      valid: false,
      touched: false
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        name: 'country',
        placeholder: 'Country'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        name: 'deliveryMethod',
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' }
        ]
      },
      value: 'cheapest',
      validation: {},
      valid: true
    }
  })

  const orderHanlder = (e) => {
    e.preventDefault()

    const formData = {}
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value
    }
    
    const order = {
      ingredients, // props
      price: totalPrice, // props
      orderData: formData, // local
      userId: userId // props
    }

    onOrderBurger(order, token)
  }

  const inputChangedHandler = ({ target: { name, value }}) => {
    const element = orderForm[name] // hold input element value

    setOrderForm({
      ...orderForm,
      [name]: {
        ...element,
        value: value,
        valid: checkValidity(value, element.validation),
        touched: true
      }
    })

    let formValid = true
    for (let inputIndentifier in orderForm) {
      formValid = orderForm[inputIndentifier].valid && formValid
    }

    setFormIsValid(formValid)
  }

  const formElementsArray = []
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key]
    })
  }

  let form = (
    <form onSubmit={orderHanlder}>
      {formElementsArray.map(element => {
        return (
          <Input
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            invalid={!element.config.valid}
            shouldValidate={element.config.validation}
            touched={element.config.touched}
            fieldName={element.config.elementConfig.name}
            changed={inputChangedHandler}
          />
      )})}
      <Button btnType='Success' disabled={!formIsValid}>ORDER</Button>
    </form>
  )

  if(loading) {
    form = <Spinner />
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter your contact data</h4>
      {form}
    </div>
  )
}

const mapStateToProps = state => ({
    ingredients: state.burderBuilder.ingredients,
    totalPrice: state.burderBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
})

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData, token) => dispatch(purchaseBurger(orderData, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(ContactData, axios)
)