import React from 'react'
import { useField, useFormikContext } from 'formik'
import { InputGroup, Label, ErrorMessage } from '../core/Form'
import colors from './../constant/Color'
import SelectDatePicker from "@netojose/react-select-datepicker"

const SelectDateField = ({ label, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props)
  console.log(`meta`, meta)
  return (
    <InputGroup {...props}>
      <Label htmlFor={props?.id || props?.name}>
        {label}
        {props?.require === true && <span style={{ color: colors.secondary }}> *</span>}
      </Label>
      <SelectDatePicker
        {...field}
        {...props}
        className={`${meta.touched && meta.error ? 'error' : ''} select-date-field`}
        onDateChange={val => {
          setFieldValue(field.name, val);
        }}
      />
      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </InputGroup>
  )
}

export default SelectDateField
