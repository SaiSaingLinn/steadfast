import styled from 'styled-components'
import { rgba } from 'polished'
import colors from 'components/constant/Color'
import media from 'components/constant/Media'
import CustomPlaceholder from 'components/fakeimg'
import Arrow from 'assets/img/icons/next-arrow.svg'


const defaultSettings = {
  width: 470,
  height: 530,
  text: '470 x 530'
}

const SliderContainer = styled.div`
  a {
    text-decoration: none;
    display: block;
  }
  .card-wrap {
    &.promo-card{
      box-shadow: 0 0 10px ${rgba(colors.secondary, .1)};
      transition: box-shadow .3s ease;
      cursor: pointer;
      
      &:hover{
        box-shadow: 0 0 10px ${rgba(colors.secondary, .2)};
      }
    }
    
    @media screen and (min-width: ${media.md}px) {
      margin-right: 15px;
      margin-left: 15px;
    }

    .content {
      p {
        &:first-child {
          min-height: 40px;
        }
      }
    }
  }
  img {
    width: 100%;
    &.opacity0 {
      opacity: 0;
    }
  }
  .slick-arrow {
    width: 35px;
    height: 25px;
    background: ${colors.white};
    box-shadow: 0 0 10px ${rgba(colors.secondary, .2)};
    border-radius: 5px;
    z-index: 1;
    top: 50%;

    @media screen and (max-width: ${media.md}px) {
      transform: translate(0, -5%);
    }

    &:hover,
    &:focus,
    &:active {
      background: ${colors.white}
    }
    &:before {
      content: '';
      width: 16px;
      height: 16px;
      display: inline-block;
    }
    &.slick-prev {
      left: -10px;
      @media screen and (min-width: ${media.md}px) {
        left: 0;
      }
      &:before {
        background: url(${Arrow}) no-repeat center / contain;
      }
    }
    &.slick-next {
      right: -10px;
      @media screen and (min-width: ${media.md}px) {
        right: 0;
      }
      &:before {
        background: url(${Arrow}) no-repeat center / contain;
      }
    }
  }

  .slick-dots {
    position: initial;
    li {
      margin: 0;
      button {
        &:before {
          font-size: 11px;
          opacity: 1;
          color: ${colors.light}
        }
      }
      &.slick-active {
        button {
          &:before {
            color: ${colors.secondary}
          }
        }
      }
    }
  }
`


const DetailSlider = styled(SliderContainer)`
  margin-bottom: 30px;
  @media screen and (min-width: ${media.md}px) {
    margin-bottom: 0px;
  }
  .slick-dots {
    li {
      margin: 0;
      button {
        &:before {
          font-size: 11px;
          opacity: 1;
          color: ${colors.light}
        }
      }
      &.slick-active {
        button {
          &:before {
            color: ${colors.secondary}
          }
        }
      }
    }
  }
  .slide-nav {
    * {
      &:focus {
        outline: none;
      }
    }
    .slick-slide {
      padding: 5px;
    }
    .slick-arrow {
      @media screen and (max-width: ${media.md}px) {
        top: 35%;
      }
      &.slick-prev {
        left: -10px;
        @media screen and (min-width: ${media.md}px) {
          left: -15px;
        }
      }
      &.slick-next {
        right: -10px;
        @media screen and (min-width: ${media.md}px) {
          right: -15px;
        }
      }
    }
  }
`

const BackgroundImage = styled.div`
  position: relative;
  background: url("${props => props?.data}") no-repeat center / cover;
  border: 1px solid ${colors.light};
  border-radius: 0px;
  &:focus {
    outline: 0;
  }
  p {
    opacity: 0;
  }
`

const SliderBackground = ({ data }) => {
  return (
    <BackgroundImage data={data}>
      <CustomPlaceholder {...defaultSettings} />
    </BackgroundImage>
  )
}

const NavBgImage = styled.div`
  width: auto;
  height: 79px;
  background: url("${props => props.data}") no-repeat center / cover;
  border: 1px solid ${colors.light};
  border-radius: 0px;
  cursor: pointer;
  transition: all .2s;
  &:focus {
    outline: none;
  }
  &:hover {
    border: 1px solid ${colors.secondary};
  }
`

const NavBackground = ({ data }) => (
  <NavBgImage data={data} />
)

export {
  DetailSlider,
  SliderBackground,
  BackgroundImage,
  NavBackground
}