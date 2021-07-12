import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { translate, moneyFormat } from 'utils'
import { order } from 'store/actions'
import Components, { Container, Row, Col, Text, Tr, Td, Image } from 'components'
import { Profile } from './style/profilestyle'
import { BiArrowBack } from "react-icons/bi"

const OrderDetail = () => {
  const dispatch = useDispatch()
  const { orderbyid_data, isLoading } = useSelector(state => state.order)
  const order_id = useParams().id
  const { translation_data, langStore } = useSelector(state => state.translation)
  
  const postParam = {
    order_id,
    langCode: langStore?.code
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(order.getOrderById(postParam))
  }, [dispatch, postParam.langCode, postParam.order_id])
  
  // get delivery charge only 
  let deli_charge = orderbyid_data?.data?.products?.filter(x => x?.is_delivery_line === true)

  // get order line only 
  let order_line = orderbyid_data?.data?.products?.filter(x => x?.is_delivery_line === false)
  
  const headerData = [
    {
      title: translate(translation_data, 'product', langStore?.code)
    },
    {
      title: translate(translation_data, 'price', langStore?.code)
    },
    {
      title: translate(translation_data, 'quantity', langStore?.code)
    },
    {
      title: translate(translation_data, 'subtotal', langStore?.code)
    }
  ]
  
  const breadcrumb_data = [
    { 
      name: translate(translation_data, 'my_orders', langStore?.code),
      link: `/orderhistory`
    },
    { 
      name: translate(translation_data, 'order_detail', langStore?.code) 
    }
  ]

  const tableBody = () => (
    <>
      {
        order_line?.map((x, i) => (
          <Tr key={i}>
            <Td>
              <Text className="mobile-caption">{translate(translation_data, 'product', langStore?.code)}</Text>
              <div style={{ justifyContent: "start" }} className="img-wrap">
                {
                  x?.product_type === "product" &&
                  <Image src={x?.image_link ? x?.image_link : require('../../assets/img/no-img.jpg').default} alt="product" className="order-detail-img" />
                }
                <Text>
                  <span className="product-name">{x?.product}</span>
                </Text>
              </div>
            </Td>
            <Td halign="center" className="price">
              <Text className="mobile-caption">{translate(translation_data, 'price', langStore?.code)}</Text>
              <Text>{moneyFormat(x?.price_unit)} Ks</Text>
            </Td>
            <Td halign="center">
              <Text className="mobile-caption">{translate(translation_data, 'quantity', langStore?.code)}</Text>
              <Text>{x?.quantity}</Text>
            </Td>
            <Td halign="center" className="price">
              <Text className="mobile-caption">{translate(translation_data, 'subtotal', langStore?.code)}</Text>
              <Text>{moneyFormat(x?.price_subtotal)} Ks</Text>
            </Td>
          </Tr>
        ))
      }
      { 
        deli_charge?.map((x, i) => (
          x?.is_delivery_line &&
          <Tr className="total border" key={i}>
            <Td colSpan="3" halign="right">
              <Text className="total-title">{translate(translation_data, 'delivery_charge', langStore?.code)}</Text>
            </Td>
            <Td halign="center">
              <Text className="total-price">{x?.is_delivery_line ? moneyFormat(x?.price_subtotal) : "0"} Ks</Text>
            </Td>
          </Tr>
        ))
      }
      <Tr className="total">
        <Td colSpan="3" halign="right">
          <Text className="total-title title-bold">{translate(translation_data, 'subtotal', langStore?.code)}</Text>
        </Td>
        <Td halign="center">
          <Text className="total-price title-bold">{moneyFormat(orderbyid_data?.data?.amount_untaxed)} Ks</Text>
        </Td>
      </Tr>
      <Tr className="total border">
        <Td colSpan="3" halign="right">
          <Text className="total-title">{translate(translation_data, 'tax', langStore?.code)}</Text>
        </Td>
        <Td halign="center">
          <Text className="total-price">{moneyFormat(orderbyid_data?.data?.taxes)} Ks</Text>
        </Td>
      </Tr>
      <Tr className="total">
        <Td colSpan="3" halign="right">
          <Text className="total-title title-bold">{translate(translation_data, 'total_amount', langStore?.code)}</Text>
        </Td>
        <Td halign="center">
          <Text className="total-price title-bold">{moneyFormat(orderbyid_data?.data?.amount_total)} Ks</Text>
        </Td>
      </Tr>
    </>
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
                <Text className="title">{translate(translation_data, 'order_detail', langStore?.code)}</Text>
                <Text className="order-number">{translate(translation_data, 'order_no', langStore?.code)} {orderbyid_data?.data?.sale_order}</Text>
                <div className="order-address"><span style={{minWidth: 90}}>{translate(translation_data, 'delivery_to', langStore?.code)}:</span>
                  <Text className="address">
                    <span>{orderbyid_data?.data?.street}</span>
                    <span>{orderbyid_data?.data?.township}</span>
                    <span>{orderbyid_data?.data?.state_division}</span>
                  </Text>
                </div>
                <Components.TableCom header={headerData} body={tableBody()} />
              </Profile>
              <Link to="/orderhistory" className="btn-back"><BiArrowBack /> {translate(translation_data, 'back_to_my_order', langStore?.code)}</Link>
            </Col>
          </Row>
        </Container>
      </Components.Section>
    </>
  )
}

export default OrderDetail
