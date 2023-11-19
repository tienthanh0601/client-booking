import { Breadcrumb } from 'antd'
import React from 'react'

const AddTrip = () => {
  return (
    <div className="add-trip">
      <Breadcrumb
        style={{ marginBottom: '24px' }}
        items={[
          {
            title: 'Admin'
          },
          {
            title: 'Trip',
            href: '/admin/trip'
          },
          {
            title: 'Add Trip'
          }
        ]}
      />
    </div>
  )
}

export default AddTrip
