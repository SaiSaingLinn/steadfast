import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Components, { Container, Row, Col, Text } from 'components'
import { Profile } from './style/profilestyle'
import { FiEdit } from 'react-icons/fi'
import { profile } from 'store/actions'
import { authStore } from 'service'
import { translate } from 'utils'

const MyProfile = () => {
  const dispatch = useDispatch()
  const { isProfileData } = useSelector(state => state.emit)
  const { translation_data, langStore } = useSelector(state => state.translation)

  //get profile data
  useEffect(() => {
    window.scrollTo(0, 0)
    authStore.getAuth()?.uid && dispatch(profile.getProfile(authStore.getAuth()?.uid))
  }, [dispatch])

  const breadcrumb_data = [{ name: translate(translation_data, 'profile', langStore?.code) }]

  return (
    <>
      <Components.Breadcrumb data={breadcrumb_data} />
      <Components.Section>
        <Container>
          <Row>
            <Col sm="3">
              <Components.Sidebar profile={true} />
            </Col>
            <Col sm="9">
              {isProfileData !== null &&
                <Profile>
                  <Text className="title">{translate(translation_data, 'profile', langStore?.code)}</Text>
                  <div className="profile-info-wrap">
                    <div className="profile-info">
                      <Text className="label">{translate(translation_data, 'name', langStore?.code)}</Text>
                      <Text>{ isProfileData?.name !== null && isProfileData?.name }</Text>
                    </div>
                    <div className="profile-info">
                      <Text className="label">{translate(translation_data, 'state_division', langStore?.code)}</Text>
                      <Text>{ isProfileData?.state_division_name !== null && isProfileData?.state_division_name }</Text>
                    </div>
                    <div className="profile-info">
                      <Text className="label">{translate(translation_data, 'phone', langStore?.code)}</Text>
                      <Text>{ isProfileData?.mobile !== null && isProfileData?.mobile }</Text>
                    </div>
                    <div className="profile-info">
                      <Text className="label">{translate(translation_data, 'township', langStore?.code)}</Text>
                      <Text>{ isProfileData?.township_name !== null && isProfileData?.township_name }</Text>
                    </div>
                    <div className="profile-info">
                      <Text className="label">{translate(translation_data, 'email', langStore?.code)}</Text>
                      <Text>{ isProfileData?.email !== null && isProfileData?.email }</Text>
                    </div>
                    <div className="profile-info">
                      <Text className="label">{translate(translation_data, 'address', langStore?.code)}</Text>
                      <Text>{ isProfileData.street !== null && isProfileData.street }</Text>
                    </div>
                    <div className="profile-info">
                      <Text className="label">{translate(translation_data, 'birthday', langStore?.code)}</Text>
                      <Text>{ isProfileData.dob !== null && moment(isProfileData.dob).format("D/M/YYYY") }</Text>
                    </div>
                  </div>
                  <div className="profile-btn">
                    <Link to="/profile/profileedit" className="btn btn-gray"><FiEdit /> {translate(translation_data, 'edit_profile', langStore?.code)}</Link>
                    <Link to="/changepassword" className="btn btn-gray"><FiEdit /> {translate(translation_data, 'change_pass', langStore?.code)}</Link>
                  </div>
                </Profile>
              }
            </Col>
          </Row>
        </Container>
      </Components.Section>
    </>
  )
}

export default MyProfile
