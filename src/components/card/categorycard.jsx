import React from 'react'
import { CategoryBgImg, CategoryWrap } from './style/cardstyle'
import { Link } from 'react-router-dom'
import { Text } from '..'

const CategoryCard = ({ categ_data }) => {

  return (
    <CategoryWrap>
      {categ_data?.length > 0 &&
        categ_data?.map(categ => 
        <div className="category-col" key={categ?.category_id}>
          <Link to={`products/list?category_id=${categ?.parent_id || ''}&subcategory_id=${categ?.category_id}`}>
            <div className="img-wrap">
              <CategoryBgImg data={categ?.image_link || require('../../assets/img/no-img.jpg').default} title={categ?.category_name} />
            </div>
            <Text className="desc">{categ?.name}</Text>
          </Link>
        </div>
        )
      }
    </CategoryWrap>
  )
}

export default CategoryCard