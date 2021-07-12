
import styled from 'styled-components'
import { InputGeneral } from '../constant'
import { fontSize, fontWeight } from '../constant/FontSize'
import colors from './../constant/Color'
import media from '../constant/Media'

const TableContainer = styled.table`
  width: 100%;
  border: ${InputGeneral.border} ${colors.light};
  font-size: ${fontSize.md}px;
  width: 100%;
  border-collapse: collapse;
  border-style: hidden;
  /* box-shadow: 0 0 0 1px ${colors.light}; */
  overflow: hidden;
  thead {
    display: none;
    @media screen and (min-width: ${media.md}px) {
      display: table-header-group;
    }
  }
`

const Tr = styled.tr`
  border-bottom: ${InputGeneral.border} ${colors.light};
  border: ${InputGeneral.border} ${colors.light};
  border: ${props => props.border};
  td {
    &:first-child {
      text-align: left;
    }
    &:last-child {
      text-align: right;
    }
  }
  td.price {
    min-width: 115px;
  }
  @media screen and (min-width: ${media.md}px) {
    display: table-row;
    /* vertical-align: baseline; */
  }
  &.total {
    border: 1px solid transparent;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    ${'' /* td {
      padding-right: 0;
      padding-left: 0;
      &:first-child {
        padding-left: .75rem;
      }
      @media screen and (min-width: ${media.md}px) {
        padding: .75rem;
      }
    } */}
    @media screen and (min-width: ${media.md}px) {
      display: table-row;
    }
    .title-bold {
      font-size: 18px;
      font-weight: 500;
    }
    .total-title {
      width: 100px;
      text-align: left;
      @media screen and (min-width: ${media.md}px) {
        width: auto;
        text-align: right;
      }
    }
  }
  &.border {
    border-bottom: 1px solid ${colors.light};
  }
`

const Th = styled.td`
  @media screen and (min-width: ${media.md}px) {
    width: ${props => props.width};
  }
  /* vertical-align: ${props => props.valign}; */
  text-align: ${props => props.halign};
  color: ${colors.primary};
  font-weight: ${fontWeight.lg};
  background: ${colors.white};
  padding-top: 15px;
  padding-bottom: 15px;
  padding: .75rem;
  &.d-none {
    @media screen and (max-width: ${media.md - 1}px) {
      display: none;
    }
  }
  .dsk-title {
    display: none;
    @media screen and (min-width: ${media.lg}px) {
      display: block;
    }
  }
  .sp-title {
    display: none;
    @media screen and (max-width: ${media.lg - 1}px) {
      display: block;
    }
  }
`

const Td = styled(Th)`
  font-weight: ${fontWeight.sm};
  background-color: ${colors.white};
  ${'' /* padding-right: 20px; */}
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  @media screen and (min-width: ${media.md}px) {
    display: table-cell;
  }
  &.remove-wrap {
    justify-content: flex-end;
    @media screen and (min-width: ${media.md}px) {
      justify-content: flex-start;
    }
  }
  .remove {
    img {
      display: none;
      @media screen and (min-width: ${media.md}px) {
        display: block;
        width: 20px;
        cursor: pointer;
      }  
    }
    button {
      background: none;
      border: 0 none;
      text-decoration: underline;
      color: ${colors.secondary};
      display: block;
      @media screen and (min-width: ${media.md}px) {
        display: none;
      }
    }
  }
  .mobile-caption {
    display: block;
    width: 120px;
    text-align: left;
    font-weight: 500;
    flex: none;
    margin-right: 10px;
    @media screen and (min-width: ${media.md}px) {
      display: none;
    }
  }
  .address {
    padding: 0;
    margin: 0;
    text-align: left;
    @media screen and (min-width: ${media.md}px) {
      text-align: center;
    }
    span {
      padding-right: 5px;
      display: inline-block;
      border: 0 none;
      &:after {
        content: ','
      }
      &:last-child {
        padding-right: 0;
        &:after {
          content: '.'
        }
      }
    }
  }
  ${'' /* .address {
    font-size: 16px;
    font-weight: 400;
    line-height: 25.888px;
    margin: 0;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: contents;
      text-align: left;
      @media screen and (min-width: ${media.md}px) {
        text-align: center;
      }
      li {
        padding-right: 5px;
        &:after {
          content: ','
        }
        &:last-child {
          padding-right: 0;
          &:after {
            content: '.'
          }
        }
      }
    }
  } */}
  .img-wrap {
    flex-direction: column;
    .order-detail-img {
      margin-right: 10px;
      width: 100px;
    }
    .product-name {
      max-height: 100px;
      overflow: hidden;
      border: 0 none;
    }
    @media screen and (min-width: ${media.md}px) {
      flex-direction: row;
    }
    ${'' /* p {
      text-align: center;
    } */}
    @media screen and (min-width: ${media.md}px) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  &:last-child {
    border-bottom: 0;
  }

  span {
    border-bottom: ${InputGeneral.border} ${colors.light};
    display: inline-block;
  }
`

export { TableContainer, Tr, Th, Td }