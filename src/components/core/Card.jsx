import { rgba } from 'polished'
import styled, { css } from 'styled-components'
import colors from '../constant/Color'
import { Text } from './Text'

const Card = styled.div`
  position: relative;
  box-sizing: border-box;
  box-shadow: 1px 1px 10px ${rgba(colors.dark, 0.15)};
  ${({ radius }) => radius && css`
    border-radius: 5px;
  `}
`
const CardContent = styled(Text)`
  padding: 15px;
`
const CardImg = styled.img`
  width: 100%;
  display: block;
  ${({ top }) => top && css`
    margin-bottom: 15px;
  `}
  ${({ bottom }) => bottom && css`
    margin-top: 15px;
  `}
  ${({ left }) => left && css`
    margin-right: 15px;
  `}
  ${({ right }) => right && css`
    margin-left: 15px;
  `}
`

export { 
  Card, 
  CardContent, 
  CardImg
}