import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Components, { Container, Row, Col, Text, Tr, Td } from 'components'
import { Profile } from './style/profilestyle'
import { myserviceticket } from 'store/actions'
import { translate } from 'utils'

const scrollToRef = () => window.scrollTo(0, 100)

const MyService = () => {
  const dispatch = useDispatch()
  const { myserviceticketsummary_data, isLoading } = useSelector(state => state.myserviceticket)
  const { translation_data, langStore } = useSelector(state => state.translation)
  const [current, setCurrent] = useState(1)
  const scrollRef = useRef(null)

  const postParam = {
    product_per_page: 10,
    page_number: 1
  }

  useEffect(() => {
    dispatch(myserviceticket.getMyServiceTicketSummary(postParam))
  }, [dispatch])

  const onChangePaginate = data => {
    setCurrent(data)
    dispatch(myserviceticket.getMyServiceTicketSummary({...postParam, page_number: data}))
    scrollToRef(scrollRef)
  }

  // console.log(`myserviceticketsummary_data`, myserviceticketsummary_data)

  const headerData = [
    {
      title: translate(translation_data, 'service_ticket', langStore?.code)
    },
    {
      title: translate(translation_data, 'available', langStore?.code)
    },
    {
      title: translate(translation_data, 'used', langStore?.code)
    },
    {
      title: translate(translation_data, 'expired', langStore?.code)
    },
    {
      title: ""
    }
  ]

  const breadcrumb_data = [{ name: translate(translation_data, 'my_service_ticket', langStore?.code) }]

  const tableBody = () => (
    myserviceticketsummary_data?.data?.summary_list?.map((x, i) => (
      <Tr key={i}>
        <Td halign="center">
          <Text className="mobile-caption">{translate(translation_data, 'service_ticket', langStore?.code)}</Text>
          <Text>{x?.product_tmpl?.name}</Text>
        </Td>
        <Td halign="center">
          <Text className="mobile-caption">{translate(translation_data, 'available', langStore?.code)}</Text>
          <Text>{x?.available}</Text>
        </Td>
        <Td halign="center">
          <Text className="mobile-caption">{translate(translation_data, 'used', langStore?.code)}</Text>
          <Text>{x?.used}</Text>
        </Td>
        <Td halign="center">
          <Text className="mobile-caption">{translate(translation_data, 'expired', langStore?.code)}</Text>
          <Text>{x?.expiry}</Text>
        </Td>
        <Td halign="center" className='link'>
          <Link to={`/myservice/myservicedetail/${x?.product_tmpl?.id}`}>{translate(translation_data, 'detail', langStore?.code)}</Link>
        </Td>
      </Tr>
    ))
  )

  return (
    !isLoading &&
    <>
      <Components.Breadcrumb data={breadcrumb_data} />
      <Components.Section>
        <Container>
          <Row>
            <Col sm="3">
              <Components.Sidebar profile={true} />
            </Col>
            <Col sm="9">
              <Profile>
                <Text className="title">{translate(translation_data, 'my_service_ticket', langStore?.code)}</Text>
                {
                  myserviceticketsummary_data?.data?.summary_list?.length > 0 || myserviceticketsummary_data === null ?
                  <Components.TableCom header={headerData} body={tableBody()} />
                  :
                  <Components.NoResult result='No Result Found' />
                }
                {
                  myserviceticketsummary_data?.data?.itemcount > 10 &&
                  <Components.Pagination
                    onChange={onChangePaginate}
                    current={current}
                    total={myserviceticketsummary_data?.data?.itemcount}
                    defaultPageSize={10}
                  />
                }
              </Profile>
            </Col>
          </Row>
        </Container>
      </Components.Section>
    </>
  )
}

export default MyService
