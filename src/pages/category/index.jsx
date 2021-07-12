import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Components, { Container, Row, Col, Text } from 'components'
import { MegaMenu } from './style/headerstyle'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Product } from 'store/actions'
import { translate } from 'utils'

export default function Category() {
  const [show, setShow] = useState(true)
  const [active, setActive] = useState(null)
  const { translation_data, langStore } = useSelector(state => state.translation)
  const { category_data } = useSelector(state => state.product)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(Product.getProductCategory({lang: langStore?.code}))
  }, [dispatch, langStore?.code])

  
  // handle subcategory
  const handleCategory = (key) => {
    key !== active ? setActive(key) : setActive(null)
  }

  return (
    <Components.Section>
      <Container>
        <Row>
          <Col sm="12">
            <Text weight="lg" size="lg" style={{textTransform: "uppercase", marginBottom: 15}}>{translate(translation_data, 'categories', langStore?.code)}</Text>
            <MegaMenu className={`megamenu ${show ? "show" : "hide"}`}>
              <div className="mega-wrap">
                <div className="mega-item">
                  <ul className="category">
                    {category_data?.data?.length > 0 &&
                      category_data?.data?.map(category =>
                        <li className={`category-list ${category?.category_id !== active ? '' : 'active'}`} key={category?.category_id}>
                          {category?.sub_category?.length > 0 ?
                            <button className="btn-category" onClick={() => handleCategory(category?.category_id)}>
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
                          </div>
                        </li>
                      )
                    }
                  </ul>
                </div>
              </div>
            </MegaMenu>
          </Col>
        </Row>
      </Container>
    </Components.Section>
  )
}