import styled from 'styled-components'
import loadingImg from '../assets/img/loading.gif'

const PageLoading = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 30px;
  }
  p {
    font-size: 12px;
  }
`

// const SubmittingLoading = styled.div`
//   display: flex;
//   justify-content: center;

//   .dot {
//     width: 5px;
//     height: 5px;
//     border-radius: 50%;
//     background-color: ${colors.white};
//     animation: 1s bounce infinite alternate;
//     margin-right: 6px;

//     &:last-child {
//       margin-right: 0;
//     }

//     &:nth-child(2) {
//       animation-delay: .3s;
//     }

//     &:nth-child(3) {
//       animation-delay: .6s;
//     }
//   }

//   @keyframes bounce { // bounce
//     to {
//       opacity: .3;
//       transform: translate3d(0, -4px, 0);
//     }
//   }
// `

const Spinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    border-radius: 50%;
    animation: spinner 1s linear infinite;
    margin: 0 auto;
  }

  span {
    margin-left: 5px;
    color: rgba(255, 255, 255, .97);
  }

  @keyframes spinner { // spinner
    from {
      transform: rotate(0deg);
    } to {
      transform: rotate(360deg);
    }
  }
`

const Loading = props => {
  return (
    <>
      {props?.pageLoading ?
        <PageLoading>
          <img src={loadingImg} alt="app loading" />
          {props?.text && <p>{props.text}</p>}
        </PageLoading> :
        <Spinner>
          <div style={props?.style} />
          <span>{props.children}</span>
        </Spinner>
      }
    </>
  )
}

export default Loading