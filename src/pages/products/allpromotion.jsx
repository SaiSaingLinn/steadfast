import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Components from 'components'
import { Promotion } from 'store/actions'

const breadcrumb_data = [
  {
    name: 'Promotions'
  }
]

const AllPromotion = () => {
  const { langStore } = useSelector(state => state.translation)
  const { promotion_data, isLoading } = useSelector(state => state.promotion)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(Promotion.getPromotion({ lang: langStore?.code }))
  }, [dispatch, langStore?.code])

  console.log(promotion_data)

  return (
    !isLoading &&
    <>
      <Components.Breadcrumb data={breadcrumb_data} />
      <Components.Section>
        <Components.Container>
          <Components.Row>
            <Components.PromotionCard promotion_data={promotion_data} />
          </Components.Row>
        </Components.Container>
      </Components.Section>
    </>
  )
}

export default AllPromotion
