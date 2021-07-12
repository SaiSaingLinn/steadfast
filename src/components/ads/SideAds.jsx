import React from 'react'
import styled from 'styled-components'
import CustomPlaceholder from '../fakeimg'
import colors from '../constant/Color'

const SideAds = props => {
  const { ads_data } = props
  // const ads_result = ads_data?.data?.find(res => res?.position?.toLowerCase() === position_code?.toLowerCase())

  const tmp = {
    first_ads: {
      ...props,
      height: 300,
      backgroundColor: colors.light,
      text: 'ADS - 270 x 300'
    },
    second_ads: {
      ...props,
      height: 750,
      backgroundColor: colors.light,
      text: 'ADS - 270 x 750'
    }
  }

  return (
    <AdsContainer>
      <CustomPlaceholder data={ads_data?.data?.[0]?.advertising_image} {...tmp.first_ads} />
      <CustomPlaceholder data={ads_data?.data?.[1]?.advertising_image} {...tmp.second_ads} />
    </AdsContainer>
  )
}

export default SideAds

// styled
const AdsContainer = styled.div`
  > * {
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`
