import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Components, { RTEContent } from 'components'
import { websiteInfo } from 'store/actions'

const breadcrumb_data = [{ name: 'Privacy Policy' }]

const PrivacyPolicy = () => {
  const { langStore } = useSelector(state => state.translation)
  const { webSiteInfo_data } = useSelector(state => state.terms)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(websiteInfo.getWebsiteUnfo({ lang: langStore?.code }))
  }, [dispatch, langStore?.code])

  return (
    <>
      <Components.Breadcrumb data={breadcrumb_data} />
      <Components.Section>
        <Components.Container>
          <Components.Row>
            <Components.Col md='3'>
              <Components.Sidebar />
            </Components.Col>
            <Components.Col md="9">
              <RTEContent>
                <RTEContent></RTEContent>
                <h5>{webSiteInfo_data?.data?.[1]?.name}</h5>
                <div dangerouslySetInnerHTML={{ __html: webSiteInfo_data?.data?.[1]?.description }} />
              </RTEContent>
            </Components.Col>
          </Components.Row>
        </Components.Container>
      </Components.Section>
    </>
  )
}

export default PrivacyPolicy