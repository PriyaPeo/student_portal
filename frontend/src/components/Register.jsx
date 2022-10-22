import { Card, Col, Form, Input, Row, Typography,Button } from 'antd'
// import FormItem from 'antd/es/form/FormItem'
import Title from 'antd/lib/skeleton/Title'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';

export default function Register() {
  const { Title } = Typography;
const navigate =   useNavigate()

  const register= values =>{
    console.log("register: ", values);
    axios.post("http://127.0.0.1:4000/register", {
      phone: values.phonenumber,
      password: values.password
    }).then(data => {
      // console.log(data)
      localStorage.setItem('token',data.data)
      navigate('/account')
    }).catch(error => console.log)
  }

  useEffect(
    function(){
      if(localStorage.getItem('token')){
        const decodedToken=jwt_decode(localStorage.getItem('token'))
        console.log(decodedToken)
        // if(decodedToken.active_status ) return 
        // else navigate('/home')
      }
    },[]
  )

  
  return (
    <Card style={{ margin: "40px" }}>
      <Row justify='center'>
        <Title>Register</Title>
      </Row>

      <Form
      onFinish={register}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 12 }}
        labelAlign='right'>
        <Row justify='center'>
          <Col xs={24} >
            <Form.Item label='Phone Number'
              name='phonenumber'>
              <Input>
              </Input>
            </Form.Item>
          </Col>
          <Col xs={24} >
            <Form.Item label='Password'
              name='password'>
              <Input>
              </Input>
            </Form.Item>
          </Col>
        </Row>
        <Row justify='center'>
          <Button htmlType='submit'>
            Register
          </Button>
          <pre>  or  </pre>
          <Button htmlType='submit' onClick={() => {
            navigate('/login')
          }}>
            Login
          </Button>
        </Row>
      </Form>
    </Card>


  )
}
