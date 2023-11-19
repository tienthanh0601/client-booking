import React, { useState } from 'react'
import { Breadcrumb } from 'antd'
import { Button, message, Steps, theme } from 'antd'
const steps = [
  {
    title: 'First',
    content: 'First-content'
  },
  {
    title: 'Second',
    content: 'Second-content'
  },
  {
    title: 'Last',
    content: 'Last-content'
  }
]

const AddTrip = () => {
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
    <div className="add-trip">
      <Breadcrumb
        style={{ marginBottom: '24px' }}
        items={[
          {
            title: 'Admin'
          },
          {
            title: 'Trip',
            href: '/admin/trip'
          },
          {
            title: 'Add Trip'
          }
        ]}
      />
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
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
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px'
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </div>
  )
}

export default AddTrip
