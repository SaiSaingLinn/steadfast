import styled, { css } from 'styled-components'
import { fontSize, fontWeight } from '../constant/FontSize'
import colors from '../constant/Color'
import media from '../../components/constant/Media'

const Color = styled.p`
  color: ${colors.dark};
  ${({ color }) => color && css`
    color: ${colors[color]};
  `}
  ${({ bg }) => bg && css`
    background: ${colors[bg]};
  `}
`

const Text = styled(Color)`
  font-size: ${fontSize.md}px;
  font-weight: ${fontWeight.md};
  line-height: ${fontSize.md * 1.618}px;
  margin: 0;
  ${({ size }) => size && css`
    font-size: ${fontSize[size]}px;
    line-height: ${fontSize[size] * 1.618}px;
  `}
  ${({ cu_size }) => cu_size && css`
    font-size: ${cu_size}px;
  `}
  ${({ cu_weight }) => cu_weight && css`
    font-weight: ${cu_weight};
  `}
  ${({ weight }) => weight && css`
    font-weight: ${fontWeight[weight]};
  `}
`

const View = styled(Text)`
  position: relative;
`

const Title = styled(Text)`
  text-align: center;
  font-size: 26px;
  font-weight: ${fontWeight.lg};
  text-transform: uppercase;
  margin-bottom: 30px;
  span {
    color: ${colors.secondary};
  }
  @media screen and (min-width: ${media.md}px) {
    font-size: 36px;
  }
`;

const Desc = styled.p`
  font-size: 18px;
  font-weight: ${fontWeight.md};
  margin: 0;
  text-align: center;
  line-height: 36px;
  margin-bottom: 50px;
  @media screen and (min-width: ${media.md}px) {
    margin-bottom: 80px;
  }
`;

export {
  View,
  Text,
  Title,
  Desc
}