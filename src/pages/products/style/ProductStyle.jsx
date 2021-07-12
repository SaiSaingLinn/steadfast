import styled from 'styled-components'
import colors from '../../../components/constant/Color'
import media from '../../../components/constant/Media'
import Components from '../../../components'

const DetailSection = styled(Components.Section)`
  background:#F9F9F9;
  padding-top: 10px;
  padding-bottom: 10px;
  @media screen and (min-width: ${media.md}px) {
    padding-top: 20px;
    padding-bottom: 20px; 
  }
  h5 {
    font-size: 18px;
    margin-bottom: 15px;
    @media screen and (min-width: ${media.md}px) {
      font-size: 24px;
      margin-bottom: 30px; 
    }
  }

  .price-wrap {
    margin-bottom: 30px;
    > * {
      margin-right: 13px;
      &:first-child {
        font-size: 18px;
        margin-bottom: 15px;
        color: ${colors.secondary};
        @media screen and (min-width: ${media.md}px) {
          font-size: 24px;
          margin-bottom: 30px;
        }
      }
      &:last-child {
        margin-right: 0;
      }
    }
    del {
      color: ${colors.muted};
    }
  }

  .spec-wrap {
    margin-bottom: 30px;
    div {
      display: flex;
      align-item: flex-start;
      justify-content: flex-start;
      margin-bottom: 20px;
      > * {
        padding-right: 10px;
      }
      > {
        label {
          position: relative;
          min-width: 180px;
          display: inline-block;
          &:after {
            content: ':';
            position: absolute;
            right: 7px;
          }
        }
      }
    }
  }

  .wishlist-container {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    .icon-wrap {
      cursor: pointer;
      color: ${colors.secondary};
      border: 1px solid ${colors.secondary};
      border-radius: 50%;
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      svg {
        width: 18px;
        height: 18px;
      }
    }
  }

  .desc-wrap {
    margin-bottom: 30px;
  }
`

const ShoppingCartSection = styled.section`
  background: ${colors.bgGray};
  padding-top: 50px;
  padding-bottom: 50px;
  .custom-check.agree {
    font-size: 13px;
    @media screen and (min-width: ${media.md}px) {
      font-size: 16px;
      margin-bottom: 30px;
    }
  }
  .custom-check {
    label {
      padding-top: 3px;
      overflow: visible;
      text-transform: none;
    }
  }
  .product-table-container{
    margin-bottom: 40px;
    padding: 10px 20px;
    background: ${colors.white};
  }
  .shopping-cart {
    tbody {
      tr {
        td {
          &:last-child {
            text-align: right;
            min-width: auto;
          }
          &:nth-last-child(2) {
            text-align: right;
          }
        }
      }
      tr.total {
        td {
          &:last-child {
            text-align: right;
          }
        }
      }
    }
  }
  .quantity-wrap {
    justify-content: center;
    margin-bottom: 0;
  }
  .shipping-form {
    margin-bottom: 30px;
    padding: 30px;
    background: ${colors.white};
    .shipping-title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
  }
  .footer-btn-con{
    display: flex;
    justify-content: flex-end;
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
        flex-direction: column;
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
`

export {
  DetailSection,
  ShoppingCartSection
}



