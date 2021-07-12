import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FullWidthAds from './TopAds'
import SideAds from './SideAds'
import { adsKey } from 'key'
import { Ads } from 'store/actions'

const { center_ads, side_ads } = adsKey

const Advertisement = props => {
  const { position_code, page_code } = props
  const { langStore } = useSelector(state => state.translation)
  const { ads_data } = useSelector(state => state.ads)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(Ads.getAds({ page: page_code }))
  }, [dispatch, langStore?.code, page_code])

  return (
    <>
      {position_code === center_ads && <FullWidthAds ads_data={ads_data} {...props} />}
      {position_code === side_ads && <SideAds ads_data={ads_data} {...props} />}
    </>
  )
}

export default Advertisement
