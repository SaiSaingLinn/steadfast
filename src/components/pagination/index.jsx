import React from 'react'
import Pagination from 'rc-pagination'
import { PaginationWapper } from './style/PaginationStyle'

const PaginationCom = props => {
  const { onChange, current, total } = props
  return (
    <PaginationWapper>
      <Pagination
        onChange={onChange}
        current={current}
        total={total}
        showLessItems={true}
        showTitle={false}
      />
    </PaginationWapper>
  )
}

export default PaginationCom
