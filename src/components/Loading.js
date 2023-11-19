import { Spin } from 'antd'
import React from 'react'

const Loading = ({ children, isLoading }) => {
  return (
    <Spin spinning={isLoading} delay={500}>
      {children}
    </Spin>
  )
}

export default Loading
