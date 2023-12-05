import React, { Fragment, useEffect, useRef, useState } from 'react'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import { Button, Input, Popconfirm, Space, Table } from 'antd'
import ticketApi from '../../api/ticketApi'
import pointApi from '../../api/PointApi'

const getPointByID = (id, points) => {
  const find = points.find((x) => x._id === id)
  return find !== undefined ? find.name : ''
}

const Tickets = () => {
  // lấy tat cả tieket ra
  const [ticketList, setTicketList] = useState([])
  const [pointList, setPointList] = useState([])
  // tát cả point
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef(null)

  useEffect(() => {
    const fetchTicket = async () => {
      const pointList = await ticketApi.getAll()
      setTicketList(pointList.data)
    }
    fetchTicket()
  }, [])

  useEffect(() => {
    const fetchPoint = async () => {
      const points = await pointApi.getAll()
      setPointList(points.data)
    }
    fetchPoint()
  }, [])

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
      dataIndex: '_id',
      key: '_id',
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
      title: 'Email',
      dataIndex: 'email',
      key: 'from',
      width: '10%'
    },
    {
      title: 'From',
      dataIndex: 'pickedPoint',
      key: 'from',
      width: '10%',
      render: (text, record) => getPointByID(record.pickedPoint, pointList).name
    },
    {
      title: 'To',
      dataIndex: 'droppedPoint',
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
      dataIndex: 'total',
      key: 'total',
      width: '10%'
    },
    {
      title: 'Number Seats',
      dataIndex: 'seatId',
      key: 'seatId',
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
      <Table columns={columns} dataSource={ticketList} />
      {/* <table>
        <tr>
          <th>Mã ghế</th>
          <th>name</th>
          <th>Email</th>
          <th>phone</th>
          <th>Gia tiền</th>
          <th>Ghế ngồi</th>
          <th>điểm đón / Trả</th>
        </tr>

        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td></td>
          <td>3</td>
        </tr>
      </table> */}
    </div>
  )
}

export default Tickets
