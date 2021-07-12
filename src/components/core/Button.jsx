import styled from 'styled-components'
import colors from '../constant/Color'

const Button = styled.button`
  &.btn {
    min-width: 130px;
    border: 2px solid ${colors.secondary};
    transition: background ease-out .3s;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    z-index: 1;
    cursor: pointer;
    text-transform: uppercase;
    padding: 10px;
  }
  &:after {
    content: "";
    position: absolute;
    left: 0px;
    width: 100%;
    height: 100%;
    transition: all ease-out .3s;
    z-index: -1;
  }
  &.btn-default {
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
  &.btn-white {
    background: transparent;
    color: ${colors.secondary};
    &:after {
      bottom: -100px;
      background: ${colors.secondary};
    }
    &:hover {
      border: 2px solid transparent;
      color: ${colors.white};
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
    &:hover {
      opacity: .8;
      color: ${colors.secondary};
    }
  }
  &.btn-link {
    background: transparent;
    border: 2px solid transparent;
    text-decoration: underline;
    color: ${colors.secondary};
  }
  &.btn-disabled {
    opacity: .5;
    cursor: default;
  }
  &.btn-default.btn-disabled {
    &:hover {
      color: ${colors.white};
    }
    &:after {
      background: ${colors.secondary};
    }
  }
`

export { Button }