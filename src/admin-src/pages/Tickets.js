import React, { Fragment, useRef, useState } from 'react'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import { Button, Input, Popconfirm, Space, Table } from 'antd'

const data = [
  {
    key: '1',
    id: '65466bb4dcf72ebeac597f9c',
    name: 'John Brown',
    phone: 32347895,
    from: 'New York',
    to: 'New York',
    day: '22/10/2023',
    totalAmount: '400.000',
    numberSeat: 'A1 , A2',
    point: 'Quảng Ngãi - Gia Lai',
    status: 'Hết hạn'
  },
  {
    key: '1',
    id: '65466bb4dcf72ebeac597f9c',
    name: 'John Brown',
    phone: 32347895,
    from: 'New York',
    to: 'New York',
    day: '22/10/2023',
    totalAmount: '400.000',
    numberSeat: 'A1 , A2',
    point: 'Quảng Ngãi - Gia Lai',
    status: 'Hết hạn'
  },
  {
    key: '1',
    id: '65466bb4dcf72ebeac597f9c',
    name: 'John Brown',
    phone: 32347895,
    from: 'New York',
    to: 'New York',
    day: '22/10/2023',
    totalAmount: '400.000',
    numberSeat: 'A1 , A2',
    point: 'Quảng Ngãi - Gia Lai',
    status: 'Hết hạn'
  },
  {
    key: '1',
    id: '65466bb4dcf72ebeac597f9c',
    name: 'John Brown',
    phone: 32347895,
    from: 'New York',
    to: 'New York',
    day: '22/10/2023',
    totalAmount: '400.000',
    numberSeat: 'A1 , A2',
    point: 'Quảng Ngãi - Gia Lai',
    status: 'Hết hạn'
  }
]

const Tickets = () => {
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
      title: 'Mã vé',
      dataIndex: 'id',
      key: 'name',
      width: '10%',
      ...getColumnSearchProps('name')
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
      ...getColumnSearchProps('name')
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: '10%',
      ...getColumnSearchProps('address'),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend']
    },
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
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: '10%'
    },
    {
      title: 'Number Seats',
      dataIndex: 'numberSeat',
      key: 'numberSeat',
      width: '10%'
    },
    {
      title: 'Point',
      dataIndex: 'point',
      key: 'point',
      width: '10%'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '10%'
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

export default Tickets
