import React, { Fragment, useEffect, useState } from 'react'
import '../scss/account.scss'
import { Col, Modal, Popconfirm, Row, Table } from 'antd'
import '../scss/account.scss'
import { AiFillCloseCircle, AiOutlineEyeInvisible } from 'react-icons/ai'
import ticketApi from '../api/ticketApi'
import { useSelector } from 'react-redux'
const CardTicket = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ticketList, setTicketList] = useState([])
  const userId = useSelector((state) => state.user.id)
  console.log('id', userId)

  useEffect(() => {
    const fetchPoint = async () => {
      const ticketList = await ticketApi.getTicketsById(userId)
      console.log(ticketList)
      setTicketList(ticketList.data)
    }
    fetchPoint()
  }, [])

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
      title: 'Action',
      width: 40,
      fixed: 'left',
      render: (text, item) => {
        return (
          <Fragment>
            <div className="action-ticket">
              <button onClick={showModal}>
                <AiOutlineEyeInvisible className="btn-show-ticket" />
              </button>
              <Modal
                title="Thông tin chi tiết vé xe"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <Row>
                  <Col span={12}>
                    <span>Tên khách hàng : Nguyễn Văn A</span>
                  </Col>
                  <Col span={12}>
                    <span>Email : Nguyễn Văn A</span>
                  </Col>
                  <Col span={12}>
                    <span>Số điện thoại : Nguyễn Văn A</span>
                  </Col>
                  <Col span={12}>
                    <span>Mã vé : Nguyễn Văn A</span>
                  </Col>
                  <Col span={12}>
                    <span>
                      Chuyến đi từ Quảng Ngãi <b>đến</b> Đà Nẵng
                    </span>
                  </Col>
                  <Col span={12}>
                    <span>Tên xe : Xe số 2</span>
                  </Col>
                  <Col span={12}>
                    <span>Tên ghế đặt : ghế A1 , A2</span>
                  </Col>
                  <Col span={12}>
                    <span>Điểm đón : Trần Phú </span>
                    <span>giờ đón : 8h00</span>
                  </Col>
                  <Col span={12}>
                    <span>Điểm trả : Trần Phú </span>
                    <span>giờ trả : 8h00</span>
                  </Col>
                  <Col span={12}>
                    <span>Giá tiền : 800.000 VND </span>
                  </Col>
                  <Col span={12}>
                    <span>Trạng thái : chưa chạy </span>
                  </Col>
                </Row>
              </Modal>

              <Popconfirm
                title="Bạn có muốn huỷ vé"
                description="Are you sure you want to cancel your ticket?"
                // onConfirm={() => handleDelete(item._id)}
                okText="Yes"
                cancelText="No"
              >
                <button>
                  <AiFillCloseCircle className="btn-cancel-ticket" />
                </button>
              </Popconfirm>
            </div>
          </Fragment>
        )
      }
    },
    {
      title: 'Mã vé',
      width: 100,
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: 'Name',
      width: 50,
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: '1',
      width: 50
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: '2',
      width: 100
    },
    {
      title: 'Số tiền',
      dataIndex: 'total',
      key: '3',
      width: 70
    },
    {
      title: 'Ghế',
      dataIndex: 'seatId',
      key: '4',
      width: 50
    }
  ]
  const data = []
  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      name: `Edward ${i}`,
      age: 2,
      address: `London => Park no. ${i}`
    })
  }
  return (
    <div className="wrapper-order-ticket">
      <div className="container-ticket">
        <div className="box-card">
          <Table
            pagination={false}
            columns={columns}
            dataSource={ticketList}
            scroll={{
              x: 1500,
              y: 300
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default CardTicket
