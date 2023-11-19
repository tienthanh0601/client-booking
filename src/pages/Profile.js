import React, { useEffect } from 'react'
import '../scss/account.scss'
import { FaUserCircle } from 'react-icons/fa'
import { BsClockFill } from 'react-icons/bs'
import { TbLogout } from 'react-icons/tb'
import * as UserService from '../services/UserService'
import { Button, Form, Input, Space, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../redux/slices/userSlice'
import { useMutationHooks } from '../hooks/useMutationHook'
import Loading from '../components/Loading'

const SubmitButton = ({ form }) => {
  const [submittable, setSubmittable] = React.useState(false)

  // Watch all values
  const values = Form.useWatch([], form)
  React.useEffect(() => {
    form
      .validateFields({
        validateOnly: true
      })
      .then(
        () => {
          setSubmittable(true)
        },
        () => {
          setSubmittable(false)
        }
      )
  }, [values])
  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Submit
    </Button>
  )
}

const Profile = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data
    UserService.updateUser(id, rests, access_token)
  })

  const { data, isSuccess, isError, isLoading } = mutation

  useEffect(() => {
    let userLocal = localStorage.getItem('user')
    if (userLocal) {
      let dataUser = JSON.parse(userLocal)
      dispatch(
        updateUser({ ...dataUser.data, access_token: dataUser.access_token })
      )
      
    }
  }, [isSuccess, isError])

  // const handleGetDetailsUser = async (id, token) => {
  //   const res = await UserService.getDetailsUser(id, token)
  //   dispatch(updateUser({ ...res?.data, access_token: token }))
  // }

  const onFinish = (values) => {
    mutation.mutate({
      id: user?.id,
      email: user?.email,
      password: user?.password,
      address: user?.address,
      name: user?.name,
      phone: user?.phone,
      access_token: user?.access_token
    })
    message.success()
  }
  return (
    <div className="account-wrapper">
      <div className="menu">
        <div className="info-accout">
          <FaUserCircle className="user-icon" />
          <span className="title-account">Thông tin tài khoản</span>
        </div>
        <div className="info-accout">
          <BsClockFill className="tickets-icon" />
          <span className="title-account">Lịch sử mua vé</span>
        </div>
        <div className="info-accout">
          <TbLogout className="logout-icon" />
          <span className="title-account">Đăng xuất</span>
        </div>
      </div>
      <div className="account-infomation">
        <div className="description">
          <h1>Thông tin tài khoản</h1>
          <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
        </div>
        <div className="">
          <Form
            onFinish={onFinish}
            form={form}
            name="validateOnly"
            layout="vertical"
            autoComplete="off"
            initialValues={{
              name: user.name,
              email: user.email,
              phone: user.phone,
              address: user.address,
              password: user.password
            }}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true
                }
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Space>
                <SubmitButton form={form} htmlType="submit" />
                <Button htmlType="reset">Reset</Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Profile
