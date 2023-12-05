import { DeleteOutlined, FormOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Popconfirm,
  Popover,
  Row,
  Select,
  message
} from 'antd'
import { Option } from 'antd/es/mentions'
import React, { useEffect, useState } from 'react'
import Seat from './Seat'
import '../../scss/vehicle.scss'
import seatApi from '../../api/seatApi'

const DetailsSeat = ({ vehicleId }) => {
  const [open, setOpen] = useState(false)
  const [seatList, setSeatList] = useState([])
  const [seat, setSeat] = useState([])
  // const [selectedItems, setSelectedItems] = useState([])
  // const [VehicleList, setVehicleList] = useState([])

  const handleAddSeat = async (values) => {
    const data = {
      vehicle: vehicleId,
      name: values.name,
      type: values.type,
      price: values.price
    }
    await seatApi.create(data)
    const seatList = await seatApi.getSeatByVehicle(vehicleId)
    setSeatList(seatList.data)
    message.success('Tạo ghế mới thành công')
  }
  useEffect(() => {
    const fetchSeat = async () => {
      const seatList = await seatApi.getSeatByVehicle(vehicleId)
      setSeatList(seatList.data)
    }
    fetchSeat()
  }, [vehicleId])

  const handleEditSeat = async () => {}

  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  const content = (
    <div className="action-seat">
      <Button type="primary" onClick={showDrawer}>
        <FormOutlined />
      </Button>
      <Drawer
        title="Cập nhật cho ghế"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80
          }
        }}
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter seat name'
                  }
                ]}
              >
                <Input placeholder="Please enter seat name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={[
                  {
                    required: true,
                    message: 'Please enter price'
                  }
                ]}
              >
                <Input
                  style={{
                    width: '100%'
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[
                  {
                    required: true,
                    message: 'Please select an owner'
                  }
                ]}
              >
                <Select placeholder="Please select type seat">
                  <Option value="Giường nằm">Giường nằm</Option>
                  <Option value="Limousine">Limousine</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the status'
                  }
                ]}
              >
                <Select placeholder="Please choose the status">
                  <Option value={true}>Đã đặt</Option>
                  <Option value={false}>Chưa đặt</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit">
            Cập nhật ghế
          </Button>
        </Form>
      </Drawer>
      {/* ///// */}
      <Popconfirm
        placement="topRight"
        title={'Bạn có muốn xóa ghế này'}
        // onConfirm={() => {
        //   dispatch(DeleteSeatAction(item.id, vehicleDetail.id))
        // }}
        okText="Yes"
        cancelText="No"
      >
        <Button className="bg-red-600 ml-5" style={{ backgroundColor: 'red' }}>
          <DeleteOutlined className="text-red-600" />
        </Button>
      </Popconfirm>
    </div>
  )

  const [form] = Form.useForm()

  return (
    <>
      <div className="list-seat" style={{ width: '100%', padding: '32px' }}>
        <div className="seat-groups">
          <div className="note font-bold" style={{ fontSize: '14px' }}>
            Chú thích
          </div>
          <div className="seat-info ">
            <div className="seat-thumbnail">
              <Seat />
            </div>
            <span className="seat-name">Còn trống</span>
          </div>
          <div className="seat-info">
            <div className="seat-thumbnail" disabled>
              <Seat />
            </div>
            <span className="seat-name">Ghế đã được đặt</span>
          </div>
          <div />
        </div>
        <div className="seat-template">
          {seatList.map((seat) => (
            <Popover
              style={{ margin: '20px' }}
              placement="top"
              content={content}
              title={`Ghế : ${seat.name} + ${seat.price} VND`}
            >
              <button
                key={seat._id}
                variant={seat.isBooked ? 'cursor: pointer' : 'outlined'}
                color={seat.isBooked ? 'error' : 'primary'}
                disabled={seat.isBooked}
                // onClick={() => toggleSeat(seat.id)}
                className="btn-seat-detail"
                // className={`btn-seat ${color === true ? 'cl-green' : 'clc'}`}
              >
                {seat.name}
              </button>
            </Popover>
          ))}
        </div>
      </div>

      <div style={{ margin: '30px auto', width: '60%' }}>
        <h3>Thêm ghế cho xe</h3>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddSeat}
          hideRequiredMark
        >
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={12} gutter={4}>
              <Form.Item
                name="price"
                label="Price"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Select placeholder="Select a option and change input text above">
                  <Option value="Giường nằm">Giường nằm</Option>
                  <Option value="Limousine">Limousine</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit">
              Thêm Ghế
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default DetailsSeat
