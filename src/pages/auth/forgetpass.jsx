import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Components, { Container, Button, Text, Error } from 'components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Otp from "./components/otp"
import { auth } from 'store/actions'
import { translate } from 'utils'
import Loading from 'components/Loading'

const ForgetPass = () => {
  const dispatch = useDispatch()
  const [useOtp, setuseOtp] = useState(false);
  const [mobile, setmobile] = useState(null);
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const { translation_data, langStore } = useSelector(state => state.translation)
  let initialValues = {
    mobile: ''
  }

  const validationSchema = Yup.object({
    mobile: Yup.string()
      .required('Phone is required!')
  })

  const onDataSubmit = (values, actions) => {
    let mobile = values?.mobile
    actions.setSubmitting(true)
    setDisabled(true)
    setTimeout(async () => {
      actions.setSubmitting(false)
      let res = await dispatch(auth.userCheck({ mobile }))
      if (res?.status === 'success') {
        setError(null)
        setuseOtp(true)
        setmobile(mobile)
      } else {
        setError(res?.message)
      }
      actions.setSubmitting(false)
      setDisabled(false)
    }, 1000)
  }

  return (
    useOtp === true ?
      <Otp type="forgetpass" mobile={mobile} />
      :
      <>
        <Components.Section>
          <Container>
            <Components.AuthForm>
              <div className="auth-wrap">
                <Text className="title">{translate(translation_data, 'forget_pass', langStore?.code)}</Text>
                <Text className="sub-title">{translate(translation_data, 'enter_phone_number', langStore?.code)}</Text>
                <Formik
                  enableReinitialize
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values, actions) => onDataSubmit(values, actions)}>
                  {
                    formikProps => (
                      <Form>
                        <div className='auth-form'>
                          <Components.TextInput
                            label={translate(translation_data, 'phone', langStore?.code)} name="mobile" type="text" require={true} isNumber={true}
                            onKeyDown={e => e.key !== "Backspace" &&
                              e.key !== "Enter" &&
                              e.keyCode !== 37 &&
                              e.keyCode !== 39 &&
                              e.keyCode !== 46 &&
                              e.keyCode !== 9 &&
                              e.key.match(/[^0-9]/)
                              && e.preventDefault()
                            } />
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

export default ForgetPass
