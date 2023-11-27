import { Col, Row } from 'antd'
import React, { useState } from 'react'
import { Input, Radio, Space } from 'antd'
import { CompassFilled } from '@ant-design/icons'
import '../scss/station.scss'

const Station = () => {
  const [value, setValue] = useState(1)
  const onChange = (e) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }
  return (
    <div className="pick-station">
      <Row>
        <Col span={12}>
          <div className="header-point">
            <span>Điểm đón</span>
          </div>
          <Radio.Group onChange={onChange} value={value}>
            <Space direction="vertical">
              <Radio value={1}>
                <div className="">
                  <b>08:30 Vp Tân Bình</b>
                  <div className="">
                    <CompassFilled />
                    <span>
                      306A Hồng Lạc, Phường 11, Phường 11, Tân Bình, Hồ Chí Minh
                    </span>
                  </div>
                </div>
              </Radio>
              <Radio value={2}>
                <div className="">
                  <b>08:30 Vp Tân Bình</b>
                  <div className="">
                    <CompassFilled />
                    <span>
                      306A Hồng Lạc, Phường 11, Phường 11, Tân Bình, Hồ Chí Minh
                    </span>
                  </div>
                </div>
              </Radio>
            </Space>
          </Radio.Group>
        </Col>
        <Col span={12}>
          <div className="header-point">
            <span>Điểm trả</span>
          </div>
          <Radio.Group onChange={onChange} value={value}>
            <Space direction="vertical">
              <Radio value={3}>
                <div className="">
                  <b>08:30 Vp Tân Bình</b>
                  <div className="">
                    <CompassFilled />
                    <span>
                      306A Hồng Lạc, Phường 11, Phường 11, Tân Bình, Hồ Chí Minh
                    </span>
                  </div>
                </div>
              </Radio>
              <Radio value={4}>
                <div className="">
                  <b>08:30 Vp Tân Bình</b>
                  <div className="">
                    <CompassFilled />
                    <span>
                      306A Hồng Lạc, Phường 11, Phường 11, Tân Bình, Hồ Chí Minh
                    </span>
                  </div>
                </div>
              </Radio>
            </Space>
          </Radio.Group>
        </Col>
      </Row>
    </div>
  )
}

export default Station
