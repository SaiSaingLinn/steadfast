import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Components, { Container, Button, Text, Error } from '../../components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import Otp from './components/otp'
import { auth } from '../../store/actions'
import { authStore } from '../../service'
import { translate } from 'utils'
import Loading from 'components/Loading'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const SignUp = () => {
  const dispatch = useDispatch()
  const [useOtp, setuseOtp] = useState(false)
  const [mobile, setmobile] = useState(null)
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const { translation_data, langStore } = useSelector(state => state.translation)

  let initialValues = {
    name: '',
    mobile: '',
    date: '',
    password: '',
    confirmpassword: ''
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(20, 'Must be 20 characters or less!')
      .required("Name is required!"),
    mobile: Yup.string()
      .min(7, 'Your phone number at least 7 digits!')
      .max(15, 'Your phone number is too much digits!')
      .matches(phoneRegExp, 'Your Phone number is not valid!')
      .required("Phone is required!"),
    date: Yup.date()
      .max(new Date(), "Date of Birth can't be in future!")
      .typeError('Invalid Date!'),
    password: Yup.string()
      .required("Password is required!"),
    confirmpassword: Yup.string()
      .required("Confirm password is required!")
      .oneOf([Yup.ref('password'), null], "Password must match!"),
  })

  const onDataSubmit = (values, actions) => {
    actions.setSubmitting(true)
    setmobile(values?.mobile)
    setDisabled(true)
    let dateBirth = values?.date
    let dob = dateBirth ? moment(dateBirth).format("YYYY-MM-DD") : null
    const { confirmpassword, date, ...postVal } = values
    let postData = { ...postVal, dob }
    // console.log(`postData`, postData)
    setTimeout(async () => {
      let res = await dispatch(auth.signUp(postData))
      if (res?.result?.status === 'success') {
        actions.resetForm(initialValues)
        authStore.setSignUp(postData)
        setuseOtp(true)
        window.scrollTo(0, 0)
      } else {
        setError(res?.result?.message)
      }
      setDisabled(false)
      actions.setSubmitting(false)
    }, 1000)
  }

  return (
    useOtp === true ?
      <Otp type="signup" mobile={mobile} />
      :
      <>
        <Components.Section>
          <Container>
            <Components.AuthForm>
              <div className="auth-wrap">
                <Text className="title">{translate(translation_data, 'create_account', langStore?.code)}</Text>
                <Text className="sub-title">{translate(translation_data, 'already_have_account', langStore?.code)} <Link to="/signin">{translate(translation_data, 'login_here', langStore?.code)}</Link></Text>
                <Formik
                  enableReinitialize
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values, actions) => onDataSubmit(values, actions)}>
                  {
                    props => {
                      // const {
                      //   values,
                      //   setFieldValue
                      // } = props;
                      return (
                        <Form>
                          <div className='auth-form'>
                            <Components.TextInput label={translate(translation_data, 'name', langStore?.code)} name="name" type="text" require={true} />
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
                            <Components.SelectDateField 
                              name="date" 
                              label={translate(translation_data, 'birthday', langStore?.code)} 
                              showLabels={false}
                              errorMax="Date of Birth can't be in future!"
                            />
                            <Components.TextInput label={translate(translation_data, 'password', langStore?.code)} name="password" type="password" require={true} />
                            <Components.TextInput label={translate(translation_data, 'confirm_pass', langStore?.code)} name="confirmpassword" type="password" require={true} />
                            <Error>{error}</Error>
                          </div>
                          <div className='footer-btn'>
                            <Button type='submit' className={`btn btn-default ${disabled && "btn-disabled"}`} disabled={disabled && disabled}>
                              {
                                props.isSubmitting ?
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
                  }
                </Formik>
              </div>
            </Components.AuthForm>
          </Container>
        </Components.Section>
      </>
  )
}

export default SignUp
