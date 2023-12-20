import React, { Fragment, useEffect, useState } from 'react'
import '../scss/account.scss'
import { Col, Modal, Popconfirm, Row, Table } from 'antd'
import '../scss/account.scss'
import { AiFillCloseCircle, AiOutlineEyeInvisible } from 'react-icons/ai'
import ticketApi from '../api/ticketApi'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'
import seatApi from '../api/seatApi'
import pointApi from '../api/PointApi'
const CardTicket = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [ticketList, setTicketList] = useState([])
  const userId = useSelector((state) => state.user.id)
  const [seatList, setSeatList] = useState([])
  const [pointList, setPointList] = useState([])
  useEffect(() => {
    const fetchPoint = async () => {
      const points = await pointApi.getAll()
      setPointList(points.data)
    }
    fetchPoint()
  }, [])

  useEffect(() => {
    const fetchSeat = async () => {
      const seatList = await seatApi.getAll()
      setSeatList(seatList.data)
    }
    fetchSeat()
  }, [])

  useEffect(() => {
    const fetchPoint = async () => {
      const ticketList = await ticketApi.getTicketsById(userId)
      console.log('ticket ', ticketList.datacreatedAt)
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
  const vnd = 'VND'

  const getSeatNameById = (id, seatList) => {
    const foundSeat = seatList.find((seat) => seat._id === id)
    return foundSeat ? foundSeat.name : ''
  }
  const getPointById = (id, pointList) => {
    console.log('first', id, pointList)
    const foundPoint = pointList.find((point) => point._id === id)
    console.log(foundPoint)
    return foundPoint ? foundPoint.address : ''
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
      width: 55,
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: 'Name',
      width: 40,
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: '1',
      width: 40
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: '2',
      width: 50
    },
    {
      title: 'Số tiền',
      dataIndex: 'total',
      key: '3',
      width: 40,
      render: (total) => (
        <span>
          {total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} {vnd}
        </span>
      )
    },
    {
      title: 'Ghế',
      dataIndex: 'seatId',
      key: '4',
      width: 40,
      render: (seatId) => getSeatNameById(seatId, seatList)
    },
    {
      title: 'Điểm đón',
      dataIndex: 'pickedPoint',
      key: 'pickedPoint',
      width: 100,
      render: (pickedPoint, record) => (
        <span>
          {format(new Date(record.timePickUp), 'HH:mm')} -{' '}
          {getPointById(pickedPoint, pointList)}
        </span>
      )
    },
    {
      title: 'Điểm trả',
      dataIndex: 'droppedPoint',
      key: 'to',
      width: 100,
      render: (droppedPoint, record) => (
        <span>
          {format(new Date(record.timeDropOff), 'HH:mm')} -{' '}
          {getPointById(droppedPoint, pointList)}
        </span>
      )
    },
    {
      title: 'Ngày Đặt',
      dataIndex: 'createdAt',
      key: '5',
      width: 50,
      render: (createdAt) => format(new Date(createdAt), ' HH:mm dd/MM/yyyy')
    }
  ]
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
