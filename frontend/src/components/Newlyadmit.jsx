import { Card, Col, Form, Input, Row, Typography,Button, Table } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import Title from 'antd/lib/skeleton/Title'
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useNavigate ,Link} from 'react-router-dom';
// import jsonwebtoken from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';

// import { Link } from 'react-router-dom';

export default function Newlyadmit() {
  const { Title } = Typography;
  const [dataSource, setdataSource] = useState([]);
  const navigate =useNavigate();

  useEffect(() => {
    axios.post("http://127.0.0.1:4000/getinfo",{token:localStorage.getItem('token')}).then(data => {
        setdataSource(data.data)
    })
  }, [])
  
  const NewlyadmitInfo= values =>{
    axios.post("http://127.0.0.1:4000/NewlyadmitInfo", {
      phonenumber: values.phonenumber,
      location:values.location
    }).then(data => {
      // console.log(data)

      setdataSource(data.data)
    
    }).catch(error => console.log)
  }
  
  // const columns = [
  //   {
  //     title: 'Semester',
  //     dataIndex: 'semester',
  //     key: 'semester',
  //   },
  //   {
  //     title: 'Total Fee Without Waive',
  //     dataIndex: 'totalfee',
  //     key: 'totalfee',
  //   },
  //   {
  //     title: 'Waive (%)',
  //     dataIndex: 'waive',
  //     key: 'waive',
  //   },
  //   {
  //     title: 'Total Fee After Waive',
  //     dataIndex: 'afterwaivefee',
  //     key: 'afterwaivefee',
  //   },{
  //     title: 'Total Deu',
  //     dataIndex: 'deu',
  //     key: 'deu',
  //   },
  // ];
  
  return (
    <Card style={{ margin: "40px" }}>
      <Row justify='end'>
      <Button onClick={()=>{
        navigate('/home')
       }}> Home</Button>

       <Button onClick={()=>{
        localStorage.removeItem('token')
        navigate('/login')
       }}>Log Out</Button>
      </Row>

      <Row justify='center'>
        <Title>Information About This Semester</Title>
      </Row>
      <Row justify='left'>
         <h3>Your payable amount is :</h3>
        </Row>
    
        
<Row justify='center'>
  {/* <Title >Summary</Title> */}
</Row>
      {/* <Table dataSource={dataSource} columns={columns} />; */}

    </Card>
  )
}
