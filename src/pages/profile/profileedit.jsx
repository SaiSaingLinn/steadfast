import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from "react-router-dom"
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import Components, { Container, Row, Col, Button } from 'components'
import { Profile } from './style/profilestyle'
import { profile, Location } from 'store/actions'
import { authStore } from 'service'
import { translate } from 'utils'
import moment from 'moment'
import Loading from 'components/Loading'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const ProfileEdit = () => {
  const history = useHistory()
  const [disabled, setDisabled] = useState(false)
  const [success, setSuccess] = useState(false)
  const { translation_data, langStore } = useSelector(state => state.translation)
  const { isProfileData } = useSelector(state => state.emit)
  const { cityList_data } = useSelector(state => state.location)
  const dispatch = useDispatch()
  // get state and division id 
  useEffect(() => {
    dispatch(Location.getCityList(langStore?.code))
  }, [dispatch, langStore?.code])

  let initialValues = {
    name: isProfileData?.name || '',
    mobile: isProfileData?.mobile,
    email: isProfileData?.email || '',
    date: isProfileData?.dob ? new Date(isProfileData?.dob) : '',
    address1: isProfileData?.street || '',
    state_division: isProfileData?.state_division_id || '',
    township_id: isProfileData?.township_id || ''
  }

  const onUpdateProfileSubmit = (values, actions) => {
    actions.setSubmitting(true)
    setDisabled(true)
    const { state_division, township_id, date, ...postValues } = values
    let user_id = authStore.getAuth()?.uid
    let dateBirth = values?.date
    let dob = dateBirth ? moment(dateBirth).format("YYYY-MM-DD") : null
    let postData = { ...postValues, state_division: +values.state_division, township_id: +values.township_id, user_id, dob }

    if (postData?.state_division === 0) {
      delete postData?.state_division
      delete postData?.township_id
    }
    setTimeout(async () => {
      let res = await dispatch(profile.updateProfile(postData))
      if (res?.result?.status === 'success') {
        setSuccess(true)
        window.scrollTo(0, 0)
      } else {
        console.log(`error`, res)
      }
      actions.setSubmitting(false)
      setDisabled(false)
    }, 1000)
  }

  const breadcrumb_data = [
    {
      name: translate(translation_data, 'profile', langStore?.code),
      link: `/profile`
    },
    {
      name: translate(translation_data, 'edit_profile', langStore?.code)
    }
  ]

  return (
    success === true ?
      <Components.SuccessMsg>
        <Components.Text color="primary" className="alert-msg">{translate(translation_data, 'profile_update_success_msg', langStore?.code)}</Components.Text>
        <Link to='/profile' className="btn btn-default">{translate(translation_data, 'ok', langStore?.code)}</Link>
      </Components.SuccessMsg>
      :
      <>
        <Components.Breadcrumb data={breadcrumb_data} />
        <Components.Section>
          <Container>
            <Row>
              <Col sm="12">
                <Profile background="" borderRadius="15" padding="25px 30px" sm_padding="10px 20px">
                  <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={
                      Yup.object({
                        name: Yup.string()
                          .max(20, 'Must be 15 characters or less')
                          .required('Your Name is required'),
                        mobile: Yup.string()
                          .min(7, 'Your phone number at least 7 digits!')
                          .max(13, 'Your phone number is too much digits!')
                          .matches(phoneRegExp, 'Your Phone number is not valid!')
                          .required('Phone number is required'),
                        date: Yup.date()
                          .max(new Date(), "Date of Birth can't be in future!")
                          .typeError('Invalid Date!'),
                      })
                    }
                    onSubmit={(values, actions) => onUpdateProfileSubmit(values, actions)}>

                    {
                      formikProps => (
                        <Form>
                          <Row>
                            <Col md="6" className="edit-col">
                              <Components.TextInput label={translate(translation_data, 'name', langStore?.code)} name="name" type="text" require={true} />
                              <Components.TextInput
                                label={translate(translation_data, 'phone', langStore?.code)} name="mobile" type="text" isNumber={true} disabled require={true}
                                onKeyDown={e => e.key !== "Backspace" &&
                                  e.key !== "Enter" &&
                                  e.keyCode !== 37 &&
                                  e.keyCode !== 39 &&
                                  e.keyCode !== 46 &&
                                  e.keyCode !== 9 &&
                                  e.key.match(/[^0-9]/)
                                  && e.preventDefault()
                                }
                              />
                              <Components.TextInput label={translate(translation_data, 'email', langStore?.code)} name="email" type="email" placeholder="Enter your email" />
                              <Components.SelectDateField
                                name="date"
                                label={translate(translation_data, 'birthday', langStore?.code)}
                                showLabels={false}
                                errorMax="Date of Birth can't be in future!"
                              />
                            </Col>
                            <Col md="6" className="edit-col">
                              <Components.TextArea label={translate(translation_data, 'address', langStore?.code)} name="address1" type="text" rows_height="130" />
                              <Components.Select
                                label={translate(translation_data, 'state_division', langStore?.code)}
                                name="state_division"
                                onChange={e => {
                                  formikProps.setFieldValue('state_division', e.target.value)
                                  let cityId_arr = cityList_data?.data?.filter(x => x?.city_id === +e.target.value)
                                  formikProps.setFieldValue('township_id', cityId_arr?.length > 0 ? (cityId_arr[0]?.township?.length > 0 ? cityId_arr[0]?.township[0]?.id : '') : '')
                                }}
                              >
                                <option value='' disabled>Select State/ Division</option>
                                {
                                  cityList_data?.data.map((x, i) => (
                                    <option value={x.city_id} key={i}>{x.city_name}</option>
                                  ))
                                }
                              </Components.Select>
                              <Components.Select label={translate(translation_data, 'township', langStore?.code)} name="township_id" >
                                <option value='' disabled>Select Township</option>
                                {
                                  cityList_data?.data?.filter(x => x?.city_id === +formikProps?.values?.state_division).map((x, i) => {
                                    return x?.township?.map((y, index) => (
                                      <option value={y.id} key={index}>{y.name}</option>
                                    ))
                                  })
                                }
                              </Components.Select>
                            </Col>
                          </Row>
                          <div className="edit-btn-wrap">
                            <Row className="edit-btn-row">
                              <Col md="6" className="save-btn edit-btn-col">
                                <Button type='submit' className={`btn btn-default ${disabled && "btn-disabled"}`} disabled={disabled && disabled}>
                                  {
                                    formikProps.isSubmitting ?
                                      <Loading style={{
                                        width: 20,
                                        height: 20,
                                        border: '3px solid rgba(255, 255, 255, .23)',
                                        borderRight: '3px solid rgba(255, 255, 255, .85)',
                                      }}>{translate(translation_data, 'submitting', langStore?.code)}</Loading> :
                                      translate(translation_data, 'save', langStore?.code)
                                  }
                                </Button>
                              </Col>
                              <Col md="6" className="edit-btn-col">
                                <Button type='button' className="btn btn-gray" onClick={() => history.push('/profile')}>
                                  {translate(translation_data, 'cancel', langStore?.code)}
                                </Button>
                              </Col>
                            </Row>
                          </div>
                        </Form>
                      )
                    }
                  </Formik>
                </Profile>
              </Col>
            </Row>
          </Container>
        </Components.Section>
      </>
  )
}

export default ProfileEdit
