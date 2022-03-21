import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux' 
import axios from 'axios'
import { Button, message, Modal, Table } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import { useReactToPrint } from 'react-to-print'

import DefaultLayout from '../components/DefaultLayout'

import '../resources/items.css'

function Bills() {

  const [bills, setBills] = useState([])
  const [billsModal, setBillsModal] = useState(false)
  const [selectedBill, setSelectedBill] = useState(null)
  const dispatch = useDispatch()
  const billRef = useRef()
  
  const getAllBills = () => {
    dispatch({ type: 'showLoading' })
    axios.get('/api/bills')
    .then(({ data }) => {
      dispatch({ type: 'hideLoading' })
      data.reverse()
      setBills(data)
    })
    .catch(error => {
      dispatch({ type: 'showLoading' })
      message.error('Something went wrong')
      console.log(error)
    })
  }
  
  useEffect(() => {
    getAllBills()
  }, [])

  const handlePrint = useReactToPrint({
    content: () => billRef.current
  })

  const columns = [
    {
      title: 'Id',
      dataIndex: '_id'
    },
    {
      title: 'Customer',
      dataIndex: 'customerName'
    },
    {
      title: 'SubTotal',
      dataIndex: 'subtotal',
      render: subtotal => <span>{subtotal} €</span>
    },
    {
      title: 'Tax',
      dataIndex: 'tax',
      render: tax => <span>{tax} €</span>
    },
    {
      title: 'Total',
      dataIndex: 'total',
      render: total => <span>{total} €</span>
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (id, record) => <div>
        <EyeOutlined 
          className='icon mx-2' 
          onClick={() => {
            setSelectedBill(record)
            setBillsModal(true)
          }} 
        />
      </div>
    }
  ]
  
  const cartColumns = [
    {
      title: 'NAME',
      dataIndex: 'name'
    },
    {
      title: 'PRICE',
      dataIndex: 'price',
      render: price => <span>{price} €</span>
    },
    {
      title: 'QUANTITY',
      dataIndex: '_id',
      render: (id, record) => <div>
        {record.quantity}
      </div>
    },
    {
      title: 'FARE',
      dataIndex: '_id',
      render: (id, record) => <div>
        {record.quantity * record.price} €
      </div>
    }
  ]
  
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Bills</h3>
      </div>
      <Table columns={columns} dataSource={bills} bordered rowKey={row => row._id + Date.now()} />
      {billsModal && (
        <Modal 
          onCancel={() => setBillsModal(false)} 
          visible={billsModal} 
          title={'Bill Details'}
          footer={false}
          width={800}
        >
          <div className='bill-modal p-3' ref={billRef}>
            <div className="d-flex justify-content-between bill-header pb-2">
              <div>
                <h1><b>SR STORE</b></h1>
              </div>
              <div>
                <p>Seville</p>
                <p>Parque Alcosa 41019</p>
                <p>705 462 498</p>
              </div>
            </div>
            <div className="bill-customer-details my-2">
              <p><b>Name:</b> {selectedBill.customerName}</p>
              <p><b>Phone Number:</b> {selectedBill.customerPhone}</p>
              <p><b>Date:</b> {selectedBill.createdAt.toString().substring(0, 10)}</p>
            </div>
            <Table 
              columns={cartColumns} 
              dataSource={selectedBill.cartItems} 
              rowKey={row => row.name + Date.now()} 
              pagination={false}
            />
            <div className='dotted-border py-2'>
              <p><b>SUBTOTAL :</b> {selectedBill.subtotal}€</p>
              <p><b>TAX :</b> {selectedBill.tax}€</p>
            </div>
            <div className='mt-3'>
              <h2><b>TOTAL :</b> {selectedBill.total}€</h2>
            </div>
            <div className="dotted-border" />
            <div className="text-center mt-3">
              <p>Thanks</p>
              <p>Visit Again :)</p>
            </div>
          </div>
          <div className="d-flex justify-content-end p-2">
            <Button type='primary' onClick={handlePrint}>Print Bill</Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  )
}

export default Bills