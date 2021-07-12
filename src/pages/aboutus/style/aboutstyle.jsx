import styled from 'styled-components'
import media from '../../../components/constant/Media'

const About = styled.div`
  margin-top: 15px;
  @media screen and (min-width: ${media.sm}px) {
    margin-top: 0;
  }
  .title {
    margin-bottom: 15px;
  }
`

export {
  About
}