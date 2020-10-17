import React, { Component } from 'react'
import classes from './Modal.css'
import Backdrop from '../backdrop/Backdrop'
import Aux from '../../../hoc/aux/Aux'


class Modal extends Component {
  shouldComponentUpdate(prevProps, prevState) {
    const { show, children } = this.props
    return prevProps.show !== show || prevProps.children !== children
  }
  
  render () {
    const { show, children, modalClosed } = this.props

    return (
      <Aux>
        <Backdrop show={show} clicked={modalClosed} />
        <div
            className={classes.Modal}
            style={{
                transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: show ? 1 : 0
            }}
        >
            {children}
        </div>
      </Aux>
    )
  }
}

export default Modal