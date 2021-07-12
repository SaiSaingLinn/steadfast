import { createGlobalStyle } from 'styled-components'
import { fontSize, fontWeight, General } from '../constant'
import colors from '../constant/Color'

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
      
  html {
    scroll-behavior: smooth;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    font-size: ${fontSize.md}px;
    font-family: ${General.fontFamily};
    font-weight: ${fontWeight.md};
    color: ${colors.text};
    overflow-x: hidden;
    background: #F9F9F9;
    &.open-drawer {
      transform: translateX(-250px);
      height: 100vh;
      min-height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      overflow-x: initial;
      .menu-btn {
        border: 2px solid ${colors.white} !important;
        border-radius: 50% !important;
        .menu-icon {
          transform: translateX(-50px) !important;
          background: transparent !important;
          &:before,
          &:after {
            right: 6px !important;
            width: 18px !important;
          }
          &:before {
            transform: rotate(45deg) translate(35px, -35px) !important;
            background: ${colors.white} !important;
          }

          &:after {
            transform: rotate(-45deg) translate(35px, 35px) !important;
            background: ${colors.white} !important;
          }
        }
      }
    }
  }
  button {
    font-size: ${fontSize.md}px;
    font-family: inherit;
    outline: none;
    &:focus {
      outline: none;
    }
  }
  button::-moz-focus-inner {
    border: 0;
  }
  a:focus { 
    outline: none; 
  }
  a {
    /* transition: all .2s; */
    &:hover {
      color: ${colors.secondary} !important;
    }
  }
  a {
    &.btn {
      min-width: 130px;
      border: 2px solid ${colors.secondary};
      transition: color .3s ease, background-color .3s ease, opacity .3s ease;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
      z-index: 1;
      cursor: pointer;
      text-transform: uppercase;
      padding: 10px;
      text-decoration: none;
      &:after {
        content: "";
        transition: color .3s ease, background-color .3s ease, opacity .3s ease;
        position: absolute;
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: -1;
      }
    }
    &.btn.btn-default {
      background: ${colors.secondary};
      color: ${colors.white};
      &:after {
        bottom: 100px;
        background: ${colors.white};
      }
      &:hover {
        color: ${colors.secondary};
        &:after {
          bottom: 0;
        }
      }
    }
    &.btn.btn-white {
      background: transparent;
      color: ${colors.secondary};
      &:after {
        bottom: -100px;
        background: ${colors.secondary};
      }
      &:hover {
        border: 2px solid transparent;
        color: ${colors.white} !important;
        &:after {
          bottom: 0px;
        }
      }
    }
    &.btn-gray {
      background: ${colors.light};
      padding: 5px 15px;
      text-transform: capitalize;
      border: 2px solid ${colors.light};
      min-width: auto;
      color: ${colors.primary};
      &:hover {
        opacity: .8;
      }
    }
    &.btn-back {
      margin-top: 30px;
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
      color: ${colors.primary};
      svg {
        margin-right: 5px;
      }
      &:hover {
        color: ${colors.secondary};
      }
    }
    &.btn-link {
      background: transparent;
      border: 2px solid transparent;
      text-decoration: underline;
      color: ${colors.secondary};
    }
  }
`

export { GlobalStyle }