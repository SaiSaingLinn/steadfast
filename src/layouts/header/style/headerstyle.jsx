import styled, { css } from 'styled-components'
import { rgba } from 'polished'
import colors from '../../../components/constant/Color'
import media from '../../../components/constant/Media'
import { fontSize, fontWeight, InputGeneral, General } from '../../../components/constant'

const HeaderDiv = styled.header`
  position: relative;
  width: 100%;
  &:after {
    content: '';
    width: 100%;
    position: absolute;
    bottom: 60px;
  }
  @media screen and (min-width: ${media.xl}px) {
    padding-top: 0;
    padding-bottom: 0;
    .sticky {
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
      ul {
        max-width: 1140px;
        width: 100%;
        margin: 0 auto;
      }
    }
  }
`

const Wrapper = styled.div`
  ${({ primary }) => primary && css`
    background: ${colors.primary};
    position: fixed;
    top: 0;
    left: 100%;
    width: 250px;
    height: 100vh;
    @media screen and (min-width: ${media.lg}px) {
      position: initial;
      height: auto;
      width: 100%;
    }
    .nav-container {
      position: relative;
      display: flex;
      align-item: flex-start;
      justify-content: space-between;
      flex-direction: column;
      @media screen and (min-width: ${media.lg}px) {
        flex-direction: row;
      }
    }
    .nav-item-wrap {
      width: 100%;
      height: 100%;
      padding: 0px;
      margin: 0px;
      list-style: none;
      display: flex;
      flex-direction: column;
      @media screen and (min-width: ${media.lg}px) {
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        flex-direction: row;
        height: auto;
      }
      .mb-category {
        display: block;
        @media screen and (min-width: ${media.lg}px) {
          display: none;
        }
      }
      .nav-item.category {
        text-transform: uppercase;
        background: #222222;
        display: none;
        @media screen and (min-width: ${media.lg}px) {
          display: block;
        }
        .nav-link {
          padding-right: 12px;
          padding-left: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 270px;
          background: transparent;
          border: 0 none;
          text-transform: uppercase;
          cursor: pointer;
          span {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            svg {
              width: 24px;
              height: 24px;
              margin-right: 10px;
            }
          }
        }
      }
      .nav-item {
        .nav-link {
          padding: 20px 0;
          display: block;
          color: ${colors.white};
          text-decoration: none;
          &:hover {
            transition: all .2s;
            color: ${colors.secondary};
          }
        }
        .active {
          color: ${colors.secondary};
        }
      }
    }
  `}

  ${({ secondary }) => secondary && css`
    background: ${colors.white};
    .secondaryNav {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .logo-img {
        img {
          width: auto;
          height: 56px;
          @media screen and (min-width: ${media.lg}px) {
            height: 76px;
          }
        }
      }
      .nav-center {
        display: none;
        position: relative;
        @media screen and (min-width: ${media.lg}px) {
          display: block;
        }
        @media screen and (min-width: ${media.xl}px) {
          min-width: 380px;
        }
        .search-box {
          border-radius: 25px;
          margin-top: 0;
        }
        .search-icon {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          margin: auto;
          width: 62px;
          height: 100%;
          background-color: ${colors.secondary};
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 23px;
          cursor: pointer;
          svg {
            width: 20px;
            height: auto;
            color: ${colors.white}
          }
        }
      }
      .nav-right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-start;
        margin-bottom: 0;
        @media screen and (min-width: ${media.md}px) {
          margin-bottom: 5px;
        }
        .nav-flex {
          font-size: ${fontSize.md}px;
          display: flex;
          align-items: center;
          margin-bottom: 0;
          @media screen and (min-width: ${media.md}px) {
            margin-bottom: 10px;
          }
          svg {
            width: 22px;
            height: 22px;
            margin-right: 10px;
            color: ${colors.muted};
            @media screen and (min-width: ${media.md}px) {
              width: 38px;
              height: 42px;
            }
          }
          .user-icon {
            width: 20px;
            height: 20px;
            @media screen and (min-width: ${media.md}px) {
              width: 28px;
              height: 42px;
            }
          }
          .d-flex {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .user-wrap {
            padding-right: 10px;
            @media screen and (min-width: ${media.md}px) {
              padding-right: 20px;
            }
            .item {
              position: absolute;
              top: -8px;
              right: 8px;
              font-size: 10px;
              width: 13px;
              height: 13px;
              background: ${colors.secondary};
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              color: ${colors.white};
              @media screen and (min-width: ${media.md}px) {
                display: none;
              }
            }
            .user-info {
              display: none;
              @media screen and (min-width: ${media.md}px) {
                display: block;
              }
            }
            .user-name {
              margin: 0;
              max-width: 100px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
            span {
              line-height: 20px;
              svg {
                top: 0;
                width: 15px;
                height: 15px;
              }        
            }
            span.title {
              max-width: 165px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              display: block;
            }
            ul {
              &.register-ul {
                list-style: none;
                padding: 0;
                margin: 0;
                display: flex;
                li {
                  cursor: pointer;
                  margin-right: 5px;
                  &:after {
                    content: '/';
                  }
                  &:last-child {
                    margin-right: 0;
                    &:after {
                      display: none;
                    }
                  }
                  a {
                  }
                }
              }
            }
          }
          .cart-wrap {
            cursor: pointer;
            .cart-nav {
              position: relative;
              ${General.flex}
              ~ span {
                display: none;
                @media screen and (min-width: ${media.md}px) {
                  display: block;
                }
              }
              .cart-span {
                position: absolute;
                top: -10px;
                right: 0;
                font-size: ${fontSize.xs - 4}px;
                width: 14px;
                height: 14px;
                border: ${InputGeneral.border} ${colors.primary};
                border-radius: 50%;
                background-color: ${colors.primary};
                ${General.flex}
              }
            }
          }
        }
      }
    }
  `}
`

const MenuDropdown = styled.div`
  cursor: pointer;
  display: inline-block;
  position: relative;
  .d-flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  a,
  p {
    display: block;
    text-decoration: none;
    transition: border .2s ease;
    border-bottom: 2px solid transparent;
    position: relative;
    span.title {
      color: ${colors.primary};
      font-size: 17px;
      font-weight: ${fontWeight.lg};
    }
    span.sub {
      color: ${colors.muted};
      font-size: 13px;
      display: inline-block;
      margin-bottom: 5px;
    }
  }
  .drp-wrap {
    width: 200px;
    position: absolute;
    top: 100%;
    right: 0;
    left: initial;
    opacity: 0;
    visibility: hidden;
    transition: all .3s ease-in-out;
    z-index: 99;
    border: ${InputGeneral.border} ${colors.light};
    border-radius: .1rem;
    background-color: ${colors.white};
    box-shadow: 0 2px 5px 0 ${rgba(0,0,0,.01)}, 0 2px 10px 0 ${rgba(0,0,0,.05)};
    transform: translateY(10px);
    .drp-ul {
      display: block;
      padding: 0;
      margin: 0;
      li {
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        transition: background .3s ease;
        position: relative;
        &:after {
          content: "";
          position: absolute;
          background: ${colors.light};
          width: calc(100% - 40px);
          height: 1px;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
        &:last-child {
          &:after {
            display: none;
          }
        }
        a {
          display: block;
          width: 100%;
          font-size: ${fontSize.md}px;
          border-bottom: 0;
          padding-bottom: 0;
          padding: 15px 20px;
          color: ${colors.primary};
          &:hover {
            color: ${colors.secondary};
          }
        }
      }
    }
  }
  &.language {
    position: relative;
    width: 120px;
    margin-left: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    @media screen and (min-width: ${media.lg}px) {
      margin-left: 30px;
    }
    .drp-wrap {
      right: initial;
      left: 0;
      @media scr9een and (min-width: ${media.lg}px) {
        right: 0;
        left: initial;
      }
    }
    .selected-lang {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: ${colors.white};
      border: 1px solid ${colors.white};
      padding: 5px;
      img {
        width: 25px;
        height: 15px;
        margin-right: 5px;
      }
    }
    .lang-list {
      li {
        padding: 20px;
        &:hover {
          color: ${colors.secondary};
        }
        img {
          width: 25px;
          height: 15px;
          margin-right: 5px;
        }
      }
    }
  }

  &:hover {
    .drp-wrap {
      opacity: 1;
      visibility: visible;
      z-index: 99;
      transform: translateY(0);
    }
  }
`
const MegaMenu = styled.div`
  position: absolute;
  top: 64px;
  left: 0;
  width: 100%;
  max-height: 500px;
  z-index: 9;
  opacity: 0;
  visibility: hidden;
  transition: all .2s;
  &.show {
    opacity: 1;
    visibility: visible;
  }
  &.hide {
    opacity: 0;
    visibility: hidden;
    .mega-wrap {
      .mega-item {
        .category {
          .category-list {
            &.active {
              .subcategory-wrap {
                opacity: 0;
                visibility: hidden;
              }
            }
          }
        }
      }
    }
  }
  .mega-wrap {
    margin: 0 15px;
    box-shadow: 0px 3px 6px #00000029;
    background: ${colors.white};
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .mega-item {
      width: 100%;
      position: relative;
      .category {
        padding: 10px 0;
        margin: 0;
        list-style: none;
        flex: none;
        width: 270px;
        height: 412px;
        overflow-y: auto;
        .category-list {
          .btn-category {
            border: 0 none;
            background: transparent;
            color: ${colors.muted};
            margin: 0;
            text-transform: none;
            text-decoration: none;
            padding: 10px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            transition: color .3s ease;
            width: 100%;
            &:hover {
              color: ${colors.secondary};
            }
          }
          &.active {
            .btn-category {
              color: ${colors.secondary};
            }
            .subcategory-wrap {
              visibility: visible;
              opacity: 1;
            }
          }
          .subcategory-wrap {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            position: absolute;
            left: 270px;
            top: 0;
            width: calc(100% - 270px);
            height: 100%;
            visibility: hidden;
            opacity: 0;
            transition: all .2s;
            padding: 10px;
            &::after {
              content: "";
              width: 3px;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              background: #00000015;
            }
            .subcategory {
              margin: 0;
              padding: 0;
              list-style: none;
              width: 75%;
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              flex-wrap: wrap;
              max-height: 412px;
              overflow-y: auto;
              .subcategory-list {
                width: 50%;
                .item-link {
                  text-transform: none;
                  text-decoration: none;
                  padding: 10px 20px;
                  display: block;
                  color: ${colors.muted};
                  transition: all .2s;
                  &:hover {
                    color: ${colors.secondary};
                  }
                }
              }
            }
            .mega-img {
              width: 25%;
              margin: 10px 20px;
              img {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
`

const OpenBurger = styled.div`
  &.burger-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 9;
    opacity: 0;
    transform: opacity .3s ease-in-out 0s,transform 0s ease-in-out .3s;
    transform: translate3d(100%,0,0);
    background-color: ${rgba(colors.primary, .6)};

    &.open-wrap {
      opacity: 1;
      transition: opacity .3s ease-in-out 0s!important;
      transform: translateZ(0)!important;
    }
  }
`

const MenuIcon = styled.div`
  &.menu-btn {
    width: 35px;
    height: 35px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all .2s ease-in-out;
    z-index: 9999;
    margin-left: 20px;
    @media screen and (min-width: ${media.lg}px) {
      display: none;
      margin-left: 0;
    }
    .menu-icon {
      width: 30px;
      height: 3px;
      background: ${colors.primary};
      border-radius: 5px;
      transition: all .2s ease-in-out;
      &:before,
      &:after {
        content: '';
        position: absolute;
        right: 0;
        width: 25px;
        height: 3px;
        background: ${colors.primary};
        border-radius: 5px;
        transition: all .2s ease-in-out;
      }

      &:before {
        transform: translateY(-8px);
      }

      &:after {
        transform: translateY(8px);
      }
    }
  }
`

export {
  Wrapper,
  MenuDropdown,
  MegaMenu,
  HeaderDiv,
  OpenBurger,
  MenuIcon
}