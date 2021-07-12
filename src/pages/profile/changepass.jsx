import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Components, { Container, Button, Text, Error } from 'components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { auth, profile } from 'store/actions'
import { translate } from 'utils'
import Loading from 'components/Loading'

const ChangePass = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [success, setSuccess] = useState(false)
  const { translation_data, langStore } = useSelector(state => state.translation)
  let initialValues = {
    old_password: '',
    new_password: '',
    confirm_password: ''
  }

  const validationSchema = Yup.object({
    old_password: Yup.string()
      .required("Old password is required!"),
    new_password: Yup.string()
      .required("New password is required!"),
    confirm_password: Yup.string()
      .required("Confirm new password is required!")
      .oneOf([Yup.ref('new_password'), null], "Confirm password & new password must match!")
  })

  const onDataSubmit = (values, actions) => {
    let { confirm_password, ...postData } = values
    actions.setSubmitting(true)
    setDisabled(true)
    setTimeout(async () => {
      let res = await dispatch(auth.changePassword(postData))
      if (res?.status === 'success') {
        setSuccess(true)
        setError(null)
        dispatch(auth.signOut())
        dispatch(profile.cleanData('PROFILE_CLEAND_DATA', null))
      } else if (res?.status === 'fail') {
        setError(res.message)
      } else {
        console.log('res', res)
      }
      actions.setSubmitting(false)
      setDisabled(false)
    }, 1000)
  }

  return (
    success === true ?
    <Components.SuccessMsg>
      <Components.Text color="primary" className="alert-msg">{translate(translation_data, 'pass_change_success_msg', langStore?.code)}</Components.Text>
      <Link to='/signin' className="btn btn-default">{translate(translation_data, 'login', langStore?.code)}</Link>
    </Components.SuccessMsg>
    :
    <>
      <Components.Section>
        <Container>
          <Components.AuthForm>
            <div className="auth-wrap">
              <Text className="title">{translate(translation_data, 'change_pass', langStore?.code)}</Text>
              <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => onDataSubmit(values, actions)}>
                {
                  formikProps => {
                    return (
                      <Form>
                        <div className='auth-form'>
                          <Components.TextInput label={translate(translation_data, 'old_password', langStore?.code)} name="old_password" type="password" require={true} />
                          <Components.TextInput label={translate(translation_data, 'new_password', langStore?.code)} name="new_password" type="password" require={true} />
                          <Components.TextInput label={translate(translation_data, 'confirm_new_pass', langStore?.code)} name="confirm_password" type="password" require={true} />
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
                }
              </Formik>
            </div>
          </Components.AuthForm>
        </Container>
      </Components.Section>
    </>
  )
}

export default ChangePass
