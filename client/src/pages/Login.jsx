import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, Col, Form, Input, message, Row } from "antd"
import axios from 'axios'

import '../resources/authentication.css'

function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = values => {
    dispatch({ type: 'showLoading' })

    const { password, userId} = values    
    if (password === undefined || userId === '') {
       return message.warning('Please fill in all fields')
    }
    
    axios.post('/api/users/login', values)
    .then(res => {
      dispatch({ type: 'hideLoading' })
      message.success('Successfully logged')
      localStorage.setItem('pos-user', JSON.stringify(res.data))
      navigate('/home')
    })
    .catch(() => {
      dispatch({ type: 'hideLoading' })
      message.error('Something went wrong. Check User Id and password')
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
            <h3>Login</h3>
            <Form.Item name='userId' label='User ID'>
                <Input />
            </Form.Item>
            <Form.Item name='password' label='Password'>
                <Input type='password' />
            </Form.Item>
            <div className="d-flex align-items-center justify-content-between">
              <Link to='/register'>Not registered yet? Click here</Link>
              <Button htmlType='submit' type='primary'>Login</Button>
            </div>
          </Form>  
        </Col>
      </Row>
    </div>
  )
}

export default Login