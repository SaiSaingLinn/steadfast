import styled from 'styled-components'
import { fontSize, fontWeight, Text } from '../../../components'
import colors from './../../../components/constant/Color'
import media from './../../../components/constant/Media'

const FooterWrapper = styled.section`
  background: ${colors.primary};
  .top-footer {
    padding-top: 50px;
    padding-bottom: 50px;
    position: relative;
    .footer-container {
      z-index: 99;
      position: relative;
      .footer-col {
        @media screen and (max-width: 767px) {
          margin-bottom: 15px;
        }
      }
    }
    .overlay {
      background: url(${require("../../../assets/img/footer-bg.png").default}) no-repeat center/cover;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9;
      opacity: .1;
    }
  }
  .logo {
    margin-bottom: 30px;
    img {
      width: 130px;
    }
  }
`

const ContactDiv = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 15px;
  @media screen and (min-width: ${media.md}px) {
  }
  p {
    margin: 0;
    color: ${colors.muted}
  }
  svg {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    color: ${colors.white};
    flex: none;
  }
  a {
    text-decoration: none;
    color: ${colors.muted};
  }
  .contact {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    li {
      margin-right: 5px;
      min-width: 100px;
      &:after {
        content: ',';
      }
      &:last-child {
        &:after {
          content: '';
        }
      }
    }
  }
`

const SocialDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 30px;
  @media screen and (min-width: 768px) {
    justify-content: center;
  }
  a {
    display: block;
    margin-right: 20px;
    background: ${colors.muted};
    border-radius: 50%;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
  svg {
    width: 20px;
    height: 20px;
    color: ${colors.white};
  }
  img {
    width: 20px;
    height: 20px;
  }
`

const Title = styled(Text)`
  font-size: ${fontSize.lg}px;
  margin-bottom: 15px;
  color: ${colors.white};
  @media screen and (min-width: ${media.md}px) {
    margin-bottom: 30px;
  }
`
const List = styled.ul`
  padding: 0;
  padding-left: 15px;
  margin: 0;
  color: ${colors.muted};
  li {
    margin-bottom: 15px;
    font-weight: ${fontWeight.md};
    text-decoration: none;
    cursor: pointer;
    a {
      color: ${colors.muted};
      text-decoration: none;
    }
  }
  &.payment {
    padding: 0;
    list-style: none;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
    li {
      width: 23%;
      margin-right: 5px;
      cursor: auto;
    }
    img {
      width: 40px;
      height: 40px;
    }
  }
`

export { 
  FooterWrapper,
  Title,
  List,
  ContactDiv,
  SocialDiv
}
