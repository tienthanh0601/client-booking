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
const { Search } = Input

// table

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',

    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend']
  },
  {
    title: 'Email',
    dataIndex: 'email',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    // filters: arrFilterPhone,
    onFilter: (value, record) => record.numberPhone.startsWith(value),
    filterSearch: true
  },
  {
    title: 'Role',
    dataIndex: 'isAdmin',
    filters: [
      {
        text: 'Admin',
        value: 'ADMIN'
      },
      {
        text: 'Client',
        value: 'CLIENT'
      }
    ],
    onFilter: (value, record) => record.type.startsWith(value),
    filterSearch: true
  },
  {
    title: 'Action',

    render: (text, item) => {
      return (
        <Fragment>
          <div className='btn-action'>
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
              <EditOutlined className='btn-edit' />
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
                <DeleteOutlined className='btn-delete'/>
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
    name: 'John Brown',
    email: 'admin@gmail.com',
    phone: 355898259,
    isAdmin: 'ADMIN'
  }
]
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra)
}
const User = () => {
  const onSearch = (value, _e, info) => console.log(info?.source, value)
  /// new accout
  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  return (
    <div className="wrapper-user">
      <Breadcrumb
        items={[
          {
            title: 'Admin'
          },
          {
            title: 'User'
          }
        ]}
      />
      <div className="search-user">
        <Search
          size="large"
          enterButton
          placeholder="Search User"
          allowClear
          onSearch={onSearch}
          style={{
            width: '100%'
          }}
        />
      </div>
      <div className="table-new-user">
        <Button
          type="primary"
          size="large"
          style={{ marginBottom: '24px' }}
          onClick={showDrawer}
          icon={<PlusOutlined />}
        >
          Thêm người dùng
        </Button>
        <Drawer
          title="Create a new account"
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
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter user name'
                    }
                  ]}
                >
                  <Input placeholder="Please enter user name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      type: 'email',
                      required: true,
                      message: 'Please enter email'
                    }
                  ]}
                >
                  <Input
                    style={{
                      width: '100%'
                    }}
                    placeholder="Please enter email"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      type: 'number',
                      required: true,
                      message: 'Please choose the phone number'
                    }
                  ]}
                >
                  <Input
                    style={{
                      width: '100%'
                    }}
                    placeholder="Please enter phone"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="type"
                  label="Type"
                  rules={[
                    {
                      required: true,
                      message: 'Please choose the type'
                    }
                  ]}
                >
                  <Select placeholder="Please choose the type">
                    <Option value="admin">ADMIN</Option>
                    <Option value="user">USER</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label="Password"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please choose the Password'
                    }
                  ]}
                >
                  <Input.Password
                    style={{
                      width: '100%'
                    }}
                    placeholder="Please enter Password"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please choose the Password'
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(
                          new Error(
                            'The new password that you entered do not match!'
                          )
                        )
                      }
                    })
                  ]}
                >
                  <Input.Password
                    style={{
                      width: '100%'
                    }}
                    placeholder="Please enter Password"
                  />
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

export default User
