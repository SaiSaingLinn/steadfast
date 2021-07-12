import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Components, { Container, Row, Col, Text, Tr, Td } from 'components'
import { Profile } from './style/profilestyle'
import { myserviceticket } from 'store/actions'
import { translate } from 'utils'
import { BiArrowBack } from "react-icons/bi"
import moment from 'moment'
import styled from 'styled-components'

const MyServiceDetail = () => {
  const dispatch = useDispatch()
  const { myserviceticket_data, isLoading } = useSelector(state => state.myserviceticket)
  const { translation_data, langStore } = useSelector(state => state.translation)
  const product_tmpl_id = useParams().id

  const postParam = {
    product_tmpl_id
  }

  useEffect(() => {
    dispatch(myserviceticket.getMyServiceTicket(postParam))
  }, [dispatch, postParam.product_tmpl_id])

  console.log(`myserviceticketdetail_data`, myserviceticket_data)

  const headerData = [
    {
      title: '#'
    },
    {
      title: translate(translation_data, 'service_ticket_number', langStore?.code)
    },
    {
      title: translate(translation_data, 'created', langStore?.code)
    },
    {
      title: translate(translation_data, 'used', langStore?.code)
    },
    {
      title: translate(translation_data, 'expired', langStore?.code)
    },
    {
      title: translate(translation_data, 'order_no', langStore?.code)
    },
    // {
    //   title: translate(translation_data, 'status', langStore?.code)
    // }
  ]

  const breadcrumb_data = [
    { 
      name: translate(translation_data, 'my_service_ticket', langStore?.code),
      link: `/myservice`
    },
    { 
      name: translate(translation_data, 'service_ticket_detail', langStore?.code) 
    }
  ]

  const ServiceDetailSection = styled.div`
    .color-wrap {
      ul {
        padding: 0;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        li {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-right: 15px;
          font-size: 14px;
          span.color {
            width: 25px;
            height: 15px;
            display: block;
            border-radius: .25rem;
            margin-right: 5px;
          }
          span.available {
            background: #28a745;
          }
          span.expired {
            background: #6c757d;
          }
          span.used {
            background: #007bff;
          }
        }
      }
    }
    .ticket-number {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      span {
        border: 0 none;
      }
      span.color {
        width: 25px;
        height: 15px;
        display: block;
        border-radius: .25rem;
      }
      span.available {
        background: #28a745;
      }
      span.expired {
        background: #6c757d;
      }
      span.used {
        background: #007bff;
      }
    }
    tbody tr.available td {
      background: #28a745 !important;
    }
    tbody tr.expired td {
      background: #6c757d !important;
    }
    tbody tr.used td {
      background: #007bff !important;
    }
  `

  const tableBody = () => (
    myserviceticket_data?.data?.map((x, i) => (
      <Tr key={i}>
        <Td halign="center">
          <Text className="mobile-caption">{translate(translation_data, 'index', langStore?.code)}</Text>
          <Text>{i + 1}</Text>
        </Td>
        <Td halign="center">
          <Text className="mobile-caption">{translate(translation_data, 'service_ticket_number', langStore?.code)}</Text>
          <Text className="ticket-number">
            <span>{x?.ticket_number}</span>
            <span className={`color ${x?.status === "available" ? "available" : x?.status === "used" ? "used" : x?.status === "expired" ? "expired" : ""}`}></span>                  
          </Text>
        </Td>
        <Td halign="center">
          <Text className="mobile-caption">{translate(translation_data, 'created', langStore?.code)}</Text>
          <Text>{x?.created_on ? moment(x?.created_on).format("DD/MM/YYYY") : "-"}</Text>
        </Td>
        <Td halign="center">
          <Text className="mobile-caption">{translate(translation_data, 'used', langStore?.code)}</Text>
          <Text>{x?.used_date ? moment(x?.used_date).format("DD/MM/YYYY") : "-"}</Text>
        </Td>
        <Td halign="center">
          <Text className="mobile-caption">{translate(translation_data, 'expired', langStore?.code)}</Text>
          <Text>{x?.expiry_date ? moment(x?.expiry_date).format("DD/MM/YYYY") : "-"}</Text>
        </Td>
        <Td halign="center">
          <Text className="mobile-caption">{translate(translation_data, 'order_no', langStore?.code)}</Text>
          <Text>{x?.order_number}</Text>
        </Td>
        {/* <Td halign="center">
          <Text className="mobile-caption">{translate(translation_data, 'status', langStore?.code)}</Text>
          <Text>{x?.status}</Text>
        </Td> */}
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
                <Text className="title">{translate(translation_data, 'service_ticket_detail', langStore?.code)}</Text>
                <ServiceDetailSection>
                  <div className="color-wrap">
                    <ul>
                      <li>
                        <span className="color available"></span>
                        <span>{translate(translation_data, 'available', langStore?.code)}</span>
                      </li>
                      <li>
                        <span className="color used"></span>
                        <span>{translate(translation_data, 'used', langStore?.code)}</span>
                      </li>
                      <li>
                        <span className="color expired"></span>
                        <span>{translate(translation_data, 'expired', langStore?.code)}</span>
                      </li>
                    </ul>
                  </div>
                  <Components.TableCom header={headerData} body={tableBody()} />
                </ServiceDetailSection>
              </Profile>
              <Link to="/myservice" className="btn-back"><BiArrowBack /> {translate(translation_data, 'back_to_my_service_ticket', langStore?.code)}</Link>
            </Col>
          </Row>
        </Container>
      </Components.Section>
    </>
  )
}

export default MyServiceDetail
