import React, { Fragment, useEffect, useState } from 'react'
import '../../scss/vehicle.scss'
import {
  Table,
  Input,
  Breadcrumb,
  Space,
  Popconfirm,
  Button,
  Row,
  Col,
  Form,
  Select,
  Drawer,
  message,
  Modal
} from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  MinusCircleOutlined
} from '@ant-design/icons'
import { Option } from 'antd/es/mentions'
import vehicleApi from '../../api/VehicleApi'
import { BsBusFrontFill } from 'react-icons/bs'
import SeatBooked from '../../components/Seat/SeatBooked'
import Seat1 from '../../components/Seat/Seat1'
import SeatBooking from '../../components/Seat/SeatBooking'
import DetailsSeat from '../components/DetailsSeat'

const Vehicle = () => {
  const [open, setOpen] = useState(false)
  const [vehicleList, setVehicleList] = useState([])

  const handleDelete = async (id) => {
    await vehicleApi.remove(id)
    const vehicleList = await vehicleApi.getAll()
    setVehicleList(vehicleList.data)
    message.success('Xoá xe thành công')
  }

  useEffect(() => {
    const fetchVehicle = async () => {
      const vehicleList = await vehicleApi.getAll()
      setVehicleList(vehicleList.data)
    }
    fetchVehicle()
  }, [])

  const handleCreate = async (values) => {
    const data = {
      name: values.name,
      type: values.type,
      floor: values.floor,
      totalSeat: values.totalSeat
    }
    console.log(data)
    await vehicleApi.create(data)
    const vehicleList = await vehicleApi.getAll()
    setVehicleList(vehicleList.data)
    setOpen(false)
    message.success('Tạo xe mới thành công')
  }

  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  const cancel = (e) => {
    console.log(e)
    message.error('Click on No')
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const columns = [
    {
      title: 'Tên Xe',
      dataIndex: 'name',
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend']
    },
    // {
    //   title: 'Số tầng',
    //   dataIndex: 'floor'
    // },
    {
      title: 'Loại xe',
      dataIndex: 'type',
      filters: [
        {
          text: 'Giường nằm',
          value: 'Giường nằm'
        },
        {
          text: 'Limousine',
          value: 'Limousine'
        }
      ],
      onFilter: (value, record) => record.type.startsWith(value),
      filterSearch: true
    },
    {
      title: 'Chi tiết ghế',
      render: (text, item) => {
        return (
          <Fragment>
            <div>
              <Button className="btn-point" type="primary" onClick={showModal}>
                <BsBusFrontFill className="icon-point" />
                Xem ghế
              </Button>
              <Modal
                width={800}
                title="Chi tiết ghế"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <DetailsSeat vehicleId={item._id} />
              </Modal>
            </div>
          </Fragment>
        )
      }
    },
    {
      title: 'Action',

      render: (text, item) => {
        return (
          <Fragment>
            <div className="btn-action">
              <button className="mr-3" onClick={() => {}}>
                <EditOutlined className="btn-edit" />
              </button>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onCancel={cancel}
                onConfirm={() => handleDelete(item._id)}
                okText="Yes"
                cancelText="No"
              >
                <button>
                  <DeleteOutlined className="btn-delete" />
                </button>
              </Popconfirm>
            </div>
          </Fragment>
        )
      }
    }
  ]

  return (
    <div className="wrapper-vehicle">
      <Breadcrumb
        style={{ marginBottom: '24px' }}
        items={[
          {
            title: 'Admin'
          },
          {
            title: 'Vehicle'
          }
        ]}
      />
      <div className="table-new-vehicle">
        <Button
          type="primary"
          size="large"
          style={{ marginBottom: '24px' }}
          onClick={showDrawer}
          icon={<PlusOutlined />}
        >
          Thêm Xe
        </Button>
        <Drawer
          title="Tạo xe mới"
          width={720}
          onClose={onClose}
          open={open}
          styles={{
            body: {
              paddingBottom: 80
            }
          }}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
            </Space>
          }
        >
          <Form layout="vertical" onFinish={handleCreate}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Name Vehicle"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter name Vehicle'
                    }
                  ]}
                >
                  <Input placeholder="Please enter name Vehicle" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="type"
                  label="Type"
                  rules={[
                    {
                      required: true,
                      message: 'Please select an Type'
                    }
                  ]}
                >
                  <Select placeholder="Please select an owner">
                    <Option value="Giường nằm">Xe giường nằm</Option>
                    <Option value="Limousine">Limousine</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="floor"
                  label="Floor"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter floor'
                    }
                  ]}
                >
                  <Select placeholder="Please select floor">
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="totalSeat"
                  label="Total Seat"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter Total Seat'
                    }
                  ]}
                >
                  <Input placeholder="Please enter Total Seat" />
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit">
              Tạo xe mới
            </Button>
          </Form>
        </Drawer>
      </div>
      <div className="list-user">
        <Table columns={columns} dataSource={vehicleList} />
      </div>
    </div>
  )
}

export default Vehicle
