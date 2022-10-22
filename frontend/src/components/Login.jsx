import { Button, Card, Checkbox, Form, Input, Row, Typography,Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from "axios";

export default function Login() {
    const {Title} = Typography;
const nav=useNavigate();
    const login = (values) =>{
      console.log("login: ", values);
      axios.post("http://127.0.0.1:4000/login", {
        phone: values.phonenumber,
        password: values.password
      }).then(data => {
        // console.log(data)
        localStorage.setItem('token',data.data)
        nav('/home')
      }).catch(error => console.log)
    }
    useEffect(
      function(){
        if(localStorage.getItem('token')){
          nav('/home')
        }
      }
    )

  return (
    <>
<Card style={{margin : "40px"}}>
    <Row justify='center'>
    <Title>Log in page </Title>
    </Row>
    <Form onFinish={login}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 12 }}
        labelAlign='right'>
        <Row justify='center'>
          <Col xs={24}>
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
            Login
          </Button>
          <pre>  or  </pre>
          <Button htmlType='submit' onClick={() => {
            nav('/')
          }}>
            Register
          </Button>
        </Row>
      </Form>
</Card>
    </>
  )
}
