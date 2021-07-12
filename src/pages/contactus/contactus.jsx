import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import parse from 'html-react-parser'
import { translate } from 'utils'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Contact } from './style/contactstyle'
import { RiRoadMapLine } from 'react-icons/ri'
import { FiPhoneCall } from 'react-icons/fi'
import { BsEnvelopeOpen, BsCheckCircle, BsQuestionCircle } from 'react-icons/bs'
import { contact } from 'store/actions'
import Components, { Container, Button, Text, RTEContent } from 'components'
import Loading from 'components/Loading'


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const ContactUs = () => {
  const [disabled, setDisabled] = useState(false)
  const { translation_data, langStore } = useSelector(state => state.translation)
  const { contact_data } = useSelector(state => state.contact)
  const dispatch = useDispatch()

  const breadcrumb_data = [{ name: translate(translation_data, 'contact_us', langStore?.code) }]

  let initialValues = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  }

  const alertMessage = alert => {
    return (
      <>
        {alert === 'success' && <div style={{ display: 'flex' }}><BsCheckCircle /><span>Thanks for contacting us!</span></div>}
        {alert === 'error' && <div><BsQuestionCircle /><span>Email not sent!</span></div>}
      </>
    )
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(20, translate(translation_data, 'must_be_20_character', langStore?.code))
      .required(translate(translation_data, 'name_is_required', langStore?.code)),
    email: Yup.string()
      .email(translate(translation_data, 'invalid_email', langStore?.code))
      .required(translate(translation_data, 'email_is_required', langStore?.code)),
    phone: Yup.string()
      .min(7, 'Your phone number at least 7 digits!')
      .max(15, translate(translation_data, 'too_much digits', langStore?.code))
      .matches(phoneRegExp, translate(translation_data, 'phone_not_valid', langStore?.code))
      .required(translate(translation_data, 'phone_is_required', langStore?.code)),
    subject: Yup.string(),
    message: Yup.string()
      .required(translate(translation_data, 'message_is_required', langStore?.code))
  })

  const onDataSubmit = (values, actions) => {
    setDisabled(true)
    setTimeout(async () => {
      try {
        const res = await dispatch(contact.sentContactUs(values))

        if (res?.result?.status === 'success') {
          actions.resetForm({ name: '', email: '', phone: '', subject: '', message: '' })
          toast.success(alertMessage('success'), {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: false
          })
        } else {
          toast.error(alertMessage('error'), {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000
          })
        }
        actions.setSubmitting(false)
        setDisabled(false)
        window.scrollTo(0, 0)
      } catch (error) {
        console.log('error', error)
      }
      setDisabled(false)
    }, 1000)
  }

  return (
    <>
      <Components.Breadcrumb data={breadcrumb_data} />
      <Components.Section>
        <Container>
          <Contact>
            <div className="contact-wrap">
              <Text className="title">
                {translate(translation_data, 'contact_information', langStore?.code)}
              </Text>
              <div className="address-wrap">
                <div className="icon">
                  <RiRoadMapLine />
                </div>
                <div className="info">
                  <Text>{contact_data?.data?.[0]?.address}</Text>
                </div>
              </div>
              <div className="address-wrap">
                <div className="icon">
                  <FiPhoneCall />
                </div>
                <div className="info">
                  <ul>
                    <li>
                      {contact_data?.data?.[0]?.phone?.split(',').map((val, key, array) => (
                        <a href={`tel:${val}`} key={key}>{val}{key !== array?.length - 1 ? ', ' : ''}</a>
                      ))}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="address-wrap">
                <div className="icon">
                  <BsEnvelopeOpen />
                </div>
                <div className="info">
                  <ul>
                    <li>
                      {contact_data?.data?.[0]?.email?.split(',').map((val, key, array) => (
                        <a href={`mailto:${val}`} key={key}>{val}{key !== array?.length - 1 ? ', ' : ''}</a>
                      ))}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="contact-wrap">
              <Text className="title">
                {translate(translation_data, 'inquery', langStore?.code)}
              </Text>
              <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => onDataSubmit(values, actions)}>
                {
                  formikProps => (
                    <Form>
                      <div className='contact-form'>
                        <Components.TextInput label={translate(translation_data, 'name', langStore?.code)} name="name" type="text" require={true} />
                        <Components.TextInput label={translate(translation_data, 'email', langStore?.code)} name="email" type="email" require={true} />
                        <Components.TextInput
                          label={translate(translation_data, 'phone', langStore?.code)}
                          name="phone" type="text" require={true} isNumber={true}
                          onKeyDown={e => e.key !== "Backspace" &&
                            e.key !== "Enter" &&
                            e.keyCode !== 37 &&
                            e.keyCode !== 39 &&
                            e.keyCode !== 46 &&
                            e.keyCode !== 9 &&
                            e.key.match(/[^0-9]/)
                            && e.preventDefault()
                          } />
                        <Components.TextInput label={translate(translation_data, 'subject', langStore?.code)} name="subject" type="text" />
                        <Components.TextArea label={translate(translation_data, 'message', langStore?.code)} name="message" type="text" rows_height='80' require={true} />
                      </div>
                      <div className='footer-btn-con'>
                        <Button type='submit' className={`btn btn-default ${disabled && "btn-disabled"}`} disabled={disabled && disabled}>
                          {
                            formikProps.isSubmitting ?
                              <Loading style={{
                                width: 20,
                                height: 20,
                                border: '3px solid rgba(255, 255, 255, .23)',
                                borderRight: '3px solid rgba(255, 255, 255, .85)',
                              }}>{translate(translation_data, 'submitting', langStore?.code)}</Loading> :
                              translate(translation_data, 'send_message', langStore?.code)
                          }
                        </Button>
                      </div>
                    </Form>
                  )
                }
              </Formik>
              <ToastContainer />
            </div>
          </Contact>
          <RTEContent>
            {parse(`"${contact_data?.data?.[0]?.google_map}"`)}
          </RTEContent>
        </Container>
      </Components.Section>
    </>
  )
}

export default ContactUs