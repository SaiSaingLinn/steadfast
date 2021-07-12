import React from 'react'
import { useField } from 'formik'
import { InputGroup, Input, Label, ErrorMessage, Span } from '../core/Form'
import colors from './../constant/Color'

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <InputGroup {...props}>
      <Label htmlFor={props?.id || props?.name}>
        {label}
        {props?.require === true && <span style={{ color: colors.secondary }}> *</span>}
      </Label>
      <div className={props?.isNumber === true ? 'ph-wrap' : ''}>
        <Input
          id={props?.id || props?.name}
          className={`${meta.touched && meta.error ? 'error' : ''} ${props?.isNumber === true && 'phone'}`}
          {...field}
          {...props}
        />
        {props?.isNumber === true && <Span InputPhone />}
      </div>
      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </InputGroup>
  )
}

export default TextInput
