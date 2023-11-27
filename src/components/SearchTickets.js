import React, { useState } from 'react'
import { Select, DatePicker, Space } from 'antd'
import { BsFillRecordCircleFill, BsFillCalendarWeekFill } from 'react-icons/bs'
import { HiLocationMarker } from 'react-icons/hi'
import '../scss/searchticket.scss'
import { useNavigate } from 'react-router-dom'
import { data } from '../data/Provinces'

const SearchTickets = () => {
  const navigate = useNavigate()

  const handleSearch = () => {
    navigate('/search-trip')
  }

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  const provices = data.map((item) => ({
    value: `${item.name}`,
    label: `${item.name}`
  }))

  return (
    <div className="search-booking">
      <div className="search-form">
        <div className="form-input">
          <div>
            <BsFillRecordCircleFill className="icon-start" />
          </div>
          <div className="form-label">
            <span className="station-name">Place of origin</span>
            <Select
              className="select-form"
              bordered={false}
              defaultValue="Hà Nội"
              suffixIcon={null}
              showSearch
              filterOption={filterOption}
              options={provices}
            />
          </div>
        </div>
        <div className="form-input-2">
          <div>
            <HiLocationMarker className="icon-end" />
          </div>
          <div className="form-label">
            <span className="station-name">Destination</span>
            <Select
              className="select-form"
              showSearch
              defaultValue="Hà Nội"
              bordered={false}
              suffixIcon={null}
              filterOption={filterOption}
              options={provices}
            />
          </div>
        </div>
        <div className="form-input-3">
          <div>
            <BsFillCalendarWeekFill className="icon-day" />
          </div>
          <div className="form-label">
            <span className="station-name">Departure date</span>
            <Space direction="vertical">
              <DatePicker
                className="pick-date"
                bordered={false}
                suffixIcon={null}
                allowClear={false}
                format="DD-MM-YYYY"
              />
            </Space>
          </div>
        </div>
        <button onClick={handleSearch} className="btn-search">
          Tìm kiếm
        </button>
      </div>
    </div>
  )
}

export default SearchTickets
