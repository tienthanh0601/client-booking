import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Select } from 'antd'
import { Option } from 'antd/es/mentions'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { TimePicker } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import vehicleApi from '../../api/VehicleApi'
// dayjs.extend(customParseFormat)
const onChange = (date, dateString) => {
  console.log(date, dateString)
}
const CreateTrip = () => {
  const [vehicleList, setVehicleList] = useState([])
  // const [station, setStation] = useState('')

  useEffect(() => {
    const fetchVehicle = async () => {
      const vehicleLists = await vehicleApi.getAll()
      console.log(vehicleLists)
      setVehicleList(vehicleLists.data)
    }
    fetchVehicle()
  }, [])

  return (
    <>
      <div className="create-trip">
        <Form.Item
          className="input-trip"
          name="form"
          label="From Station"
          style={{
            width: '50%'
          }}
          rules={[
            {
              required: true,
              message: 'Please select From Station!'
            }
          ]}
        >
          <Select placeholder="select from Station">
            <Option value="Đà Nẵng">Đà Nẵng</Option>
            <Option value="Hà Nội">Hà Nội</Option>
            <Option value="Sài Gòn">Sài Gòn</Option>
          </Select>
        </Form.Item>
        <Form.Item
          className="input-trip"
          style={{
            width: '50%'
          }}
          name="to"
          label="to Station"
          rules={[
            {
              required: true,
              message: 'Please select gender!'
            }
          ]}
        >
          <Select placeholder="select to Station">
            <Option value="Đà Nẵng">Đà Nẵng</Option>
            <Option value="Hà Nội">Hà Nội</Option>
            <Option value="Sài Gòn">Sài Gòn</Option>
          </Select>
        </Form.Item>
        <Form.Item
          className="input-trip"
          name="vehicle"
          label="Select Vehicle"
          style={{
            width: '50%'
          }}
          rules={[
            {
              required: true,
              message: 'Please Select Vehicle!'
            }
          ]}
        >
          <Select placeholder="Select Vehicle">
            {vehicleList.map((index, item) => (
              <Option index={item._id} value={item._id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <div className="create-trip">
        <Form.Item
          name="day"
          label="Select Day"
          style={{
            width: '50%'
          }}
          rules={[
            {
              required: true,
              message: 'Please Select Day!'
            }
          ]}
        >
          <DatePicker onChange={onChange} />
        </Form.Item>
        <Form.Item
          name="timeStart"
          label="Select Time Start"
          style={{
            width: '50%'
          }}
          rules={[
            {
              required: true,
              message: 'Please Select Time Start!'
            }
          ]}
        >
          <TimePicker
            onChange={onChange}
            defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
          />
        </Form.Item>
        <Form.Item
          name="timeEnd"
          label="Select Time End"
          style={{
            width: '50%'
          }}
          rules={[
            {
              required: true,
              message: 'Please Select time end!'
            }
          ]}
        >
          <TimePicker
            onChange={onChange}
            defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}
          />
        </Form.Item>
      </div>
      <div>
        <Form name="dynamic_form_nest_item" autoComplete="off">
          <Form.List name="listTimePoint">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          label="Điểm Đón"
                          name={[name, 'PickupPointId']}
                          {...restField}
                          rules={[
                            {
                              required: true,
                              message: 'Thiếu Điểm Đến!'
                            }
                          ]}
                        >
                          <Select></Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Thời gian đón"
                          name={[name, 'timePickUp']}
                          {...restField}
                          rules={[
                            {
                              required: true,
                              message: 'Thiếu Ngày Ngày Xuất!'
                            }
                          ]}
                        >
                          <TimePicker />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          label="Điểm Trả"
                          name={[name, 'DropoffPointId']}
                          {...restField}
                          rules={[
                            {
                              required: true,
                              message: 'Thiếu Điểm Đến!'
                            }
                          ]}
                        >
                          <Select></Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Thời gian trả"
                          name={[name, 'timeDropOff']}
                          {...restField}
                          rules={[
                            {
                              required: true,
                              message: 'Thiếu Ngày Ngày Xuất!'
                            }
                          ]}
                        >
                          <TimePicker />
                        </Form.Item>
                      </Col>
                    </Row>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button
              htmlType="submit"
              // onClick={() => {
              //   prev()
              // }}
            >
              Quay Lại
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              // onClick={() => {
              //   next()
              // }}
            >
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default CreateTrip
