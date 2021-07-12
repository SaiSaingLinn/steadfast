import styled from 'styled-components'
import media from '../../../components/constant/Media'
import colors from '../../../components/constant/Color'
import { fontSize, fontWeight } from '../../../components/constant'

const Contact = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  background: ${colors.white};
  position: relative;
  flex-direction: column;
  margin-bottom: 50px;
  &:after {
    display: none;
  }
  @media screen and (min-width: ${media.md}px) {
    flex-direction: row;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 50%;
      height: 100%;
      width: 1px;
      background: #EEE;
    }
  }
  .contact-wrap {
    width: 100%;
    padding: 30px;
    @media screen and (min-width: ${media.md}px) {
      width: 50%;
    }
    .title {
      font-size: ${fontSize.xl}px;
      font-weight: ${fontWeight.lg};
      margin-bottom: 15px;
    }
    .footer-btn-con {
      margin-top: 20px;
    }
    .address-wrap {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-top: 40px;
      .icon {
        width: 100px;
        height: 100px;
        background: #F5F5F5;
        border-radius: 50%;
        margin-right: 20px;
        flex: none;
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
          width: 40px;
          height: 40px;
          color: ${colors.secondary};
        }
      }
      .info {
        ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          flex-direction: column;
          @media screen and (min-width: ${media.md}px) {
            flex-direction: row;
          }
          li {
            margin-right: 5px;
            &:after {
              content: ',';
            }
            &:last-child {
              &::after {
                display: none;
              }
            }
            a {
              color: ${colors.text};
              text-decoration: none;
              &:hover {
                color: ${colors.secondary};
              }
            }
          }
        }
      }
    }
  }
`

export {
  Contact
}