import styled from 'styled-components'
import { rgba } from 'polished'
import Components, { fontSize, fontWeight } from '../../../components'
import colors from '../../../components/constant/Color'
import media from '../../../components/constant/Media'
import CustomPlaceholder from '../../../components/fakeimg'

const ServiceTicketSection = styled(Components.Section)`
  .service-ticket-wrap {
    text-align: center;
    color: ${colors.primary};
    margin-bottom: 40px;
    .service-title {
      font-size: 24px;
      margin-bottom: 10px;
      @media screen and (min-width: ${media.md}px) {
        font-size: 30px;
        margin-bottom: 30px;
      }
    }
    .service-desc {
      font-size: 18px;
    }
  }

  // detail style
  .detail-content {
    margin-top: 20px;
    @media screen and (min-width: ${media.md}px) {
      margin-top: 0px;
    }
    .desc {
      margin-bottom: 20px;
      h5 {
        font-size: 18px;
        font-weight: ${fontWeight.lg};
        margin-bottom: 15px;
        @media screen and (min-width: ${media.lg}px) {
          margin-bottom: 20px;
          font-size: ${fontSize.xxl}px;
        }
      }
    }
    .price {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      margin-bottom: 20px;
      label,
      del,
      span {
        font-size: 16px;
        font-weight: ${fontWeight.lg};
        margin-right: 10px;
        @media screen and (min-width: ${media.lg}px) {
          font-size: ${fontSize.xl}px;
        }
      }
      del {
        color: #707070;
        font-size: 16px;
      }
    }
  }

  // checkout
  .d-flex {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    &.center {
      justify-content: center;
    }
    @media screen and (min-width: ${media.md}px) {
      flex-direction: row;
    }
  }
  .checkout-wrap {
    background: ${colors.white};
    padding: 20px;
    .custom-check.agree {
      font-size: 13px;
      @media screen and (min-width: ${media.md}px) {
        font-size: 16px;
        margin-bottom: 30px;
      }
    }
    .form-title {
      margin-bottom: 20px;
      h5 {
        font-size: ${fontSize.lg - 2}px;
        font-weight: ${fontWeight.lg};
      }
      .login-btn {
        text-decoration: none;
        color: ${colors.primary};
        padding: 5px 20px;
        background-color: ${colors.light};
        border-radius: .2rem;
        box-shadow: ${rgba(colors.primary, .03)} 0px 2px 5px 0px, ${rgba(colors.primary, .01)} 0px 2px 10px 0px;
        &:hover {
          color: ${colors.light};
        }
      }
    }
  }

  .checkout-detail {
    background: ${colors.white};
    padding: 20px;
    margin-bottom: 30px;
    &:last-child {
      margin-bottom: 0;
    }
    .btn-wrap {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 0 30px;
      .btn {
        margin: 0;
      }
      .btn-back {
        border: 0 none;
      }
    }
    .info-wrap {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
      @media screen and (min-width: ${media.lg}px) {
        flex-direction: row;
      }
      .detail-info {
        width: 100%;
      }
    }
    .detail-wrap {
      margin-bottom: 15px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    label {
      display: inline-block;
      width: 130px;
      color: ${colors.text};
    }
    span {
      color: ${colors.text};
    }
    .detail-img {
      width: 100%;
      margin-right: 0;
      margin-bottom: 15px;
      @media screen and (min-width: ${media.lg}px) {
        width: 270px;
        margin-right: 20px;
        margin-bottom: 0;
      }
    }
    .detail-content {
      > * {
        margin-bottom: 15px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .title {
        font-size: 18px;
        font-weight: bold;
      }
    }
    .payment {
      padding: 30px;
      margin-bottom: 30px;
      background: ${colors.white};
      .title {
        margin-bottom: 15px;
        font-size: 18px;
        color: ${colors.primary};
      }
    }
    .paywith {
      .item-wrap {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        width: 100%;
        flex-direction: column;
        flex-wrap: wrap;
        @media screen and (min-width: ${media.sm}px) {
          flex-direction: row;
        }
        .custom-radio {
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          display: inline-flex;
          border: 1px solid #DDD;
          padding: 20px;
          width: 100%;
          margin-right: 0px;
          margin-bottom: 30px;
          cursor: pointer;
          @media screen and (min-width: ${media.sm}px) {
            margin-bottom: 15px;
            width: 100%;
            padding: 0;
            padding-top: 10px;
            min-height: 110px;
          }
          &:last-child {
            margin-right: 0;
          }
          label {
            padding: 30px;
            padding-bottom: 0px;
            text-transform: capitalize;
            text-align: center;
            width: 100%;
            &:before, &:after {
              left: 50% !important;
              transform: translate3d(-50%, 0, 0);
            }
            &:before {
              top: 8px;
            }
            &:after {
              top: 5px;
            }
          }
          .icon-container {
            margin-top: 10px;
            margin-top: 10px;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            flex-wrap: wrap;
            padding-right: 10px;
            padding-left: 10px;
            margin-bottom: 10px;
            .icon-wrap {
              margin-right: 5px;
              &:last-child {
                margin-right: 0;
              }
              img {
                width: 40px;
              }
            }
          }
        }
      }
    }
  }
`
const ServiceCard = styled.div`
  a {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 30px;
    text-decoration: none;
    box-shadow: ${rgba(colors.primary, .03)} 0px 2px 5px 0px, ${rgba(colors.primary, .01)} 0px 2px 10px 0px;
    transition: box-shadow .3s ease;
    @media screen and (min-width: ${media.md}px) {
      flex-direction: row;
    }
    &:hover {
      box-shadow: ${rgba(colors.primary, .1)} 0px 4px 8px 0px, ${rgba(colors.primary, .1)} 0px 4px 8px 0px;
    }
    .card-img {
      width: 100%;
      @media screen and (min-width: ${media.md}px) {
        width: 200px;
      }
    }
    .card-content {
      width: 100%;
      height: 200px;
      padding: 10px;
      background: #EEEEEE;
      @media screen and (min-width: ${media.md}px) {
        width: 340px;
        padding: 20px 30px;
      }
      h5 {
        color: ${colors.primary};
        font-size: ${fontSize.lg - 2}px;
        font-weight: 500;
        margin-bottom: 10px;
        @media screen and (min-width: ${media.md}px) {
          font-size: ${fontSize.xl}px;
        }
      }
    }
  }
`
const BgImageStyled = styled.div`
  background: url("${props => props?.data && props.data}") no-repeat center / cover;
  width: 100%;
  height: 100%;
`
const settings = {
  ticketSettings: {
    width: 200,
    height: 200,
    backgroundColor: colors.light,
    text: '250 x 250',
    opacity: 0,
  },
  checkoutSettings: {
    width: 270,
    height: 180,
    backgroundColor: colors.light,
    text: '270 x 180',
    opacity: 0
  }
}

const ServiceBgImage = ({ data, section_bg, checkout, ...props }) => (
  <BgImageStyled data={data}>
    {!section_bg ?
      checkout ?
      <CustomPlaceholder {...settings.checkoutSettings} />
      :
      <CustomPlaceholder {...settings.ticketSettings} />
      : ''
    }
    {props.children}
  </BgImageStyled>
)
export { ServiceTicketSection, ServiceCard, ServiceBgImage }