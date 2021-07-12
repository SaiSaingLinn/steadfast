import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Components from '../../components'
import { Service } from './style/ServiceStyle'
import { adsKey } from '../../key'

const { center_ads } = adsKey

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const ServiceForm = ({breadcrumb_data}) => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required("Name is required"),
    phone: Yup.string()
      .min(7, 'Your phone number at least 7 digits!')
      .max(15, 'Your phone number is too much digits!')
      .matches(phoneRegExp, 'Your Phone number is not valid!')
      .required("Phone is required"),
    city: Yup.string()
      .required("City is required"),
    township: Yup.string()
      .required("Township is required"),
    address: Yup.string()
      .required("Address is required"),
    customer_request: Yup.string()
  })

  let initialValues = {
    name: '',
    phone: '',
    city: '',
    township: '',
    address: '',
    customer_request: ''
  }

  const onDataSubmit = (values, actions) => {
    setTimeout(async () => {
      console.log('values', values)
      actions.setSubmitting(false)
    }, 1000)
  }
  return (
    <>
      <Components.Breadcrumb data={breadcrumb_data} />
      <Components.Advertisement position_code={center_ads} />
      <Components.Section>
        <Components.Container>
          <Components.Row>
            <Components.Col space="12">

              <Service>
                <Components.View as="div" className="service">
                  <Components.Text as="h5">Home Service Form</Components.Text>
                  <Components.Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.</Components.Text>
                  <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => onDataSubmit(values, actions)}>
                    {
                      formikProps => (
                        <Form>
                          <Components.Row>
                            <Components.Col md="6">
                              <Components.TextInput label="Customer Name" name="name" type="text" require={true} />
                              <Components.TextInput
                                label="Mobile Phone" name="phone" type="text" require={true} isNumber={true}
                                onKeyDown={e => e.key !== "Backspace" &&
                                  e.key !== "Enter" &&
                                  e.keyCode !== 37 &&
                                  e.keyCode !== 39 &&
                                  e.keyCode !== 46 &&
                                  e.keyCode !== 9 &&
                                  e.key.match(/[^0-9]/)
                                  && e.preventDefault()
                                } />
                              <Components.TextInput label="Email" name="email" type="text" />
                              <Components.TextArea label="Address" name="address" type="text" rows_height='80' require={true} />
                              <Components.Select
                                label="Division"
                                name="city"
                                require={true}>
                                <option>State/Division</option>
                                <option>Yangon</option>
                                <option>Mandalay</option>
                                <option>Nay Pyi Taw</option>
                              </Components.Select>
                              <Components.Select label="Township" name="township" require={true}>
                                <option>Township</option>
                                <option>Sanchaung</option>
                                <option>Hlaing</option>
                              </Components.Select>
                            </Components.Col>
                            <Components.Col md="6">
                              <Components.Select
                                label="Service Type"
                                name="city"
                                require={true}>
                                <option>State/Division</option>
                                <option>Yangon</option>
                                <option>Mandalay</option>
                                <option>Nay Pyi Taw</option>
                              </Components.Select>
                              <Components.TextInput label="Appointment Date" name="appodate" type="date" require={true} />
                              <Components.TextInput label="Subject" name="subject" type="text" />
                              <Components.TextArea label="Customer Message" name="message" type="text" rows_height='80' require={true} />
                              <Components.CheckBox label='I agree with all of Apogee Terms, Conditions and Policies.' type="checkbox" name="check" />
                            </Components.Col>
                            <Components.Col space="12">
                              <div className="submit-wrap">
                                <Components.Text weight="lg" color="secondary">* For this service, customers need to transfer money in advance.</Components.Text>
                                <Components.Button type='submit' className="btn btn-default">Submit</Components.Button>
                              </div>
                            </Components.Col>
                          </Components.Row>
                        </Form>
                      )
                    }
                  </Formik>
                </Components.View>
              </Service>
            </Components.Col>
          </Components.Row>
        </Components.Container>
      </Components.Section>
    </>
  )
}

export default ServiceForm
