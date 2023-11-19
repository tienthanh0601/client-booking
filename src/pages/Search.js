import React from 'react'
import '../scss/search.scss'
import SearchTickets from '../components/SearchTickets'
import SideBar from '../components/SideBar'
import Trip from '../components/Trip'

const Search = () => {
  return (
    <div className="search-trip">
      <SearchTickets />
      <div className="search-container">
        <SideBar />
        <div className="list-trip">
            <div className="des-trip">
                <span className='title-trip'>Đà Nẵng - Hồ Chí Minh (7)</span>
            </div>
          <Trip />
          <Trip />
          <Trip />
          <Trip />
          <Trip />
        </div>
      </div>
    </div>
  )
}

export default Search
