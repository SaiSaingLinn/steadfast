import React, { useState } from 'react'
import Advertisement from '../ads'
import { adsKey } from '../../key'
import { InputGroup, Input, Label, Button } from '../core'
import { SideBarContainer, SideBarFilter, FilterTitle } from './style/sidebarstyle'
import { RiFilter2Fill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { translate } from 'utils/utils'

const { side_ads } = adsKey

const Sidebar = props => {
  const { sidebar_data, handleCheck, handleFilter, ads_page_code } = props
  const {translation_data, langStore} = useSelector(state => state.translation)

  const [price, setPrice] = useState({
    min: '',
    max: ''
  })

  const handleTextChange = (key, value) => {
    setPrice({
      ...price,
      [key]: value
    })
  }

  return (
    <SideBarContainer>
      {sidebar_data?.brandData?.data?.length > 0 &&
        <SideBarFilter>
          <FilterTitle>
            {translate(translation_data, 'brand_filter', langStore?.code)}
          </FilterTitle>
          {
            sidebar_data?.brandData?.data?.map(brand => (
              <InputGroup className="custom-check" key={brand?.brand_id}>
                {/* <Input type="checkbox" name="check" id={`brand-check-${brand?.brand_id}`} checkbox /> */}
                <Input type="checkbox" name="check"
                  id={`brand-check-${brand?.brand_id}`}
                  onChange={() =>
                    handleCheck('brand_id', sidebar_data?.brandData?.data, brand?.brand_id)
                  } checkbox />
                <Label htmlFor={`brand-check-${brand?.brand_id}`}>{brand?.brand_name}</Label>
              </InputGroup>
            ))
          }
        </SideBarFilter>
      }

      <SideBarFilter price>
        <FilterTitle>{translate(translation_data, 'price_filter', langStore?.code)}</FilterTitle>
        <div className="flex">
          <InputGroup>
            <Input
              value={price?.min}
              onChange={e => handleTextChange('min', e.target.value)}
              type="number" min="1" placeholder="min"
            />
          </InputGroup>
          <InputGroup>
            <Input
              value={price?.max}
              onChange={e => handleTextChange('max', e.target.value)}
              type="number" min="1" placeholder="max"
            />
          </InputGroup>
          <Button primary onClick={() => handleFilter('price', { min: price.min, max: price.max })}>
            <RiFilter2Fill />
          </Button>
        </div>
      </SideBarFilter>

      {sidebar_data?.countryData?.data?.length > 0 &&
        <SideBarFilter>
          <FilterTitle>{translate(translation_data, 'country_origin', langStore?.code)}</FilterTitle>
          {
            sidebar_data?.countryData?.data?.map(country => (
              <InputGroup className="custom-check" key={country?.country_id}>
                <Input type="checkbox" name="check"
                  onChange={() =>
                    handleCheck('country_id', sidebar_data?.countryData?.data, country?.country_id)}
                  id={`country-check-${country?.country_id}`} checkbox />
                <Label htmlFor={`country-check-${country?.country_id}`}>{country?.name}</Label>
              </InputGroup>
            ))
          }
        </SideBarFilter>
      }
      <Advertisement position_code={side_ads} page_code={ads_page_code} />
    </SideBarContainer>
  )
}

export default Sidebar
