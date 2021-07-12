import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { Container } from 'components/core'
import { Wrapper, MegaMenu, MenuDropdown } from './style/headerstyle'
import { BiMenu } from "react-icons/bi"
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md'
import { closeDrawer } from 'utils'
import { languagesKey } from 'key'
import { Product, translation } from 'store/actions'
import { translate } from 'utils'
import { langLocalStore } from '../../service'

export default function PrimaryNav() {
  const [show, setShow] = useState(false)
  const [active, setActive] = useState(null)
  const { translation_data, langStore } = useSelector(state => state.translation)
  const { category_data } = useSelector(state => state.product)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(Product.getProductCategory({lang: langStore?.code}))
  }, [dispatch, langStore?.code])

  // drop down megamenu 
  const handleDropdown = () => {
    show ? setShow(false) : setShow(true)
    // let getIndex = category_data?.data?.indexOf(category_data?.data?.find(x => x?.sub_category?.length > 0))
    let getFirstIndexId = category_data?.data?.filter(x => x?.sub_category?.length > 0)[0]?.category_id
    setActive(getFirstIndexId)
  }
  // handle subcategory
  const handleCategory = (key) => {
    key !== active && setActive(key)
  }

  // handle language change
  const handleLangChange = language => {
    dispatch(translation.setLangStore('LANG_CODE_OBJ', language))
    document.documentElement.lang = language?.code
    closeDrawer()
  }

  // console.log(`langLocalStore`, langLocalStore)

  return (
    <Wrapper primary className="primaryNav">
      <Container className="nav-container">
        <ul className="nav-item-wrap">
          <li className="nav-item category">
            <button className="nav-link" onClick={() => handleDropdown()}>
              <span>
                <BiMenu />
                {translate(translation_data, 'all_category', langStore?.code)}
              </span>
              <MdKeyboardArrowDown />
            </button>
            <MegaMenu className={`megamenu ${show ? "show" : "hide"}`}>
              <div className="mega-wrap">
                <div className="mega-item">
                  <ul className="category">
                    {category_data?.data?.length > 0 &&
                      category_data?.data?.map(category =>
                        <li className={`category-list ${category?.category_id !== active ? '' : 'active'}`} key={category?.category_id}>
                          {category?.sub_category?.length > 0 ?
                            <button className="btn-category" onMouseOver={() => handleCategory(category?.category_id)}>
                              {category?.category_name}<MdKeyboardArrowRight />
                            </button> :
                            <Link className="btn-category" to={`/products/list?category_id=${category?.category_id}`} onClick={() => setShow(false)}>
                              {category?.category_name}
                            </Link>
                          }

                          <div className="subcategory-wrap">
                            <ul className="subcategory">
                              {
                                category?.sub_category.map(subcategory =>
                                  <li className="subcategory-list" key={subcategory?.category_id}>
                                    <Link to={`/products/list?category_id=${category?.category_id}&subcategory_id=${subcategory?.category_id}`} className="item-link" onClick={() => setShow(false)}>
                                      {subcategory?.category_name}
                                    </Link>
                                  </li>
                                )
                              }
                            </ul>
                            <div className="mega-img">
                              <img src={category?.category_image} alt={category?.category_name} />
                            </div>
                          </div>
                        </li>
                      )
                    }
                  </ul>
                </div>
              </div>
            </MegaMenu>
          </li>
          <li className="nav-item mb-category">
            <NavLink to="/category" className="nav-link" onClick={() => closeDrawer()}>
              {translate(translation_data, 'all_category', langStore?.code)}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/service-ticket" className="nav-link" onClick={() => closeDrawer()}>
              {translate(translation_data, 'service_ticket', langStore?.code)}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/home-service" className="nav-link" onClick={() => closeDrawer()}>
              {translate(translation_data, 'home_service', langStore?.code)}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/express-service" className="nav-link" onClick={() => closeDrawer()}>
              {translate(translation_data, 'express_service', langStore?.code)}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/aboutus" className="nav-link" onClick={() => closeDrawer()}>
              {translate(translation_data, 'about_us', langStore?.code)}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contactus" className="nav-link" onClick={() => closeDrawer()}>
              {translate(translation_data, 'contact_us', langStore?.code)}
            </NavLink>
          </li>
        </ul>
        <MenuDropdown className="language">
          <p className="selected-lang">
            <img src={langLocalStore?.getLanguage()?.icon ? langLocalStore?.getLanguage()?.icon : require('../../assets/img/icons/england-flag.jpg').default} alt='flag' />
            <span>{langLocalStore?.getLanguage()?.lang ? langLocalStore?.getLanguage()?.lang : "English"}</span>
            <MdKeyboardArrowDown />
          </p>
          <div className="drp-wrap">
            <ul className="drp-ul lang-list">
              {
                languagesKey?.map(language => (
                  <li onClick={() => handleLangChange(language)} key={language?.code}>
                    <img src={language?.icon} alt={language?.lang} />
                    <span>{language?.lang}</span>
                  </li>
                ))
              }
            </ul>
          </div>
        </MenuDropdown>
      </Container>
    </Wrapper>
  )
}