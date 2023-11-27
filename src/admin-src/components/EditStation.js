import React, { useState } from 'react'
import { Button, Form, Input, Modal, Select, Space } from 'antd'
import { Option } from 'antd/es/mentions'
import '../../scss/edituser.scss'
import { data } from '../../data/Provinces'
const EditStation = ({
  handleUpdate,
  isShowModal,
  handleChangeName,
  handleChangeAddress,
  province,
  handleChangeProvince,
  name,
  address,
  handleCloseEdit
}) => {
  const provice = data.map((item) => ({
    value: `${item.name}`,
    label: `${item.name}`
  }))
  const handleOk = () => {
    handleUpdate()
    handleCloseEdit()
  }
  return (
    <div>
      <Modal
        title="Edit Station"
        open={isShowModal}
        onOk={handleOk}
        onCancel={handleCloseEdit}
      >
        <div className="input-edit">
          <span>Name :</span>
          <input
            className="input-css"
            value={name}
            onChange={handleChangeName}
            type="text"
          />
        </div>
        <div className="input-edit">
          <span>Address :</span>
          <input value={address} onChange={handleChangeAddress} type="text" />
        </div>
        <div className="input-edit">
          <span>Thành phố :</span>
          <select
            className="input-edit"
            value={province}
            onChange={handleChangeProvince}
          >
            {data.map((item) => (
              <option value={item.name}>{item.name}</option>
            ))}
          </select>
        </div>
      </Modal>
    </div>
  )
}

export default EditStation
