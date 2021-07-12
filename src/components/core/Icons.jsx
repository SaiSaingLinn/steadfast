import React from 'react'
import styled from 'styled-components'
import media from 'components/constant/Media'

const AddCartIcon = ({ color, background }) => (
  <IconWrap bg={background}>
    <svg xmlns="http://www.w3.org/2000/svg" width="79.229" height="77.282" viewBox="0 0 79.229 77.282">
      <g id="add_to_cart" data-name="add to cart" transform="translate(-5.546 -6.448)">
        <path fill={color} id="Path_1143" data-name="Path 1143" d="M66.753,13.218h1.938a1.781,1.781,0,0,1,1.646,1.9v5.8h5.781a1.779,1.779,0,0,1,1.895,1.644V24.5a1.783,1.783,0,0,1-1.895,1.643H70.337v5.791a1.781,1.781,0,0,1-1.646,1.9H66.753a1.781,1.781,0,0,1-1.641-1.9V26.14H59.331a1.78,1.78,0,0,1-1.9-1.643v-1.94a1.776,1.776,0,0,1,1.9-1.644h5.781v-5.8A1.781,1.781,0,0,1,66.753,13.218Zm.969-6.77A17.079,17.079,0,1,0,84.775,23.527,17.066,17.066,0,0,0,67.722,6.448Z" />
        <path id="Path_1144" data-name="Path 1144" d="M9.128,6.845c-4.266.12-4.948,6.562-.813,7.689l5.391,1.905,6.339,33.072a34.736,34.736,0,0,0,3.771,10.621c2.583,4.539,7.063,7.889,12.588,7.889H63.853c4.953.093,4.953-7.836,0-7.742H36.4c-3.9-.5-5.525-2.473-6.957-5.357H65.675c3.322,0,5.037-2.983,5.994-6.365.9-3.145.609-3.155-1.535-2.858a21.542,21.542,0,0,1-2.406.135A22.373,22.373,0,0,1,45.457,23.528a14.493,14.493,0,0,1,.323-3.761c.775-2.9-.745-3.464-3.491-3.464l-20.775.016-1.4-4.277a3.788,3.788,0,0,0-2.556-2.6Z" />
        <path id="Path_1145" data-name="Path 1145" d="M61.681,71.969a5.881,5.881,0,1,0,5.875,5.883A5.872,5.872,0,0,0,61.681,71.969Zm-23.407,0a5.881,5.881,0,1,0,5.869,5.883A5.879,5.879,0,0,0,38.274,71.969Z" />
      </g>
    </svg>
  </IconWrap>
)

const EmptyCartIcon = ({ color, background }) => (
  <IconWrap bg={background}>
    <svg xmlns="http://www.w3.org/2000/svg" width="86.311" height="84.337" viewBox="0 0 86.311 84.337">
      <g id="empty_cart" data-name="empty cart" transform="translate(-5.546 0.607)">
        <path fill={color} id="Path_1140" data-name="Path 1140" d="M66.753,13.218h1.938a1.781,1.781,0,0,1,1.646,1.9v5.8h5.781a1.779,1.779,0,0,1,1.895,1.644V24.5a1.783,1.783,0,0,1-1.895,1.643H70.337v5.791a1.781,1.781,0,0,1-1.646,1.9H66.753a1.781,1.781,0,0,1-1.641-1.9V26.14H59.331a1.78,1.78,0,0,1-1.9-1.643v-1.94a1.776,1.776,0,0,1,1.9-1.644h5.781v-5.8A1.781,1.781,0,0,1,66.753,13.218Zm.969-6.77A17.079,17.079,0,1,0,84.775,23.527,17.066,17.066,0,0,0,67.722,6.448Z" transform="translate(36.472 -40.996) rotate(45)" />
        <path id="Path_1141" data-name="Path 1141" d="M9.128,6.845c-4.266.12-4.948,6.562-.813,7.689l5.391,1.905,6.339,33.072a34.736,34.736,0,0,0,3.771,10.621c2.583,4.539,7.063,7.889,12.588,7.889H63.853c4.953.093,4.953-7.836,0-7.742H36.4c-3.9-.5-5.525-2.473-6.957-5.357H65.675c3.322,0,5.037-2.983,5.994-6.365.9-3.145.609-3.155-1.535-2.858a21.542,21.542,0,0,1-2.406.135A22.373,22.373,0,0,1,45.457,23.528a14.493,14.493,0,0,1,.323-3.761c.775-2.9-.745-3.464-3.491-3.464l-20.775.016-1.4-4.277a3.788,3.788,0,0,0-2.556-2.6Z" />
        <path id="Path_1142" data-name="Path 1142" d="M61.681,71.969a5.881,5.881,0,1,0,5.875,5.883A5.872,5.872,0,0,0,61.681,71.969Zm-23.407,0a5.881,5.881,0,1,0,5.869,5.883A5.879,5.879,0,0,0,38.274,71.969Z" />
      </g>
    </svg>
  </IconWrap>
)

