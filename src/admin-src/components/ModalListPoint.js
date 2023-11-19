import React, { useState } from 'react'
import { Collapse, Popconfirm } from 'antd'
import { Button, Modal } from 'antd'
import { BsBusFrontFill } from 'react-icons/bs'
import AddPoint from './AddPoint'
const { Panel } = Collapse
const ModalListPoint = ({ openPoint, setOpenPoint }) => {
  const [open, setOpen] = useState(false)
  const onChange = (key) => {
    console.log(key)
  }
  return (
    <>
      <button className="btn-point" onClick={() => setOpen(true)}>
        <BsBusFrontFill className="icon-point" />
        Điểm đón / Dừng
      </button>
      <Modal
        title="Điểm đón / Trả của bến xe"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Collapse
          style={{ width: '950px', marginBottom: '24px' }}
          accordion
          onChange={onChange}
        >
          <Panel
            style={{
              width: '100%'
            }}
            header="This is panel header 1"
            key="1"
          >
            <p style={{ width: '100%' }}>Địa chỉ : 148 hàn thuyên</p>
            <div className="">
              <Button
                type="primary"
                className="mr-3"
                // onClick={() => {
                //   dispatch({
                //     type: OPEN_DRAWER,
                //     title: `Cập nhật Điểm đón/dừng của bến xe ${item.name}`,
                //     content: <EditPoint id={item.id} />
                //   })
                // }}
              >
                Sửa
              </Button>
              <Popconfirm
                placement="topLeft"
                title={'Bạn có muốn xóa  xe này'}
                // onConfirm={() => {
                //   dispatch(deletePointAction(item.id, item.stationId))
                // }}
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger">Xóa</Button>
              </Popconfirm>
            </div>
          </Panel>
        </Collapse>

        <div className="btn-new-point">
          <AddPoint />
        </div>
      </Modal>
    </>
  )
}

export default ModalListPoint
