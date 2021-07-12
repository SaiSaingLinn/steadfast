import React from 'react'
import { useField } from 'formik'
import { InputGroup, ErrorMessage } from '../core/Form'

const FileUpload = ({ label, ...props }) => {
  const [meta] = useField({ ...props, type: 'file' })
  return (
    <InputGroup {...props}>
      <div className='file-upload'>
        <input id='file' name='file' type='file' onChange={props.onChange} />
      </div>
      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </InputGroup>
  )
}

export default FileUpload
