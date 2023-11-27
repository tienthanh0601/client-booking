import React, { useMemo, useState } from 'react'
import { Grid, Paper, Tooltip, Typography } from '@mui/material'
import Seat from '../../admin-src/components/Seat'
import '../../scss/seat.scss'
import Wheel from './Wheel'
import SeatBooked from './SeatBooked'

const SeatBooking = () => {
  const [color, setColor] = useState(false)

  // Giả sử bạn có danh sách ghế từ API hoặc Redux store
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

  const [selectedSeats, setSelectedSeats] = useState([])

  const toggleSeat = (seatId) => {
    setColor(!color)
    const updatedSeats = selectedSeats.includes(seatId)
      ? selectedSeats.filter((id) => id !== seatId)
      : [...selectedSeats, seatId]
    setSelectedSeats(updatedSeats)
  }

  const renderSeats = () => {
    return seats.map((seat) => (
      <Tooltip
        style={{ margin: '20px' }}
        placement="top"
        title={`Ghế : ${seat.name} + ${seat.price} VND`}
      >
        <button
          key={seat.id}
          variant={seat.isBooked ? 'cursor: pointer' : 'outlined'}
          color={seat.isBooked ? 'error' : 'primary'}
          disabled={seat.isBooked}
          onClick={() => toggleSeat(seat.id)}
          className="btn-seat"
          style={
            color === true
              ? { backgroundColor: 'green' }
              : { backgroundColor: '#ccc' }
          }
        >
          {seat.name}
        </button>
      </Tooltip>
    ))
  }

  return (
    <div>
      <Typography style={{ fontStyle: '500' }} variant="h5" gutterBottom>
        Chọn chỗ ngồi
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper style={{ padding: '20px', marginBottom: '20px' }}>
            {renderSeats()}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Ghế đã chọn
            </Typography>
            {selectedSeats.length === 0 ? (
              <Typography>Chưa chọn ghế nào</Typography>
            ) : (
              <div className="">
                {selectedSeats.map((seatId) => (
                  <span
                    style={{
                      color: 'green',
                      fontSize: '16px',
                      fontWeight: '700'
                    }}
                    key={seatId}
                  >{`${seatId} ,`}</span>
                ))}
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default SeatBooking
