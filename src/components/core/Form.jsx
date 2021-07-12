
import styled, { css } from 'styled-components'
import { fontSize, fontWeight, InputGeneral, General } from '../constant'
import colors from './../constant/Color'

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 25px;
  .ph-wrap {
    position: relative;
  }
  &:last-child {
    margin-bottom: 0;
  }
  .select-date-field {
    > * {
      display: flex;
    }
    &.has-error {
      border: 1px solid ${colors.secondary};
      p {
        position: absolute;
        color: ${colors.secondary};
        font-size: ${fontSize.sm}px;
        display: inline-block;
        margin: 0;
        line-height: 20px;
      }
    }
    select {
      display: block;
      width: 100%;
      height: 40px;
      padding: ${InputGeneral.padding};
      font-size: ${fontSize.md}px;
      font-weight: ${fontWeight.md};
      line-height: 1.5;
      color: ${colors.inputColor};
      background-color: ${colors.white};
      background-clip: padding-box;
      border: ${InputGeneral.border} ${colors.whisper};
      transition: ${InputGeneral.transition};
      outline: 0;
      margin: 0;
    }
    &.error {
      border: 1px solid ${colors.secondary};
      p {
        display: none;
      }
    }
  }
  .react-datepicker-popper {
    z-index: 9;
  }
  .react-datepicker-wrapper {
    width: 100%;
    .datepicker {
      display: block;
      width: 100%;
      height: 40px;
      padding: ${InputGeneral.padding};
      font-size: ${fontSize.md}px;
      font-weight: ${fontWeight.md};
      line-height: 1.5;
      color: ${colors.inputColor};
      background-color: ${colors.white};
      background-clip: padding-box;
      border: ${InputGeneral.border} ${colors.whisper};
      transition: ${InputGeneral.transition};
      outline: 0;
      margin-top: 3px;
      &:disabled {
        background: ${colors.smoke};
      }
      &.error {
        border: 1px solid ${colors.secondary};
      }
      
      &:focus {
        border-color: ${colors.inputBorder}
      }

      &::placeholder {
        opacity: .3;
        font-weight: 400;
      }
    }
  }
  &.custom-check {
    display: flex;
    align-items: center;
    input {
      opacity: 0;
      position: absolute;

      &[type='checkbox'] {
        &:checked {
          +label {
            &:before {
              background-color: ${colors.white};
            }
            &:after {
              opacity: 1;
            }
          }
        }

        &:not(:checked) {
          +label {
            &:before {
              background-color: ${colors.white};
            }
            &:after {
              opacity: 0;
            }
          }
        }
      }
    }

    label {
      ${InputGeneral.checkLabel}

      &:before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        left: 0;
        border: 1px solid ${colors.light};
        border-radius: 0;
        width: 15px;
        height: 15px;
      }

      &:after {
        content: '';
        position: absolute;
        top: 0px;
        bottom: 3px;
        margin: auto;
        left: 5px;
        width: 5px;
        height: 9px;
        border: 1px solid ${colors.secondary};
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }
  }
  &.custom-radio {
    display: flex;
    align-items: center;
    input {
      opacity: 0;
      position: absolute;

      &[type='radio'] {
        &:checked {
          +label {
            &:before {
              opacity: 1;
            }
          }
        }

        &:not(:checked) {
          +label {
            &:before {
              opacity: 0;
            }
          }
        }
      }
    }

    label {
      ${InputGeneral.checkLabel}

      &:before,
      &:after {
        content: '';
        display: block;
        border-radius: 15px;
        position: absolute;
        transition: all 0.3s ease;
      }

      &:before {
        width: 9px;
        height: 9px;
        background: ${colors.secondary};
        top: 8px;
        left: 3px;
      }

      &:after {
        width: 15px;
        height: 15px;
        border: 1px solid ${colors.secondary};
        left: 0;
        top: 5px;
      }
    }
  }
  svg.select-icon {
    position: absolute;
    right: 15px;
    top: 0;
    bottom: -22px;
    margin: auto 0;
  }
`

const Input = styled.input`
  display: block;
  width: 100%;
  height: 40px;
  padding: ${InputGeneral.padding};
  font-size: ${fontSize.md}px;
  font-weight: ${fontWeight.md};
  line-height: 1.5;
  color: ${colors.inputColor};
  background-color: ${colors.white};
  background-clip: padding-box;
  border: ${InputGeneral.border} ${colors.whisper};
  transition: ${InputGeneral.transition};
  outline: 0;
  margin-top: 3px;
  &:disabled {
    background: ${colors.smoke};
  }
  &.error {
    border: 1px solid ${colors.secondary};
  }
  
  &:focus {
    border-color: ${colors.inputBorder}
  }

  &::placeholder {
    opacity: .3;
    font-weight: 400;
  }

  &.phone {
    padding-left: 45px;
  }

  ${({ phone }) => phone && css`
    padding-left: 45px;
  `}

  ${({ select }) => select && css`
    position: relative;
    appearance: none;
  `}

  ${({ textarea }) => textarea && css`
    min-height: ${props => props.rows}px;
    font-family: ${General.fontFamily};
  `}

  ${({ checkbox }) => checkbox && css`
    height: 25px;
  `}

  ${({ radio }) => radio && css`
    height: 25px;
  `}
  
  ${({ search }) => search && css`
    width: 100%;
  `}
`

const Label = styled.label`
  max-width: 100%;
  color: ${colors.label};
  font-size: ${fontSize.md}px;
  font-weight: ${fontWeight.md};
  white-space: wrap;
  overflow: hidden;
  margin-bottom: 5px;
`

const Span = styled.span`
  position: absolute;
  top: 18.5px;
  transform: translateY(13px);
  margin: auto 0;
  ${({ InputPhone }) => InputPhone && css`
    color: ${colors.inputColor};
    font-size: ${fontSize.md}px;
    font-weight: ${fontWeight.md};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 15px;
    top: 48%;
    transform: translateY(-48%);
    &:before {
      content: '+95';
    }
  `}
`

const ErrorMessage = styled.span`
  position: absolute;
  color: ${colors.secondary};
  font-size: ${fontSize.sm}px;
  display: inline-block;
  /* margin-left: 15px; */
  line-height: 20px;
`

const Error = styled.p`
  color: ${colors.secondary};
  font-size: ${fontSize.mdm}px;
  margin: 0;
`

const StyledCheckBox = styled.div`
  &.custom-check {
    display: flex;
    align-items: center;
    input {
      opacity: 0;
      position: absolute;

      &[type='checkbox'] {
        &:checked {
          +label {
            &:before {
              background-color: ${colors.primary};
            }
            &:after {
              opacity: 1;
            }
          }
        }

        &:not(:checked) {
          +label {
            &:before {
              background-color: ${colors.white};
            }
            &:after {
              opacity: 0;
            }
          }
        }
      }
    }

    label {
      ${InputGeneral.checkLabel}

      &:before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        left: 0;
        border: 1px solid ${colors.primary};
        border-radius: .15rem;
        width: 15px;
        height: 15px;
      }

      &:after {
        content: '';
        position: absolute;
        top: -3px;
        bottom: 0;
        margin: auto;
        left: 5px;
        width: 5px;
        height: 10px;
        border: 1px solid ${colors.white};
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }
  }
`

export { 
  InputGroup, 
  Input, 
  Label, 
  Span, 
  Error, 
  ErrorMessage, 
  StyledCheckBox
}
