import styled from 'styled-components'
import { fontSize, fontWeight } from 'components'
import colors from 'components/constant/Color'
import media from 'components/constant/Media'

const Service = styled.div`
  .d-flex {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .service {
    padding: 30px;
    background: ${colors.white};
    > * {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    h5 {
      font-size: ${fontSize.xl}px;
      font-weight: ${fontWeight.lg};
    }
    .submit-wrap {
      text-align: center;
      margin-top: 20px;
      > * {
        margin-bottom: 15px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .service-type {

    .input-wrap {
      position: relative;    
      margin-bottom: 5px;

      &:last-child {
        margin-bottom: 25px;
      }
    }

    input {
      background-color: ${colors.bgGray};
      border: 0;
    }

    svg {
      position: absolute;
      top: 7px;
      right: 7px;
      width: 25px;
      height: 25px;
      color: #bfbfbf;
      cursor: pointer;
    }
  }
  
  //confirmation
.confirm-content {
  padding: 15px;
  background: ${colors.white};
  width: 100%;
  margin: 0 auto;
  @media screen and (min-width: ${media.lg}px) {
    padding: 50px;
    width: 970px;
  }
  .content-wrap {
    margin-bottom: 10px;
    margin: 0 auto;
    width: 100%;
    @media screen and (min-width: ${media.lg}px) {
      width: 570px;
    }
    .content-item {
      display: flex;
      margin-bottom: 15px;
      @media screen and (min-width: ${media.lg}px) {
        margin-bottom: 20px;
      }
    }
    .payment {
      margin-top: 30px;
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
              content: '';
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
  h5 {
    font-size: ${fontSize.lg}px;
    font-weight: ${fontWeight.lg};
    text-align: center;
    margin-bottom: 30px;
    @media screen and (min-width: ${media.lg}px) {
      font-size: ${fontSize.xl}px;
      margin-bottom: 50px;
    }
  }
  label,
  span {
    position: relative;
    display: inline-block;
    &:not(span) {
      width: 150px;
      padding-right: 15px;
      @media screen and (min-width: ${media.lg}px) {
        width: 250px;
      }
      &:after {
        content: ':';
        position: absolute;
        top: 0;
        right: 10px;
      }
    }
    &:not(label) {
      width: 195px;
      padding-left: 5px;
      font-weight: ${fontWeight.lg};
      @media screen and (min-width: ${media.lg}px) {
        width: 420px;
        padding-left: 20px;
      }
    }

    &.value { // modified class
      display: flex;
      flex-wrap: wrap;
      span {
        width: auto;
        padding-left: 0;
        padding-right: 10px;
      }
    }
  }
  .submit-wrap {
    text-align: center;
    margin-top: 30px;
    > * {
      margin-bottom: 15px;
      margin-right: 15px;
      &:last-child {
        margin-bottom: 0;
        margin-right: 0;
      }
    }
    .btn {
      min-width: 130px;
      padding: 10px;
      span {
        width: auto;
        padding: 0;
      }
    }
  }
}

  // upload file
  .upload-file {
    position: relative;
    width: 200px;
    height: 90px;
    color: ${colors.muted};
    border: 1px dashed ${colors.muted};
    background-color: ${colors.whisper};
    margin-bottom: 15px;

    input {
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1;
    }

    .upload-attachment {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      svg {
        width: 30px;
        height: 30px;
      }
    }
  }

  .attachment-file {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;

    div {
      position: relative;

      svg {
        position: absolute;
        top: 0;
        right: 5px;
        width: 16px;
        height: 16px;
        cursor: pointer;
      }
    }
  }
`

export { Service }