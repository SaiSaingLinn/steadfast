import styled from 'styled-components'
import { rgba } from 'polished'
import colors from 'components/constant/Color'
import Arrow from 'assets/img/icons/next-arrow.svg'

// home banner
const BannerSection = styled.div`
  img {
    width: 100%;
  }
  .slick-slider {
    z-index: 1;
    &:hover {
      .slick-arrow {
        opacity: 1;
        visibility: visible;
      }
    }
    .slick-arrow {
      width: 30px;
      height: 30px;
      background-color: ${colors.primary};
      z-index: 1;
      opacity: 1;
      visibility: hidden;
      transition: opacity .3s ease;
      @media screen and (min-width: 768px) {
        opacity: 0;
      }
      &:before {
        content: '';
        width: 15px;
        height: 15px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
      }
      &.slick-prev {
        left: 20px;
        &:before {
          background: url(${Arrow}) no-repeat center / cover;
          transform: rotate(180deg) translateX(-3px);
        }
      }
      &.slick-next {
        &:before {
          transform: translateX(-3px);
        }
      }
      &.slick-arrow {
        right: 20px;
        &:before {
          background: url(${Arrow}) no-repeat center / cover;
        }
      }
    }
  }
  .slick-dots {
    display: flex !important;
    align-items: center;
    justify-content: center;
    bottom: 20px;
    li {
      width: 30px;
      height: 3px;
      background-color: ${rgba(colors.primary, .6)};
      margin: 0;
      margin-right: 10px;
      &.slick-active {
        background-color: ${colors.secondary};
      }
      button {
        &:before {
          display: none;
        }
      }
    }
  }
`

export {
  BannerSection
}