import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { contact, Meta } from 'store/actions'
import { translate } from 'utils'
import Components, { Col, Container, Row, Copyright, Image } from 'components'

import { FooterWrapper, Title, List, SocialDiv, ContactDiv } from './style/footerstyle'
import { BiMap } from 'react-icons/bi'
import { ImPhone } from 'react-icons/im'
import { IoIosMail } from 'react-icons/io'

const Footer = () => {
  const dispatch = useDispatch()
  const { translation_data, langStore } = useSelector(state => state.translation)
  const { contact_data } = useSelector(state => state.contact)
  const { meta_data } = useSelector(state => state.meta)

  useEffect(() => {
    dispatch(contact.getContactUs({ lang: langStore?.code }))
    dispatch(Meta.getMetaData({ lang: langStore?.code, code: '' }))
  }, [dispatch, langStore?.code])

  return (
    <>
      <Components.Support support_data={meta_data} />
      <FooterWrapper>
        <div className="top-footer">
          <div className="overlay"></div>
          <Container className='footer-container'>
            <Row>
              <Col lg="3" className="footer-col">
                <div className="logo">
                  <img src={require("../../assets/img/icons/stead-fast-logo-white.png").default} alt="logo" />
                </div>
                <ContactDiv>
                  <BiMap />
                  <p>{contact_data?.data?.[0]?.address}</p>
                </ContactDiv>
                <ContactDiv>
                  <ImPhone />
                  <ul className='contact'>
                    <li>
                      {contact_data?.data?.[0]?.phone?.split(',').map((val, key, array) => (
                        <a href={`tel:${val}`} key={key}>{val}{key !== array?.length - 1 ? ', ' : ''}</a>
                      ))}
                    </li>
                  </ul>
                </ContactDiv>
                <ContactDiv>
                  <IoIosMail />
                  <ul className='contact'>
                    <li>
                      {contact_data?.data?.[0]?.email?.split(',').map((val, key, array) => (
                        <a href={`mailto:${val}`} key={key}>{val}{key !== array?.length - 1 ? ', ' : ''}</a>
                      ))}
                    </li>
                  </ul>
                </ContactDiv>

                <SocialDiv>
                  {contact_data?.data?.[0]?.social_image_ids?.length > 0 &&
                    contact_data?.data?.[0]?.social_image_ids?.map((social, key) => (
                      <a href={social?.link} key={key} target="_blank" rel="noreferrer">
                        <Image src={social?.image} alt='social' />
                      </a>
                    ))
                  }
                </SocialDiv>
              </Col>
              <Col lg="3" className="footer-col">
                <Title>
                  {translate(translation_data, 'information', langStore?.code)}
                </Title>
                <List>
                  <li>
                    <NavLink to="/aboutus">
                      {translate(translation_data, 'about_us', langStore?.code)}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contactus">
                      {translate(translation_data, 'contact_us', langStore?.code)}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/privacypolicy">
                      {translate(translation_data, 'privacy_policy', langStore?.code)}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/termsandconditions">
                      {translate(translation_data, 'term_condition', langStore?.code)}
                    </NavLink>
                  </li>
                </List>
              </Col>
              <Col lg="3" className="footer-col">
                <Title>
                  {translate(translation_data, 'customer_service', langStore?.code)}
                </Title>
                <List>
                  <li>
                    <NavLink to="/service-ticket">
                      {translate(translation_data, 'service_ticket', langStore?.code)}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/home-service">
                      {translate(translation_data, 'home_service', langStore?.code)}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/express-service">
                      {translate(translation_data, 'express_service', langStore?.code)}
                    </NavLink>
                  </li>
                </List>
              </Col>
              <Col lg="3" className="footer-col">
                <Title>
                  {translate(translation_data, 'payment_type', langStore?.code)}
                </Title>
                <List className="payment">
                  {
                    contact_data?.data?.[0]?.payment_icon_ids?.map((icon, key) => (
                      <li key={key}>
                        <img src={icon?.image ? icon?.image : require("../../assets/img/no-img.jpg").default} alt="payment" />
                      </li>
                    ))
                  }
                </List>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="copyright">
          <Copyright data="Steadfast" />
        </div>
      </FooterWrapper>
    </>
  )
}

export default Footer