import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Components, { Container, Button, Text, Error } from 'components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { auth } from 'store/actions'
import { translate } from 'utils'
import Loading from 'components/Loading'

const NewPass = (data) => {
  const dispatch = useDispatch()
  const [showSuccess, setshowSuccess] = useState(false);
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const { translation_data, langStore } = useSelector(state => state.translation)
  let initialValues = {
    password: '',
    confirmpassword: ''
  }

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required!"),
    confirmpassword: Yup.string()
      .required("Confirm password is required!")
      .oneOf([Yup.ref('password'), null], "Password must match!")
  })

  const onDataSubmit = (values, actions) => {
    const { confirmpassword, ...postValues } = values
    let postData = { otp:data.otpVal, mobile:data.mobile, ...postValues }
    actions.setSubmitting(true)
    setDisabled(true)
    setTimeout(async () => {
      let res = await dispatch(auth.resetPassword({ ...postData }))
      if (res?.status === 'success') {
        setError(null)
        setshowSuccess(true)
      } else {
        setError(res?.message)
      }
      actions.setSubmitting(false)
      setDisabled(false)
    }, 1000)
  }
  return (
    showSuccess === true ?
    <Components.SuccessMsg>
      <Components.Text color="primary" className="alert-msg">{translate(translation_data, 'reset_pass_success_msg', langStore?.code)}</Components.Text>
      <Link to={`/signin`} className="btn btn-default">{translate(translation_data, 'login', langStore?.code)}</Link>
    </Components.SuccessMsg>
    :
    <>
      <Components.Section>
        <Container>
          <Components.AuthForm>
            <div className="auth-wrap">
              <Text className="title">{translate(translation_data, 'new_password', langStore?.code)}</Text>
              <Text className="sub-title">{translate(translation_data, 'plz_provide_new_pass', langStore?.code)}</Text>
              <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => onDataSubmit(values, actions)}>
                {
                  formikProps => (
                    <Form>
                      <div className='auth-form'>
                        <Components.TextInput label={translate(translation_data, 'new_password', langStore?.code)} name="password" type="password" require={true} />
                        <Components.TextInput label={translate(translation_data, 'confirm_pass', langStore?.code)} name="confirmpassword" type="password" require={true} />
                        <Error>{error}</Error>
                      </div>
                      <div className='footer-btn'>
                        <Button type='submit' className={`btn btn-default ${disabled && "btn-disabled"}`} disabled={disabled && disabled}>
                          {
                            formikProps.isSubmitting ?
                              <Loading style={{
                                width: 20,
                                height: 20,
                                border: '3px solid rgba(255, 255, 255, .23)',
                                borderRight: '3px solid rgba(255, 255, 255, .85)',
                              }}>{translate(translation_data, 'submitting', langStore?.code)}</Loading> :
                              translate(translation_data, 'submit', langStore?.code)
                          }
                        </Button>
                      </div>
                    </Form>
                  )
                }
              </Formik>
            </div>
          </Components.AuthForm>
        </Container>
      </Components.Section>
    </>
  )
}

export default NewPass
