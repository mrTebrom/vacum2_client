"use client";
import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Col, Image, message, Row, Upload } from 'antd';
const props: UploadProps = {
   
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
interface IImage{
  id: number;
  image: string
}
export default function SliderComponent(){
  const [images, setImages] = useState<IImage[]>([])
  useEffect(() => {}, []);
  const get = () => {
    fetch('http://localhost:5000/api/slider', {
      method: 'GET',
      headers: {
        'authorization': 'Bearer '+ localStorage.getItem('access_token')
      }
    }).then(result => result.json()).then(setImages)
  }
  const onChange = (info: any) => {
    if (info.file.status === 'done') get()
  }
  const destroy = (id: number) => {
    fetch('http://localhost:5000/api/slider/'+id, {
      method: 'DELETE',
      headers: {
        'authorization': 'Bearer '+ localStorage.getItem('access_token')
      }
    }).then(get)
  }
  useEffect(() => {
    get()
  }, [])
  return <>
   
  <Upload action="http://localhost:5000/api/slider" onChange={onChange} listType="text" accept='image/*'>
    <Button icon={<UploadOutlined />}>Загрузить</Button>
  </Upload>
  {images.map((item => {
    return (
      <Row key={item.id}>
        <Col md={20}>
          <Image src={'/uploads/slider/'+item.image}/>{item.id}
        </Col>
        <Col md={4}>
          <Button type="primary" danger onClick={() => destroy(item.id)}>Удалить</Button>
        </Col>
      </Row>)
  }))}
  </>
}