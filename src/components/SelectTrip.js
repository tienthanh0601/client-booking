import React, { useState } from 'react'
import { Button, message, Steps, theme } from 'antd'
import Seats from './Seats'
import Station from './Station'
import AddInfoTickets from './AddInfoTickets'
const steps = [
  {
    title: 'Chọn chỗ ',
    content: <Seats />
  },
  {
    title: 'Điểm đón trả',
    content: <Station />
  },
  {
    title: 'Nhập thông tin',
    content: <AddInfoTickets />
  }
]

const SelectTrip = () => {
  const { token } = theme.useToken()
  const [current, setCurrent] = useState(0)
  const next = () => {
    setCurrent(current + 1)
  }
  const prev = () => {
    setCurrent(current - 1)
  }
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title
  }))
  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16
  }
  return (
    <div className="select-trip">
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        className="btn-selects"
        style={{
          marginTop: 24
        }}
      >
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px'
            }}
            onClick={() => prev()}
          >
            Quay lại
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Tiếp tục
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success('Processing complete!')}
          >
            Done
          </Button>
        )}
      </div>
    </div>
  )
}

export default SelectTrip
