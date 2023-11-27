import axiosClient from './axiosClient'

const seatApi = {
  getAll(params) {
    const url = '/seat/all'
    return axiosClient.get(url, { params })
  },

  get(id) {
    const url = `/seat/details/${id}`
    return axiosClient.get(url)
  },
  create(data) {
    const url = '/seat/create'
    return axiosClient.post(url, data)
  },
  update(data) {
    const url = `/seat/update/${data.id}`
    return axiosClient.put(url, data)
  },
  remove(id) {
    const url = `/seat/delete/${id}`
    return axiosClient.delete(url)
  }
}

export default seatApi
