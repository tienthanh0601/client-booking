import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import '../../scss/admin.scss'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons'
import { Layout, Menu, Button, theme } from 'antd'
const { Header, Sider, Content } = Layout

const Admin = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  return (
    <div className="admin-container">
      <Layout>
        <Sider
          style={{ height: '100vh' }}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="demo-logo"></div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={({ key }) => {
              if (key === 'signout') {
                // todo
              } else {
                navigate(key)
              }
            }}
            items={[
              {
                key: '/admin',
                icon: <UserOutlined />,
                label: 'Home'
              },
              {
                key: '/admin/user',
                icon: <UserOutlined />,
                label: 'Quản lý người dùng'
              },
              {
                key: '/admin/trip',
                icon: <VideoCameraOutlined />,
                label: 'Quản lý chuyến xe'
              },
              {
                key: '/admin/vehicles',
                icon: <UploadOutlined />,
                label: 'Quản lý xe'
              },
              {
                key: '/admin/tickets',
                icon: <UploadOutlined />,
                label: 'Quản lý vé'
              },
              {
                key: '/admin/station',
                icon: <UploadOutlined />,
                label: 'Quản lý bến xe'
              },
              {
                key: '/admin/point',
                icon: <UploadOutlined />,
                label: 'Quản lý điểm'
              },
              {
                key: '/admin/province',
                icon: <UploadOutlined />,
                label: 'Quản lý thành phố'
              }
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default Admin
