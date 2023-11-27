
import React from 'react'
import Modal from 'antd'
import '../../scss/edituser.scss'
const EditVehicle = ({
  handleUpdate,
  isShowModal,
  handleChangeName,
  handleChangeEmail,
  handleChangeIsAdmin,
  isAdmin,
  handleChangePassword,
  handleChangePhone,
  phone,
  password,
  name,
  email,
  handleCloseEdit
}) => {
  const handleOk = () => {
    handleUpdate()
    handleCloseEdit()
  }
  return (
    <div>
      <Modal
        title="Edit User"
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
          <span>Email :</span>
          <input value={email} onChange={handleChangeEmail} type="text" />
        </div>

        <div className="input-edit">
          <span>Role :</span>
          <select value={isAdmin} onChange={handleChangeIsAdmin} name="isAdmin">
            <option className="option-value" value="user">
              user
            </option>
            <option className="option-value" value="admin">
              admin
            </option>
          </select>
        </div>
        <div className="input-edit">
          <span>Phone :</span>
          <input value={phone} onChange={handleChangePhone} type="text" />
        </div>
        <div className="input-edit">
          <span>Password :</span>
          <input value={password} onChange={handleChangePassword} type="text" />
        </div>
      </Modal>
    </div>
  )
}

export default EditVehicle

