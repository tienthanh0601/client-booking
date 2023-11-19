import React, { Fragment, useRef, useState } from 'react'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import { Button, Input, Popconfirm, Space, Table } from 'antd'
import ModalListPoint from '../components/ModalListPoint'

const data = [
  {
    key: '1',
    from: 'Quảng Ngãi',
    to: 'Sài Gòn',
    day: '22/10/2023',
    timeStart: '19:00:00',
    timeend: '06:00:00',
    price: '400.000',
    vehicle: 'Xe số 1',
    status: 'Đang chạy'
  }
]

const TripManagement = () => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null)
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }
  const handleReset = (clearFilters) => {
    clearFilters()
    setSearchText('')
  }
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close
    }) => (
      <div
        style={{
          padding: 8
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block'
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false
              })
              setSearchText(selectedKeys[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  })
  const columns = [
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
      width: '10%'
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      width: '10%'
    },
    {
      title: 'Day',
      dataIndex: 'day',
      key: 'day',
      width: '10%'
    },
    {
      title: 'Time Start',
      dataIndex: 'timeStart',
      key: 'timeStart',
      width: '10%'
    },
    {
      title: 'Time End',
      dataIndex: 'timeend',
      key: 'timeEnd',
      width: '10%'
    },
    {
      title: 'Vehicle',
      dataIndex: 'vehicle',
      key: 'vehicle',
      width: '10%'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: '10%'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '10%'
    },
    {
      title: 'Chi tiết vé',
      render: () => {
        return (
          <Fragment>
            <div>
              <ModalListPoint />
            </div>
          </Fragment>
        )
      }
    },
    {
      title: 'Action',

      render: (text, item) => {
        return (
          <Fragment>
            <div className="btn-action">
              <button
                className="mr-3"
                // onClick={() => {
                //   dispatch({
                //     type: SET_MODAL,
                //     title: 'EDIT USER',
                //     content: <EditUser id={item.id} />,
                //     width: 600
                //   })
                // }}
              >
                <EditOutlined className="btn-edit" />
              </button>
              <Popconfirm
                placement="topLeft"
                title={'Bạn có muốn xóa tài khoản này'}
                // onConfirm={() => {
                //   dispatch(deleteUserAction(item.id))
                // }}
                // okText="Yes"
                // cancelText="No"
              >
                <button className="text-red-700">
                  <DeleteOutlined className="btn-delete" />
                </button>
              </Popconfirm>
            </div>
          </Fragment>
        )
      }
    }
  ]
  return (
    <div className="">
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default TripManagement
