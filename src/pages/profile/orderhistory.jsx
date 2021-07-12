import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Components, { Container, Row, Col, Text, Tr, Td } from 'components'
import { Profile } from './style/profilestyle'
import { order } from 'store/actions'
import { authStore } from 'service'
import moment from 'moment'
import { moneyFormat, translate } from 'utils'

const scrollToRef = () => window.scrollTo(0, 100)

const OrderHistory = () => {
  const dispatch = useDispatch()
  const { order_data, isLoading } = useSelector(state => state.order)
  const { translation_data, langStore } = useSelector(state => state.translation)
  let user_id = authStore.getAuth()?.uid
  const [current, setCurrent] = useState(1)
  const scrollRef = useRef(null)

  const postParam = {
    langCode: langStore?.code,
    user_id, 
    product_per_page: 10,
    page_number: ''
  }

  useEffect(() => {
    dispatch(order.getOrder(postParam))
  }, [dispatch, postParam?.user_id])

  const onChangePaginate = data => {
    setCurrent(data)
    dispatch(order.getOrder({...postParam, page_number: data}))
    scrollToRef(scrollRef)
  }

  const headerData = [
    {
      title: translate(translation_data, 'order_no', langStore?.code)
    },
    {
      title: translate(translation_data, 'order_date', langStore?.code)
    },
    {
      title: translate(translation_data, 'address', langStore?.code)
    },
    {
      title: translate(translation_data, 'total_amount', langStore?.code)
    },
    {
      title: translate(translation_data, 'status', langStore?.code)
    },
    {
      title: ""
    }
  ]

  const breadcrumb_data = [{ name: translate(translation_data, 'my_orders', langStore?.code) }]

  const tableBody = () => (
    order_data?.data?.sale_order?.map((x, i) => (
      <Tr key={i}>
        <Td halign="center">
          <Text className="mobile-caption">{translate(translation_data, 'order_no', langStore?.code)}</Text>
          <Text>{x?.name}</Text>
        </Td>
        <Td halign="center">
          <Text className="mobile-caption">{translate(translation_data, 'order_date', langStore?.code)}</Text>
          <Text>{moment(x?.date_order).format("DD/MM/YYYY")}</Text>
        </Td>
        <Td halign="center">
          <Text className="mobile-caption">{translate(translation_data, 'address', langStore?.code)}</Text>
          <Text className="address">
            <span>{x?.address?.street}</span>
            <span>{x?.address?.township}</span>
            <span>{x?.address?.state_division}</span>
          </Text>
          {/* <div className="address">
            <ul>
              <li>{x?.address?.street}</li>
              <li>{x?.address?.township}</li>
              <li>{x?.address?.state_division}</li>
            </ul>
          </div> */}
        </Td>
        <Td halign="center">
          <Text className="mobile-caption">{translate(translation_data, 'total_amount', langStore?.code)}</Text>
          <Text>{moneyFormat(x?.amount_total)} Ks</Text>
        </Td>
        <Td halign="center">
          <Text className="mobile-caption">{translate(translation_data, 'status', langStore?.code)}</Text>
          <Text>{x?.order_status}</Text>
        </Td>
        <Td halign="center" className='link'>
          <Link to={`/orderhistory/orderdetail/${x?.id}`}>{translate(translation_data, 'detail', langStore?.code)}</Link>
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
                <Text className="title">{translate(translation_data, 'my_orders', langStore?.code)}</Text>
                {
                  order_data?.data?.sale_order?.length > 0 || order_data === null ?
                  <Components.TableCom header={headerData} body={tableBody()} />
                  :
                  <Components.NoResult result='No Result Found' />
                }
                {
                  order_data?.data?.itemcount > 10 &&
                  <Components.Pagination
                    onChange={onChangePaginate}
                    current={current}
                    total={order_data?.data?.itemcount}
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

export default OrderHistory
