import React, { Fragment, useState } from 'react'
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
  Drawer
} from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Option } from 'antd/es/mentions'
const columns = [
  {
    title: 'Tên Xe',
    dataIndex: 'name',

    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend']
  },
  {
    title: 'Số tầng',
    dataIndex: 'floor'
  },
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
    title: 'Số ghế',
    dataIndex: 'totalSeat'
  },
  {
    title: 'Action',

    render: (text, item) => {
      return (
        <Fragment>
          <div className="btn-action">
            <button
              className="mr-3"
              // onClick={() => {
              //   dispatch({
              //     type: SET_MODAL,
              //     title: 'EDIT USER',
              //     content: <EditUser id={item.id} />,
              //     width: 600
              //   })
              // }}
            >
              <EditOutlined className="btn-edit" />
            </button>
            <Popconfirm
              placement="topLeft"
              title={'Bạn có muốn xóa tài khoản này'}
              // onConfirm={() => {
              //   dispatch(deleteUserAction(item.id))
              // }}
              // okText="Yes"
              // cancelText="No"
            >
              <button className="text-red-700">
                <DeleteOutlined className="btn-delete" />
              </button>
            </Popconfirm>
          </div>
        </Fragment>
      )
    }
  }
]
const data = [
  {
    key: '1',
    name: 'Xe số 1',
    type: 'Limousine',
    floor: 1,
    totalSeat: 24
  }
]
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra)
}
const Vehicle = () => {
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
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
              <Button onClick={onClose} type="primary">
                Submit
              </Button>
            </Space>
          }
        >
          <Form layout="vertical" hideRequiredMark>
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
                    <Option value="xiao">1</Option>
                    <Option value="mao">2</Option>
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
          </Form>
        </Drawer>
      </div>
      <div className="list-user">
        <Table columns={columns} dataSource={data} onChange={onChange} />;
      </div>
    </div>
  )
}

export default Vehicle
