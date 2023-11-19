import React, { Fragment, useState } from 'react'
import { BsBookmarkPlusFill, BsBusFrontFill } from 'react-icons/bs'
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
  Drawer,
  Modal
} from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import ModalListPoint from '../components/ModalListPoint'

const Station = () => {
  const [open, setOpen] = useState(false)
  const [openPoint, setOpenPoint] = useState(false)
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  const columns = [
    {
      title: 'Tên Bến',
      dataIndex: 'name',

      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend']
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address'
    },
    {
      title: 'Các điểm đón / trả',
      render: () => {
        return (
          <Fragment>
            <div>
              <ModalListPoint />
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
      name: 'Bến xe Đà Nẵng',
      address: '32 Tố Hữu , Hải Châu Đà Nẵng'
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
            title: 'Station'
          }
        ]}
      />
      <div className="table-new-station">
        <Button
          type="primary"
          size="large"
          style={{ marginBottom: '24px' }}
          onClick={showDrawer}
          icon={<PlusOutlined />}
        >
          Thêm Bến Xe
        </Button>
        <Drawer
          title="Tạo Bến xe"
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
                  label="Name Station"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter name Station'
                    }
                  ]}
                >
                  <Input placeholder="Please enter name Station" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter address Station'
                    }
                  ]}
                >
                  <Input placeholder="Please enter address Station" />
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

export default Station
