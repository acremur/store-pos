import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux' 
import axios from 'axios'
import { Button, Form, Input, message, Modal, Select, Table } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import DefaultLayout from '../components/DefaultLayout'

function Items() {

  const [items, setItems] = useState([])
  const [itemModal, setItemModal] = useState(false)
  const [editedItem, setEditedItem] = useState(null)
  const dispatch = useDispatch()
  
  const getAllItems = () => {
    dispatch({ type: 'showLoading' })
    axios.get('/api/items')
    .then(({ data }) => {
      dispatch({ type: 'hideLoading' })
      setItems(data)
    })
    .catch(error => {
      dispatch({ type: 'showLoading' })
      message.error('Something went wrong')
      console.log(error)
    })
  }
  
  useEffect(() => {
    getAllItems()
  }, [])

  const onFinish = values => {
    dispatch({ type: 'showLoading' })
    
    if (editedItem) {
      axios.put(`/api/items/${editedItem._id}`, values)
      .then(({ data }) => {
        dispatch({ type: 'hideLoading' })
        message.success('Item edited succesfully')
        setEditedItem(null)
        setItemModal(false)
        getAllItems()
      })
      .catch(error => {
        dispatch({ type: 'showLoading' })
        message.error('Something went wrong')
        console.log(error)
      })
    } else {
      axios.post('/api/items', values)
      .then(({ data }) => {
        dispatch({ type: 'hideLoading' })
        message.success('Item added succesfully')
        setItemModal(false)
        getAllItems()
      })
      .catch(error => {
        dispatch({ type: 'showLoading' })
        message.error('Something went wrong')
        console.log(error)
      })
    }
  }

  const editItem = record => {
    setEditedItem(record)
    setItemModal(true)
  }

  const deleteItem = record => {
    dispatch({ type: 'showLoading' })
    axios.delete(`/api/items/${record._id}`)
    .then(({ data }) => {
      dispatch({ type: 'hideLoading' })
      message.success('Item deleted succesfully')
      getAllItems()
    })
    .catch(error => {
      dispatch({ type: 'showLoading' })
      message.error('Something went wrong')
      console.log(error)
    })
  }

  const closeModal = () => {
    setEditedItem(null)
    setItemModal(false)
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
      title: 'Category',
      dataIndex: 'category'
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (id, record) => <div>
        <EditOutlined className='icon mx-2' onClick={() => editItem(record)} />
        <DeleteOutlined className='icon mx-2' onClick={() => deleteItem(record)} />
      </div>
    }
  ]
  
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Items</h3>
        <Button onClick={() => setItemModal(true)} type='primary'>Add Item</Button>
      </div>
      <Table columns={columns} dataSource={items} bordered rowKey={row => row.name + Date.now()} />
      {itemModal && (
        <Modal 
          onCancel={closeModal} 
          visible={itemModal} 
          title={editedItem ? 'Edit Item' : 'Add New Item'}
          footer={false}
        >
          <Form initialValues={editedItem} onFinish={onFinish} layout='vertical'>
            <Form.Item name='name' label='Name'>
                <Input />
            </Form.Item>
            <Form.Item name='price' label='Price'>
                <Input />
            </Form.Item>
            <Form.Item name='image' label='Image URL'>
                <Input />
            </Form.Item>
            <Form.Item name='category' label='Category'>
                <Select>
                  <Select.Option value='fruits'>Fruits</Select.Option>
                  <Select.Option value='vegetables'>Vegetables</Select.Option>
                  <Select.Option value='meat'>Meat</Select.Option>
                </Select>
            </Form.Item>
            <div className="d-flex justify-content-end">
              <Button htmlType='submit' type='primary'>{editedItem ? 'EDIT' : 'SAVE'}</Button>
            </div>
          </Form>  
        </Modal>
      )}
    </DefaultLayout>
  )
}

export default Items