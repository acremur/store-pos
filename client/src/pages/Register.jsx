import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Col, Form, Input, message, Row } from "antd"
import axios from 'axios'

import '../resources/authentication.css'

function Register() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = values => {
    dispatch({ type: 'showLoading' })
    
    const {name, password, userId} = values    
    if (name === '' || password === '' || userId === '') {
       return message.warning('Please fill in all fields')
    }
    
    axios.post('/api/users/register', values)
    .then(res => {
      dispatch({ type: 'hideLoading' })
      message.success('Successfully registered. Please login')
      navigate('/login')
    })
    .catch(error => {
      dispatch({ type: 'hideLoading' })
      message.error('Something went wrong. Check that User Id not exist')
      console.log(error)
    })
  }

  useEffect(() => {
    if (localStorage.getItem('pos-user')) {
      navigate('/home')
    }
  }, [navigate])

  return (
    <div className="authentication">
      <Row>
        <Col lg={8} xs={22}>
          <Form onFinish={onFinish} layout='vertical'>
            <h1><b>Store POS</b></h1>
            <hr />
            <h3>Register</h3>
            <Form.Item name='name' label='Name'>
                <Input />
            </Form.Item>
            <Form.Item name='userId' label='User ID'>
                <Input />
            </Form.Item>
            <Form.Item name='password' label='Password'>
                <Input type='password' />
            </Form.Item>
            <div className="d-flex align-items-center justify-content-between">
              <Link to='/login'>Already registered? Click here to login</Link>
              <Button htmlType='submit' type='primary'>Register</Button>
            </div>
          </Form>  
        </Col>
      </Row>
    </div>
  )
}

export default Register