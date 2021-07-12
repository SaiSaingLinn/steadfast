import React from 'react'
import { useField } from 'formik'

import { InputGroup, Input, Label, ErrorMessage } from '../core/Form'
import colors from './../constant/Color'

const CheckBox = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' })

  return (
    <>
      <InputGroup className="custom-check" {...props} style={{ marginBottom: 0 }}>
        <Input id='check' type="checkbox" {...field} {...props} />
        <Label htmlFor='check' >
          <span>
            {label}
            {props?.require === true && <span style={{ color: colors.secondary }}> *</span>}
          </span>
        </Label>
      </InputGroup>
      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </>
  )
}

export default CheckBox