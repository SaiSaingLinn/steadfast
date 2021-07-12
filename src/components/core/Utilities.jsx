import styled from 'styled-components'
import colors from './../constant/Color'
import { fontSize, fontWeight } from '../constant/FontSize'

const AuthForm = styled.div`
  background: ${colors.white};
  max-width: 570px;
  margin: 50px auto;
  padding: 30px 50px;
  .auth-wrap {
    .title {
      font-size: ${fontSize.xl}px;
      font-weight: ${fontWeight.lg};
      margin-bottom: 15px;
    }
    .sub-title {
      margin-bottom: 20px;
      a {
        color: ${colors.secondary};
      }
    }
    .footer-btn {
      margin-top: 20px;
      text-align: center;
      .btn {
        min-width: 210px;
      }
    }
    .fb-btn {
      .btn {
        background: #3B5998;
        text-transform: none;
        border-color: transparent;
        svg {
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
        &:hover {
          color: #3B5998;
        }
      }
    }
    .forget-btn {
      .btn {
        text-transform: none;
        text-decoration: none;
        color: #707070;
        &:hover {
          color: ${colors.secondary};
        }
      }
    }
    .divider {
      position: relative;
      text-align: center;
      margin-top: 20px;
      span {
        &::after, &::before {
          content: '';
          width: 30%;
          height: 1px;
          background: ${colors.light};
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
        &::before {
          left: 60px;
        }
        &:after {
          right: 60px;
        }
      }
    }
  }
`

const CopyrightStyled = styled.p`
  color: ${colors.muted};
  font-size: ${fontSize.sm}px;
  font-weight: ${fontWeight.md};
  margin: 0;
  text-align: center;
  padding-top: 25px;
  padding-bottom: 25px;
  a {
    color: ${colors.white};
    text-decoration: none;
  }
`

const Quantity = styled.div`
  .quantity-wrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 30px;
    > * {
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
    .quantity-input-gp {
      width: 130px;
      input {
        min-height: 43px;
      }
    }
    .arrow-btn {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 10px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;

      svg {
        cursor: pointer;
        color: #999999;
        transform: translateY(10px);
      }
    }
  }
`

const Image = styled.img`
  width: 100%;
`

const RTEContent = styled.div`
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    margin-bottom: .5rem;
    font-weight: 800;
  }
  h1 {
    font-size: 2.5rem;
  }
  h2 {
    font-size: 2rem;
  }
  h3 {
    font-size: 1.75rem;
  }
  h4 {
    font-size: 1.5rem;
  }
  h5 {
    font-size: 1.25rem;
  }
  h6 {
    font-size: 1rem;
  }
  ul {
    list-style: none;
    margin-top: 0;
    margin-bottom: 0;
    
    li {
      padding-left: 20px;
      position: relative;
    }
  }
  iframe {
    width: 100%;
    height: 400px;
  }
`

const Copyright = ({ data }) => (
  <CopyrightStyled>
    Copyright © {new Date().getFullYear()} {data} . All right reserved. Powered by
    <a href="https://www.innovixdigital.com/" style={{ marginLeft: 5 }} target="_blank" rel="noreferrer">
      Innovix Digital.
    </a>
  </CopyrightStyled>
)


export {
  AuthForm,
  Quantity,
  Image,
  RTEContent,
  Copyright,
}