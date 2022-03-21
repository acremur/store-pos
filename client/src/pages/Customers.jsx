import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux' 
import axios from 'axios'
import { message, Table } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'

import DefaultLayout from '../components/DefaultLayout'

import '../resources/items.css'

function Customers() {

  const [bills, setBills] = useState([])
  const [reverse, setReverse] = useState(false)
  const dispatch = useDispatch()
  
  const getAllBills = () => {
    dispatch({ type: 'showLoading' })
    axios.get('/api/bills')
    .then(({ data }) => {
      dispatch({ type: 'hideLoading' })
      sortDates(data, reverse)
      setBills(data)
    })
    .catch(error => {
      dispatch({ type: 'showLoading' })
      message.error('Something went wrong')
      console.log(error)
    })
  }

  const reverseData = () => {
    setReverse(!reverse)
    getAllBills()
  }

  const sortDates = (data, reverse) => {
    data.sort((a, b) => {
      const formatDate = dateStr => {
        dateStr = dateStr.split('-').join('')
        dateStr = dateStr.split(':').join('')
        dateStr = dateStr.split('.').join('')
        dateStr = dateStr.split('T').join('')
        dateStr = dateStr.split('Z').join('')
        dateStr = Number(dateStr)
        return dateStr
      }
      
      let dateNumA = formatDate(a.createdAt)
      let dateNumB = formatDate(b.createdAt)

      return reverse ? dateNumA - dateNumB : dateNumB - dateNumA
    })
  }

  useEffect(() => {
    getAllBills()
  }, [])

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'customerName'
    },
    {
      title: 'Phone Number',
      dataIndex: 'customerPhone'
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: value => <span>{value.toString().substring(0, 10)}</span>
    }
  ]
    
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Bills</h3>
        {reverse 
        ? <DownOutlined className='icon' onClick={reverseData} /> 
        : <UpOutlined className='icon' onClick={reverseData} />}
      </div>
      <Table columns={columns} dataSource={bills} bordered rowKey={row => row._id + Date.now()} />
    </DefaultLayout>
  )
}

export default Customers