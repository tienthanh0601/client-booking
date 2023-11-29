import {
  DeleteOutlined,
  FormOutlined,
  MinusCircleOutlined,
  PlusOutlined
} from '@ant-design/icons'
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
  Space,
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

  useEffect(() => {
    const fetchSeat = async () => {
      const seatList = await seatApi.getSeatByVehicle(vehicleId)
      console.log('list', seatList)
      setSeatList(seatList.data)
    }
    fetchSeat()
  }, [vehicleId])

  const handleAddSeat = async (values) => {
    const data = {
      vehicle: vehicleId,
      name: values.name,
      type: values.type,
      price: values.price
    }
    await seatApi.create(data)

    message.success('Tạo ghế mới thành công')
  }

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
                name="owner"
                label="Owner"
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
                  <Option value={false}>chưa đặt</Option>
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

  const seats = [
    { id: 1, name: 'A1', price: 500000, isBooked: false },
    { id: 2, name: 'A2', price: 500000, isBooked: false },
    { id: 3, name: 'A3', price: 500000, isBooked: false },
    { id: 4, name: 'A4', price: 500.0, isBooked: false },
    { id: 5, name: 'A5', price: 500.0, isBooked: true },
    { id: 6, name: 'A6', price: 500.0, isBooked: false },
    { id: 7, name: 'A7', price: 500.0, isBooked: false },
    { id: 8, name: 'A8', price: 500.0, isBooked: false },
    { id: 9, name: 'B1', price: 500.0, isBooked: true },
    { id: 10, name: 'B2', isBooked: false },
    { id: 11, name: 'B3', isBooked: false },
    { id: 12, name: 'B4', isBooked: false },
    { id: 13, name: 'B5', isBooked: false },
    { id: 14, name: 'B6', isBooked: false },
    { id: 10, name: 'B2', isBooked: false },
    { id: 11, name: 'B3', isBooked: false },
    { id: 12, name: 'B4', isBooked: false },
    { id: 13, name: 'B5', isBooked: false }
    // ...Thêm các ghế khác
  ]
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
          <Row>
            <Col span={6}>
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
            <Col span={6}>
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
            <Col span={6}>
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
