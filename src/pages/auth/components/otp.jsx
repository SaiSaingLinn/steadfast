import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Components, { Container, Button, Text, Error } from 'components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import NewPass from './newpass'
import SignIn from '../signin'
import { auth } from 'store/actions'
import { authStore } from 'service'
import { translate } from 'utils'
import Loading from 'components/Loading'

const Otp = ({ type, mobile }) => {
  const dispatch = useDispatch()
  const [state, setState] = useState(null)
  const [otpVal, setotpVal] = useState(null)
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const { translation_data, langStore } = useSelector(state => state.translation)
  let initialValues = {
    otp: '',
  }

  const validationSchema = Yup.object({
    otp: Yup.string()
      .required("Verify code is required!")
  })

  const onDataSubmit = (values, actions) => {
    let postVal = { mobile, ...values }
    actions.setSubmitting(true)
    setDisabled(true)
    setTimeout(async () => {
      let res = await dispatch(auth.userOtp(postVal))
      if (res?.result?.status === 'success') {
        if (type === "forgetpass") {
          setState("newpass")
          setotpVal(values?.otp)
        } else {
          setState("success")
        }
        window.scrollTo(0, 0)
      } else {
        setError(res?.result?.message)
      }
      actions.setSubmitting(false)
      setDisabled(false)
    }, 1000)
  }

  // send code again 
  const handleCheck = () => {
    let mobile = authStore.getSignUp()?.mobile !== undefined ? authStore.getSignUp()?.mobile : authStore.getSignIn()?.headers.login
    setDisabled(true)
    setTimeout(async () => {
      let res = await dispatch(auth.userCheck({ mobile }))
      if (res?.status === 'success') {
        setDisabled(false)
        setError(null)
      } else {
        setError(res?.message)
        setDisabled(false)
      }
    }, 1000)
  }

  return (
    state === "newpass" ?
    <NewPass mobile={mobile} otpVal={otpVal} /> :
    state === "success" ?
    <Components.SuccessMsg>
      <Components.Text color="primary" className="alert-msg">{translate(translation_data, 'create_account_success_msg', langStore?.code)}</Components.Text>
      <Link to={`/signin`} className="btn btn-default" onClick={() => setState("signin")}>{translate(translation_data, 'login', langStore?.code)}</Link>
    </Components.SuccessMsg> :
    state === "signin" ?
    <SignIn /> :
    <>
      <Components.Section>
        <Container>
          <Components.AuthForm>
            <div className="auth-wrap">
              <Text className="title">{translate(translation_data, 'verification', langStore?.code)}</Text>
              <Text className="sub-title">{translate(translation_data, 'enter_verification_code', langStore?.code)}</Text>
              <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => onDataSubmit(values, actions)}>
                {
                  formikProps => (
                    <Form>
                      <div className='auth-form'>
                        <Components.TextInput label={translate(translation_data, 'verify_code', langStore?.code)} name="otp" type="text" require={true} />
                        <Error>{error}</Error>
                      </div>
                      <div className='footer-btn'>
                        <Link to="#" onClick={() => handleCheck()} disabled={disabled && disabled} className={`btn btn-link ${disabled && 'btn-disabled'}`}>{translate(translation_data, 'send_code_again', langStore?.code)}</Link>
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

export default Otp
