import React, { Component } from 'react'
import Aux from '../aux/Aux'
import Modal from '../../components/ui/modal/Modal'


const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({
          error: null
        })
        return req
      })

      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({
          error: error
        })
      })
    }

    componentWillUnmount() {
      axios.interceptors.response.eject(this.reqInterceptor)
      axios.interceptors.response.eject(this.resInterceptor)
    }

    errorConfirmedHandler = () => {
      // clear error in state
      this.setState({
        error: null
      })
    }

    render () {
      const { error } = this.state

      return (
        <Aux>
          <Modal
            show={error}
            modalClosed={this.errorConfirmedHandler}
          >
            { error && error.message }
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default withErrorHandler