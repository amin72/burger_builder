import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Button  from '../../components/ui/button/Button'
import Input from '../../components/ui/input/Input'
import classses from './Auth.css'
import { auth, setAuthRedirectPath } from '../../store/actions'
import Spinner from '../../components/ui/spinner/Spinner'
import { checkValidity } from '../../utlity/checkValidity'


class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          name: 'email',
          placeholder: 'Email Address'
        },
        value: '',
        validation: {
          required: true,
          maxLength: 60,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          name: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false
      },
    },
    isSignUp: true
  }

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath() // redirect to /
    }
  }

  inputChangedHandler = ({ target: { name, value }}) => {
    const { controls } = this.state
    const element = controls[name] // hold input element value

    this.setState({
      controls: {
        ...controls,
        [name]: {
          ...element,
          value: value,
          valid: checkValidity(value, element.validation),
          touched: true
        }
      }
    })

    let formValid = true
    for (let inputIndentifier in controls) {
      formValid = controls[inputIndentifier].valid && formValid
    }

  }

  submitHandler = e => {
    e.preventDefault()
    this.props.onAuth(this.state.controls.email.value,
      this.state.controls.password.value, this.state.isSignUp)
  }

  switchAuthModeHandler = () => {
    this.setState((prevState) => ({
      isSignUp: !prevState.isSignUp
    }))
  }

  render() {
    const { controls, isSignUp } = this.state
    const { loading, error, isAuthenticatd, authRedirectPath } = this.props

    if (isAuthenticatd) {
      return <Redirect to={authRedirectPath} />
    }

    const formElementsArray = []
    for (let key in controls) {
      formElementsArray.push({
        id: key,
        config: controls[key]
      })
    }

    const form = formElementsArray.map(element => (
      <Input
        key={element.id}
        elementType={element.config.elementType}
        elementConfig={element.config.elementConfig}
        value={element.config.value}
        invalid={!element.config.valid}
        shouldValidate={element.config.validation}
        touched={element.config.touched}
        fieldName={element.config.elementConfig.name}
        changed={this.inputChangedHandler}
      />
    ))

    return loading ? (
      <Spinner />
    ) : (
      <div className={classses.Auth}>
      <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
      
      {error && (
        <p>{error.message}</p>
      )}

      <form onSubmit={this.submitHandler}>
        {form}
        <Button btnType="Success">Submit</Button>
      </form>
      <Button
        clicked={this.switchAuthModeHandler}
        btnType="Danger">
          SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}
      </Button>
    </div>
    )
  }
}

const mapStateToProps = state => ({
    error: state.auth.error,
    loading: state.auth.loading,
    isAuthenticatd: state.auth.token !== null,
    buildingBurger: state.burderBuilder.building,
    authRedirectPath: state.auth.authRedirectPath

})

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup)),
  onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)