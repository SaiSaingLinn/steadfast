import React from 'react'
import styled from 'styled-components'
import colors from 'components/constant/Color'
import media from 'components/constant/Media'
import Components from 'components'
import { fontSize, fontWeight, SuccessMsgIcon } from 'components'

const SuccessMsg = props => {
  return (
    <>
      <SuccessSection>
        <Components.Container>
          <div className="success-wrap">
            <SuccessMsgIcon color={colors.primary} background='none' />
            {props.children}
          </div>
        </Components.Container>
      </SuccessSection>
    </>
  )
}

const SuccessSection = styled(Components.Section)`
  .success-wrap {
    width: 100%;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${colors.white};
    margin: 0 auto;
    @media screen and (min-width: ${media.md}px) {
      width: 70%;
    }
    > * {
      margin-bottom: 10px;
      @media screen and (min-width: ${media.md}px) {
        &:nth-child(2) {
          margin-bottom: 20px;
        }
      }
      button {
        margin-top: 10px;
      }
    }
    .alert-msg {
      font-weight: ${fontWeight.lg};
      font-size: ${fontSize.lg - 2}px;
      text-align: center;
    }
    .success-icon {
      background-color: 0;
      border: 0;
    }
  }
  .contact-info {
    label {
      margin-right: 5px;
    }
  }
`

export default SuccessMsg