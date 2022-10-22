import { Card, Col, Form, Input, Row, Typography,Button, Table, Select } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import Title from 'antd/lib/skeleton/Title'
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useNavigate ,Link} from 'react-router-dom';
// import jsonwebtoken from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';

// import { Link } from 'react-router-dom';

export default function Home() {
  const { Title } = Typography;
  const [dataSource, setdataSource] = useState([]);
  const navigate =useNavigate();

  // useEffect(() => {
  //   axios.post("http://127.0.0.1:4000/getinfo",{token:localStorage.getItem('token')}).then(data => {
  //       setdataSource(data.data)
  //   })
  // }, [])

  useEffect(
    function(){
      if(localStorage.getItem('token')){
        const decodedToken=jwt_decode(localStorage.getItem('token'))
        console.log(decodedToken)
        if(decodedToken.active_status ) return 
        else navigate('/account')
      }
    }
  )
  
  const checkinfo= values =>{
    axios.post("http://127.0.0.1:4000/checkinfo", {
      phonenumber: values.phonenumber,
      location:values.location
    }).then(data => {
      // console.log(data)

      setdataSource(data.data)
    
    }).catch(error => console.log)
  }
  
  const columns = [
    {
      title: 'Semester',
      dataIndex: 'semester',
      key: 'semester',
    },
    {
      title: 'Payable',
      dataIndex: 'payable',
      key: 'payable',
    },
    {
      title: 'Paid',
      dataIndex: 'paid',
      key: 'paid',
    },
   {
      title: 'Due',
      dataIndex: 'due',
      key: 'due',
    },
  ];

  const CGPA = [4.00, 3.75, 3.50, 3.25, 3.00,2.75,2.50]
  const Sem = [2,3,4,5,6,7,8,9,10,11,12]

  
  return (
    <Card style={{ margin: "40px" }}>
      <Row justify='end'>
       <Button onClick={()=>{
        localStorage.removeItem('token')
        navigate('/login')
       }}>Log Out</Button>
      </Row>
      <Row justify='center'>
        <Title>Transaction History</Title>
      </Row>
      {/* <Row justify='center'>
        <Title>Information About Site</Title>
      </Row> */}
      
        <Form onFinish={checkinfo}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 12 }}
        labelAlign='right'
        style={{marginTop: '20px'}}>
        <Row justify='center'>
          <Col xs={24} >
            <Form.Item label='Please Enter CGPA'
              name='phonenumber'>
              <Select placeholder='Select CGPA'>
                {CGPA.map ((CGPA,index)=> {
                  return <Select.Option key={CGPA} values={CGPA}>
                  </Select.Option>
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row justify='center'>
          <Col xs={24} >
            <Form.Item label='Please Enter Semester'
              name='phonenumber'>
              <Select placeholder='Select Semester'>
                {Sem.map ((Sem,index)=> {
                  return <Select.Option key={Sem} values={Sem}>
                  </Select.Option>
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row justify='center'>
          <Button htmlType='submit'>
            Waiver Check
          </Button>
        </Row>
      </Form>
<Row justify='center'>
  
</Row>
      <Table dataSource={dataSource} columns={columns} />;

    </Card>
  )
}
