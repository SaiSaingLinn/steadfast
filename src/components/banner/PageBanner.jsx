import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Slider from 'react-slick'
import { BannerSlider } from 'store/actions'
import CustomPlaceholder from 'components/fakeimg'
import { BannerSection } from './style/bannerstyle'
import colors from 'components/constant/Color'

const HomeBanner = ({ page_code }) => {
  const { langStore } = useSelector(state => state.translation)
  const { slider_data } = useSelector(state => state.slider)
  const dispatch = useDispatch()

  const bannerData = slider_data?.data?.filter(data => data?.code?.toLowerCase() === page_code?.toLowerCase())

  useEffect(() => {
    dispatch(BannerSlider.getSlider({ lang: langStore?.code }))
  }, [dispatch, langStore?.code])

  const settings = {
    dots: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true
        }
      }
    ]
  }

  const bannerSettings = {
    width: 'auto',
    height: 400,
    backgroundColor: colors.light,
    text: 'ADS - 1200 x 400'
  }

  return (
    <BannerSection>
      {page_code === 'ads-slider-code' ?
        <Slider {...settings}>
          {bannerData?.[0]?.slider_images?.length > 0 &&
            bannerData?.[0]?.slider_images?.map((slider_img, key) => (
              <CustomPlaceholder key={key} data={slider_img?.image} {...bannerSettings} />
            ))
          }
        </Slider>
        :
        <div>
          {bannerData?.[0]?.slider_images?.length > 0 &&
            <CustomPlaceholder data={bannerData?.[0]?.slider_images?.[0]?.image} {...bannerSettings} />
          }
        </div>
      }
    </BannerSection>
  )
}

export default HomeBanner
