import styled from 'styled-components'
import colors from '../../constant/Color'

const imgUrl = {
  leftArrow: require('../../../assets/icons/left-arrow.svg').default,
  rightArrow: require('../../../assets/icons/right-arrow.svg').default
}

const PaginationWapper = styled.div`
  margin: 20px 0;
  .rc-pagination {
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    li {
      cursor: pointer;
      &:focus {
        outline: none;
      }
      a, button {
        text-decoration: none;
        position: relative;
        display: block;
        padding: .5rem;
        margin: 0 3px;
        line-height: 1.25;
        background-color: transparent;
        border: 1px solid ${colors.whisper};
        color: ${colors.grey};
        font-weight: 500;
        transition: all .2s;
        border-radius: 5px;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover {
          background-color: ${colors.secondary};
          color: ${colors.white} !important;
        }
      }
      &.rc-pagination-disabled {
        a, button {
          background-color: transparent;
          cursor: default;
        }
      }
      button {
        &:focus {
          outline: none;
        }
        &:before {
          content: '';
          width: 12px;
          height: 12px;
          display: inline-block;
        }
      }
      &.rc-pagination-item-active {
        a {
          background: ${colors.secondary};
          color: ${colors.white};
          &:hover {
            color: ${colors.white} !important;
          }
        }
      }
      &.rc-pagination-prev {
        button {
          margin: 0;
          margin-right: 3px;
          border-radius: 10px;
          &:before {                        
            background: url(${imgUrl.leftArrow}) no-repeat center/cover;
          }
          &:hover {
            &:before {                        
              background: url(${imgUrl.leftArrow}) no-repeat center/cover;
            }
          }
        }
      }
      &.rc-pagination-prev.rc-pagination-disabled {
        button {
          &:hover {
            &:before {                        
              background: url(${imgUrl.leftArrow}) no-repeat center/cover;
            }
          }
          &:before {
            opacity: .4;
          }
        }
      }
      &.rc-pagination-next.rc-pagination-disabled {
        button {
          &:hover {
            &:before {                        
              background: url(${imgUrl.rightArrow}) no-repeat center/cover;
              opacity: .5;
            }
          }
          &:before {
            opacity: .4;
          }
        }
      }
      &.rc-pagination-next {
        button {
          border-radius: 10px;
          margin: 0;
          margin-left: 3px;
          &:before {
            background: url(${imgUrl.rightArrow}) no-repeat center/cover;
          }
          &:hover {
            &:before {                        
              background: url(${imgUrl.rightArrow}) no-repeat center/cover;
            }
          }
        }
      }
      &.rc-pagination-jump-prev, &.rc-pagination-jump-next {
        button {
          &:before {
            content: '...';
          }
        }
      }
    }
  }
`

export {
  PaginationWapper
}