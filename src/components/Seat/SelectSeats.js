import { Col, Row } from 'antd'
import React from 'react'
import SeatBooked from './SeatBooked'
import SeatBooking from './SeatBooking'
import Seat from '../../admin-src/components/Seat'
import Wheel from './Wheel'

const SelectSeats = () => {
  return (
    <div className="select-seat">
      <Row>
        <Col span={10}>
          <h1 className="title-seat">Chú thích</h1>
          <div className="note">
            <Seat />
            <span>Ghế không bán</span>
          </div>
          <div className="note">
            <SeatBooked />
            <span>Ghế đang chọn</span>
          </div>
          <div className="note">
            <Seat />
            <span>Ghế trống</span>
          </div>
        </Col>
        <Col span={14}>
          <SeatBooking />
        </Col>
      </Row>
    </div>
  )
}

export default SelectSeats
