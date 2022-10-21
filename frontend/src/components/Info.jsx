
import { Card, Col, Form, Input, Row, Typography,Button } from 'antd'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';

export default function Info() {
  const { Title } = Typography;
  const navigate =   useNavigate()

  useEffect(
    function(){
      if(localStorage.getItem('token')){
        const decodedToken=jwt_decode(localStorage.getItem('token'))
        console.log(decodedToken)
        if(decodedToken.active_status ) navigate('/Info') 
      }
    },[]
  )
  

  const info= values =>{
    console.log("register: ", values);
    axios.post("http://127.0.0.1:4000/info", {
      fullname: values.fullname,
      phoneNumber: values.phoneNumber,
      department: values.department,
      sscpoint: values.sscpoint,
      hscpoint: values.hscpoint,
      token:localStorage.getItem('token')
    }).then(data => {
      localStorage.setItem('token',data.data)
      navigate('/Newlyadmit')
    }).catch(error => console.log)
  }

  return (
    <Card style={{ margin: "40px" }}>
      <Row justify='center'>
        <Title>Create Account</Title>
      </Row>

      <Form onFinish={info}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 12 }}
        labelAlign='right'>
        <Row justify='center'>
          <Col xs={24} >
            <Form.Item label='Full Name'
              name='fullname'>
              <Input>
              </Input>
            </Form.Item>
          </Col>
          <Col xs={24} >
            <Form.Item label='Phone Number'
              name='phoneNumber'>
              <Input>
              </Input>
            </Form.Item>
          </Col>
          <Col xs={24} >
            <Form.Item label='Department'
              name='department'>
              <Input>
              </Input>
            </Form.Item>
          </Col>
          <Col xs={24} >
            <Form.Item label='SSC Point'
              name='sscpoint'>
              <Input>
              </Input>
            </Form.Item>
          </Col>
          <Col xs={24} >
            <Form.Item label='HSC Point'
              name='hscpoint'>
              <Input>
              </Input>
            </Form.Item>
          </Col>
        </Row>
        <Row justify='center'>
          <Button htmlType='submit'>
            Submit
          </Button>
        </Row>
      </Form>
    </Card>


  )
}
