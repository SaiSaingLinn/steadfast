import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import Components, { Container, Button, Text, Error } from 'components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { auth, profile, emit } from 'store/actions'
import { authStore } from 'service'
import { translate } from 'utils'
import Loading from 'components/Loading'
import Otp from './components/otp'
import { Ecommerce } from 'store/actions/ecommerce.action'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const SignIn = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState(null)
  const [useOtp, setuseOtp] = useState(false)
  const [mobile, setmobile] = useState(null)
  let user_id = authStore.getAuth()?.uid
  const { profile_data } = useSelector(state => state.profile)
  const { translation_data, langStore } = useSelector(state => state.translation)
  const { orderStore_data } = useSelector(state => state.ecommerce)

  //get profile data
  useEffect(() => {
    user_id && dispatch(profile.getProfile(user_id))
  }, [dispatch, user_id])

  useEffect(() => {
    profile_data !== null && dispatch(emit.setEmit('ISPROFILEDATA', ...profile_data?.data))
  }, [dispatch, profile_data])


  let initialValues = {
    mobile: '',
    password: ''
  }

  const validationSchema = Yup.object({
    mobile: Yup.string()
      .min(7, 'Your phone number at least 7 digits!')
      .max(15, 'Your phone number is too much digits!')
      .matches(phoneRegExp, 'Your Phone number is not valid!')
      .required("Phone is required!"),
    password: Yup.string()
      .required("Password is required!")
  })
  // console.log(`location?.state?.order_id`, location?.state?.order_id)
  const onDataSubmit = (values, actions) => {
    actions.setSubmitting(true)
    setDisabled(true)
    setmobile(values?.mobile)
    let { mobile, password } = values
    let postData = {
      headers: {
        'login': mobile,
        'password': password
      }
    }

    setTimeout(async () => {
      // actions.setSubmitting(true)
      // setDisabled(true)
      let res = await dispatch(auth.signIn(postData))
      if ((res?.code === 400 && res?.type === "invalid_mobile_number") || (res?.type === "access_denied")) {
        setError(res?.message)
      } else if (res?.code === 400 && res?.type === "need_to_verify_otp") {
        dispatch(auth.userCheck({ mobile: postData.headers.login }))
        authStore.removeAuth(postData)
        setError('')
        setuseOtp(true)
      } else if (res?.uid) {
        setError('')
        //* delete cart when sign in
        if (orderStore_data?.order_id) {
          let postData = {
            data: {
              order_id: orderStore_data?.order_id,
              user_id: authStore.getAuth()?.uid
            }
          }

          if (!authStore.getAuth()) {
            delete postData.data.user_id
          }

          let res = await dispatch(Ecommerce.deleteAllInCart(postData, langStore?.code))
          if (res?.result?.status === 'success') {
            dispatch(Ecommerce.setOrderStore('ORDER_STORE_REMOVE_OBJ', null))
          } else {

          }
        }
        history.push('/')
        // if (location?.state?.order_id && location?.state?.type === 'product') {
        //   history.replace({
        //     pathname: `/checkout/${location?.state?.order_id}`
        //   })
        // } else if (location?.state?.order_id && location?.state?.type === 'ticket') {
        //   history.replace({
        //     pathname: `/service-ticket/checkout/${location?.state?.order_id}`
        //   })
        // } else {
        //   history.replace("/")
        // }
      } else {
        setError('Something went wrong, please try again!')
      }
      actions.setSubmitting(false)
      setDisabled(false)
    }, 1000)
  }

  return (
    useOtp === true ?
      <Otp type="signin" mobile={mobile} />
      :
      <Components.Section>
        <Container>
          <Components.AuthForm>
            <div className="auth-wrap">
              <Text className="title">{translate(translation_data, 'login_to_your_account', langStore?.code)}</Text>
              <Text className="sub-title">{translate(translation_data, 'dont_have_account', langStore?.code)} <Link to="/signup">{translate(translation_data, 'register_here', langStore?.code)}</Link></Text>
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
                        <Components.TextInput label={translate(translation_data, 'password', langStore?.code)} name="password" type="password" require={true} />
                        <Error>{error}</Error>
                      </div>
                      <div className='footer-btn forget-btn'>
                        <Link to="/forgetpassword" className="btn btn-link">{translate(translation_data, 'forget_pass', langStore?.code)}</Link>
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
                              }}>{translate(translation_data, 'login', langStore?.code)}</Loading> :
                              translate(translation_data, 'login', langStore?.code)
                          }
                        </Button>
                      </div>
                      {/* <div className="divider"><span>or</span></div>
                      <div className='footer-btn fb-btn'>
                        <Button className="btn btn-default"><AiFillFacebook /> Login with facebook</Button>
                      </div> */}
                    </Form>
                  )
                }
              </Formik>
            </div>
          </Components.AuthForm>
        </Container>
      </Components.Section>
  )
}

export default SignIn
