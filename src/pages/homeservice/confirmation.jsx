import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Services } from 'store/actions'
import { useLocation } from 'react-router'
import Components from 'components'

const Confirmation = () => {
  const location = useLocation()
  const { langStore } = useSelector(state => state.translation)
  const {
    serviceLocation_data
  } = useSelector(state => state.services)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(Services.getServiceLocation({ lang: langStore?.code }))
  }, [dispatch, langStore?.code])

  return (
    <Components.Confirmation
      service_data={{
        data: location?.service,
        location: serviceLocation_data,
        service_type: location?.service_type,
        service_deposit: location?.service_deposit
      }}
      type={location?.type}
    />
  )
}

export default Confirmation
