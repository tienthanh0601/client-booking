import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Popconfirm, Table, message } from 'antd'
import ModalListPoint from '../components/ModalListPoint'
import { BsBusFrontFill } from 'react-icons/bs'
import tripApi from '../../api/tripApi'
import StationApi from '../../api/StationApi'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import vehicleApi from '../../api/VehicleApi'
dayjs.extend(customParseFormat)
const TripManagement = () => {
  const navigate = useNavigate()

  // const [searchText, setSearchText] = useState('')
  // const [searchedColumn, setSearchedColumn] = useState('')
  // const searchInput = useRef(null)

  const [tripList, setTripList] = useState([])
  const [stations, setStations] = useState([])

  useEffect(() => {
    const fetchTrip = async () => {
      const tripList = await tripApi.getAll()
      const responseGetStations = await StationApi.getAll()
      const responseGetVehicle = await vehicleApi.getAll()
      console.log(tripList.allTrip)
      setTripList(tripList.allTrip)
      setStations(responseGetStations.data)

      const updatedTripList = tripList.allTrip.map((trip) => {
        const station = responseGetStations.data.find(
          (s) => s.id === trip.stationId
        )
        const vehicles = responseGetVehicle.data.find(
          (s) => s.id === trip.vehicleId
        )
        return {
          ...trip,
          day: dayjs(trip.day).format('DD/MM/YYYY')
        }
      })

      setTripList(updatedTripList)
    }
    fetchTrip()
  }, [tripList])

  const handleDelete = async (id) => {
    await tripApi.remove(id)
    const tripList = await tripApi.getAll()
    setTripList(tripList.data)
    message.success('Xoá chuyến xe thành công')
  }

  const handleToAdd = () => {
    navigate('/admin/add-trip')
  }

  const cancel = (e) => {
    console.log(e)
    message.error('Click on No')
  }

  // const getColumnSearchProps = (dataIndex) => ({
  //   filterDropdown: ({
  //     setSelectedKeys,
  //     selectedKeys,
  //     confirm,
  //     clearFilters,
  //     close
  //   }) => (
  //     <div
  //       style={{
  //         padding: 8
  //       }}
  //       onKeyDown={(e) => e.stopPropagation()}
  //     >
  //       <Input
  //         ref={searchInput}
  //         placeholder={`Search ${dataIndex}`}
  //         value={selectedKeys[0]}
  //         onChange={(e) =>
  //           setSelectedKeys(e.target.value ? [e.target.value] : [])
  //         }
  //         onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //         style={{
  //           marginBottom: 8,
  //           display: 'block'
  //         }}
  //       />
  //       <Space>
  //         <Button
  //           type="primary"
  //           onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
  //           icon={<SearchOutlined />}
  //           size="small"
  //           style={{
  //             width: 90
  //           }}
  //         >
  //           Search
  //         </Button>
  //         <Button
  //           onClick={() => clearFilters && handleReset(clearFilters)}
  //           size="small"
  //           style={{
  //             width: 90
  //           }}
  //         >
  //           Reset
  //         </Button>
  //         <Button
  //           type="link"
  //           size="small"
  //           onClick={() => {
  //             confirm({
  //               closeDropdown: false
  //             })
  //             setSearchText(selectedKeys[0])
  //             setSearchedColumn(dataIndex)
  //           }}
  //         >
  //           Filter
  //         </Button>
  //         <Button
  //           type="link"
  //           size="small"
  //           onClick={() => {
  //             close()
  //           }}
  //         >
  //           close
  //         </Button>
  //       </Space>
  //     </div>
  //   ),
  //   filterIcon: (filtered) => (
  //     <SearchOutlined
  //       style={{
  //         color: filtered ? '#1677ff' : undefined
  //       }}
  //     />
  //   ),
  //   onFilter: (value, record) =>
  //     record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  //   onFilterDropdownOpenChange: (visible) => {
  //     if (visible) {
  //       setTimeout(() => searchInput.current?.select(), 100)
  //     }
  //   },
  //   render: (text) =>
  //     searchedColumn === dataIndex ? (
  //       <Highlighter
  //         highlightStyle={{
  //           backgroundColor: '#ffc069',
  //           padding: 0
  //         }}
  //         searchWords={[searchText]}
  //         autoEscape
  //         textToHighlight={text ? text.toString() : ''}
  //       />
  //     ) : (
  //       text
  //     )
  // })

  const columns = [
    {
      title: 'From Station',
      dataIndex: 'from',
      key: 'from',
      width: '10%'
    },
    {
      title: 'To Station',
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
      title: 'Vehicle',
      dataIndex: 'vehicle',
      key: 'vehicle',
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
      },
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
                // onClick={() => handleEditUser(item._id)}
              >
                <EditOutlined className="btn-edit" />
              </button>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={() => handleDelete(item._id)}
                okText="Yes"
                cancelText="No"
                onCancel={cancel}
              >
                <button>
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
    <div className="trip-management">
      <Breadcrumb
        style={{ marginBottom: '24px' }}
        items={[
          {
            title: 'Admin'
          },
          {
            title: 'Trip'
          }
        ]}
      />
      <Button
        type="primary"
        size="large"
        onClick={handleToAdd}
        style={{ marginBottom: '24px' }}
        icon={<PlusOutlined />}
      >
        Thêm chuyến xe
      </Button>
      <Table columns={columns} dataSource={tripList} />
    </div>
  )
}

export default TripManagement
