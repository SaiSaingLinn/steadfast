import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import colors from 'components/constant/Color'
import media from 'components/constant/Media'
import Components from 'components'
import { fontSize, fontWeight } from 'components/constant/FontSize'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { useLocation, Link } from 'react-router-dom'
import { authStore } from 'service'
import { translate } from 'utils'

const ProductOrderSuccess = () => {
  const location = useLocation()
  const { translation_data, langStore } = useSelector(state => state.translation)
  
  return (
    <>
      <SuccessSection>
        <Components.Container>
          <Components.Row>
            <Components.Col>
              <Components.View as="div" className="success-wrap">
                <IoMdCheckmarkCircleOutline />
                <Components.Text color="primary" className="alert-msg">{translate(translation_data, 'order_success', langStore?.code)}</Components.Text>
                {
                  location?.state ?
                  <Components.Text color="primary" className="order-id">{translate(translation_data, 'order_no', langStore?.code)} 
                  {
                    authStore.getAuth() ? 
                    <Link to={`/orderhistory/orderdetail/${location?.state?.order_id}`}>{location?.state?.order_name}</Link> :
                    <span>{location?.state?.order_name}</span>
                  }
                  </Components.Text>
                  :
                  <Components.Text>Order id from 2C2P will come here!</Components.Text>
                }
                <Link to='/' className="btn btn-default">{translate(translation_data, 'continue_shopping', langStore?.code)}</Link>
              </Components.View>
            </Components.Col>
          </Components.Row>
        </Components.Container>
      </SuccessSection>
    </>
  )
}

const SuccessSection = styled(Components.Section)`
  .success-wrap {
    width: 100%;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${colors.white};
    margin: 0 auto;
    @media screen and (min-width: ${media.md}px) {
      width: 70%;
    }
    > * {
      margin-bottom: 10px;
      @media screen and (min-width: ${media.md}px) {
        &:nth-child(2) {
          margin-bottom: 20px;
        }
      }
      button {
        margin-top: 10px;
      }
    }
    svg {
      width: 60px;
      height: 60px;
      margin-bottom: 20px;
      @media screen and (min-width: ${media.md}px) {
        margin-bottom: 30px;
      }
    }
    .alert-msg {
      font-weight: ${fontWeight.lg};
      font-size: ${fontSize.lg - 2}px;
      text-align: center;
    }
    .order-id {
      color: #707070;
      span, a {
        padding-left: 5px;
      }
    }
    .btn {
      margin-top: 10px;
    }
  }
  .contact-info {
    label {
      margin-right: 5px;
    }
  }
`

export default ProductOrderSuccess