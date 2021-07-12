import React from 'react'
import styled from 'styled-components'
import { Text, EmptyCartIcon } from '../core'
import colors from '../constant/Color'

const NoResult = ({ result }) => {
  return (
    <>
      <NotResultFound>
        <div>
          <EmptyCartIcon color={colors.secondary} />
          <Text color="grey" cu_size="16">{result}</Text>
        </div>
      </NotResultFound>
    </>
  )
}

export default NoResult

const NotResultFound = styled.div`
  width: 100%;
  height: auto;
  border-radius: 10px;
  padding: 30px;

  div {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > {
      * {
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    img {
      width: 150px;
      height: 150px;
    }
    .signin {
      color: ${colors.primary};
      border-bottom: 1px solid ${colors.primary};
      margin-left: 5px;
      text-decoration: none;
    }
  }
`

