import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { ProfileContainer } from './style/sidebarstyle'
import { translate } from 'utils'

const ProfileSidebar = ({ profile }) => {
  const { translation_data, langStore } = useSelector(state => state.translation)
  return (
    <ProfileContainer>
      {
        profile ?
          <>
            <li>
              <NavLink activeClassName="active" to="/profile">{translate(translation_data, 'my_profile', langStore?.code)}</NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/orderhistory">{translate(translation_data, 'my_orders', langStore?.code)}</NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/myservice">{translate(translation_data, 'my_service_ticket', langStore?.code)}</NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/wishlist">{translate(translation_data, 'my_wishlist', langStore?.code)}</NavLink>
            </li>
          </>
          :
          <>
            <li>
              <NavLink activeClassName="active" to="/termsandconditions">{translate(translation_data, 'term_condition', langStore?.code)}</NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/privacypolicy">{translate(translation_data, 'privacy_policy', langStore?.code)}</NavLink>
            </li>
          </>
      }
    </ProfileContainer>
  )
}

export default ProfileSidebar