const SuccessCartIcon = ({ color, background }) => (
  <IconWrap bg={background}>
    <svg fill="#808080" xmlns="http://www.w3.org/2000/svg" width="79.228" height="77.282" viewBox="0 0 79.228 77.282">
      <g id="purchase_order" data-name="purchase order" transform="translate(-5.548 -6.448)">
        <path fill={color} id="Path_1146" data-name="Path 1146" d="M75.276,15.311a1.5,1.5,0,0,1,1.02.422l1.333,1.341a1.739,1.739,0,0,1-.172,2.446L65.7,31.294a1.668,1.668,0,0,1-2.266,0l-5.437-5.447a1.745,1.745,0,0,1-.178-2.446l1.339-1.335a1.724,1.724,0,0,1,2.438.177l2.973,2.974,9.287-9.307A1.985,1.985,0,0,1,75.276,15.311ZM67.724,6.448A17.079,17.079,0,1,0,84.776,23.527,17.066,17.066,0,0,0,67.724,6.448Z" />
        <path id="Path_1147" data-name="Path 1147" d="M9.129,6.845c-4.265.12-4.948,6.562-.812,7.689l5.391,1.905,6.338,33.072a34.683,34.683,0,0,0,3.771,10.621C26.4,64.67,30.88,68.02,36.4,68.02H63.853c4.953.093,4.953-7.836,0-7.742H36.4c-3.9-.5-5.525-2.473-6.957-5.357H65.676c3.324,0,5.037-2.983,6-6.365.895-3.145.609-3.155-1.537-2.858a21.529,21.529,0,0,1-2.406.135A22.374,22.374,0,0,1,45.457,23.527a14.45,14.45,0,0,1,.324-3.761c.776-2.9-.746-3.464-3.491-3.464l-20.776.016-1.4-4.277a3.788,3.788,0,0,0-2.556-2.6Z" />
        <path id="Path_1148" data-name="Path 1148" d="M61.681,71.969a5.881,5.881,0,1,0,5.876,5.883A5.874,5.874,0,0,0,61.681,71.969Zm-23.4,0a5.881,5.881,0,1,0,5.874,5.883A5.878,5.878,0,0,0,38.276,71.969Z" />
      </g>
    </svg>
  </IconWrap>
)

const SuccessMsgIcon = ({ color, background }) => (
  <IconWrap bg={background}>
    <svg stroke="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} d="M170.718 216.482L141.6 245.6l93.6 93.6 208-208-29.118-29.118L235.2 279.918l-64.482-63.436zM422.4 256c0 91.518-74.883 166.4-166.4 166.4S89.6 347.518 89.6 256 164.482 89.6 256 89.6c15.6 0 31.2 2.082 45.764 6.241L334 63.6C310.082 53.2 284.082 48 256 48 141.6 48 48 141.6 48 256s93.6 208 208 208 208-93.6 208-208h-41.6z"></path>
    </svg>
  </IconWrap>
)

export {
  AddCartIcon,
  EmptyCartIcon,
  SuccessCartIcon,
  SuccessMsgIcon
}

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border: 1px solid ${props => props.bg ? props.bg : '#eaeaea'};
  border-radius: 50%;
  background-color: ${props => props.bg ? props.bg : '#eaeaea'};
  @media screen and (min-width: ${media.md}px) {
    width: 150px;
    height: 150px;
  }
  
  svg {
    width: 40px;
    height: 40px;
    fill: #8a8a8a;
    @media screen and (min-width: ${media.md}px) {
      width: 80px;
      height: 80px;
    }
  }
`