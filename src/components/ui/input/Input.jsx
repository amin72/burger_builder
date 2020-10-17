import React from 'react'
import classes from './Input.css'


const Input = ({
  elementType,
  elementConfig,
  value,
  changed,
  label,
  invalid,
  shouldValidate,
  touched,
  fieldName
}) => {
  let inputElement = null
  const inputClasses = [classes.InputElement]
  let validationError = null

  if (invalid && shouldValidate && touched) {
    inputClasses.push(classes.Invalid)
    validationError = (
      <p className={classes.ValidationError}>
        Please enter a valid value: {fieldName}
      </p>
    )
  }

  if (!invalid && touched) {
    inputClasses.push(classes.Valid)
  }

  switch (elementType ) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />)
      break
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />)
      break
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        >
          {elementConfig.options.map(option => (
            <option key={option.value}>{option.displayValue}</option>
          ))}

        </select>
      )
      break
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />)
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{label}</label>
      {inputElement}
      {validationError}
    </div>    
  )
}

export default Input