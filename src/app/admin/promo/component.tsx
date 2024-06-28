"use client";
import { Form, Input, InputNumber, Row, Col, Button, Upload, UploadProps, message } from "antd";
import { useCreatePromoMutation, useGetPromoQuery } from "@/lib/query/promo.query";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import Image from "next/image";

export default function Component() {
  const [mutate] = useCreatePromoMutation();
  const [fileName, setFileName] = useState<string>("");
  const { data, refetch } = useGetPromoQuery();

  const onFinish = (value: object) => {
    mutate({ ...value, image: fileName });
  };

  const onChange = (info: any) => {
    if (info.file.status === "done") setFileName(info.file.response[0]);
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <Form
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              label="Заголовок"
              name="title"
              required
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Описание"
              name="description"
              required
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Ссылка"
              name="href"
              required
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Скидка (Нужно указать в процентах)"
              name="discont"
              required
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Картинка"
              name="img"
              required
            >
              <Upload
                action="http://localhost:5000/api/promo/upload"
                onChange={onChange}
                listType="text"
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Загрузить</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="buttonTitle"
              label="Надпись на кнопке"
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
              >
                Сахранить
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col md={1}></Col>
        <Col md={15}>
          <p>Заголовок: {data?.title}</p>
          <p>Описание: {data?.description}</p>
          <p>Скидка: {data?.discont}%</p>
          <p>Ссылка: {data?.href}</p>
          {data?.image && (
            <Image
              src={`/uploads/promo-pictures/${data.image}`}
              width={397}
              height={397}
              alt={data.title}
            />
          )}
        </Col>
      </Row>
    </>
  );
}
