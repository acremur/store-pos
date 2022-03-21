import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, message, Modal, Select, Table } from 'antd'
import { 
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined
} from '@ant-design/icons'
import axios from 'axios'

import DefaultLayout from "../components/DefaultLayout"

function Cart() {

  const { cartItems } = useSelector(state => state.rootReducer)
  const [subtotal, setSubtotal ] = useState(0)
  const [billChargeModal, setBillChargeModal ] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let tax = Number((subtotal * 0.1).toFixed(2))
  let total = Number(subtotal + tax)

  const increaseQuantity = record => {
    dispatch({
      type: 'updateCart',
      payload: { ...record, quantity: record.quantity + 1 }
    })
  }

  const decreaseQuantity = record => {
    if (record.quantity !== 1) {
      dispatch({
        type: 'updateCart',
        payload: { ...record, quantity: record.quantity - 1 }
      })
    }
  }

  const deleteItem = record => {
    dispatch({
      type: 'deleteFromcart',
      payload: { ...record }
    })
  }

  useEffect(() => {
    let temp = 0
    cartItems.forEach(({ price, quantity }) => {
      temp = temp + price * quantity
    })
    setSubtotal(temp)
  }, [cartItems])

  const onFinish = values => {   
    const reqObject = { 
      ...values, 
      cartItems,
      subtotal,
      tax,
      total,
      userId: JSON.parse(localStorage.getItem('pos-user'))._id
    }

    dispatch({ type: 'showLoading' })
    axios.post('/api/bills', reqObject)
    .then(() => {
      dispatch({ type: 'hideLoading' })
      message.success('Bill charged successfully')
      setBillChargeModal(false)
      dispatch({ type: 'emptyCart' })
      navigate('/bills')
    })
    .catch(error => {
      dispatch({ type: 'hideLoading' })
      message.error('Something went wrong')
      console.log(error)
    })
  }

  const emptyCart = () => {
    dispatch({ type: 'emptyCart' })
    window.location.reload()
  }
 
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image, record) => <img src={image} alt='' height={60} width={60} />
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: price => <span>{price} €</span>
    },
    {
      title: 'Quantity',
      dataIndex: '_id',
      render: (id, record) => <div>
        <MinusCircleOutlined className="icon mx-3" onClick={() => decreaseQuantity(record)}  />
        <b>{record.quantity}</b>
        <PlusCircleOutlined className="icon mx-3" onClick={() => increaseQuantity(record)} />
      </div>
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (id, record) => <DeleteOutlined className='icon' onClick={() => deleteItem(record)} />
    }
  ]
  
  return (
    <DefaultLayout>
        <div className="d-flex justify-content-between">
          <h3>Cart</h3>
          <Button onClick={emptyCart} type='primary'>Empty Cart</Button>
        </div>

        <Table 
          columns={columns} 
          dataSource={cartItems} 
          bordered 
          rowKey={row => row.name + Date.now()} 
        />

        <hr />

        <div className="d-flex justify-content-end flex-column align-items-end">
          <div className="subtotal">
            <h3>SUBTOTAL: <b>{subtotal} €/-</b></h3>
          </div>
          <Button 
            onClick={() => setBillChargeModal(true)}
            type='primary' 
            className='flex-column'
          >CHARGE BILL</Button>
        </div>

        <Modal 
          title='Charge Bill' 
          visible={billChargeModal} 
          footer={false} 
          onCancel={() => setBillChargeModal(false)}
        >
          <Form onFinish={onFinish} layout='vertical'>
            <Form.Item name='customerName' label='Customer Name'>
                <Input />
            </Form.Item>
            <Form.Item name='customerPhone' label='Phone Number'>
                <Input />
            </Form.Item>
            <Form.Item name='paymentMode' label='Payment Mode'>
                <Select>
                  <Select.Option value='cash'>Cash</Select.Option>
                  <Select.Option value='card'>Card</Select.Option>
                </Select>
            </Form.Item>
            <div className="charge-bill-amount">
              <h5>SubTotal: <b>{subtotal} €</b></h5>
              <h5>Tax: <b>{tax} €</b></h5>
              <hr />
              <h2>Total: <b>{total} €</b></h2>
            </div>
            <div className="d-flex justify-content-end">
              <Button htmlType='submit' type='primary'>GENERATE BILL</Button>
            </div>
          </Form> 
        </Modal>
    </DefaultLayout>
  )
}

export default Cart