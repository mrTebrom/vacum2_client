'use client';
import { Row, Col, Form, Input, InputNumber, Table, Button } from 'antd';

import { useState } from 'react';
import { PercentageOutlined, DeleteOutlined } from '@ant-design/icons';
import { IPromocode } from '@/lib/interface';
import { useCreatePromocodeMutation, useGetPromocodeQuery, useDestroyMutation } from '@/lib/query/promocode.query';
const stylesButtonTypeDiscont: React.CSSProperties = {
  cursor: 'pointer',
  width: '12px !important',
  display: 'block',
};

export default function PromocodeAdminPanel() {
  const [create] = useCreatePromocodeMutation();
  const [destroy] = useDestroyMutation();
  const { data } = useGetPromocodeQuery();
  const [type, setType] = useState<'retail' | 'percentage'>('retail');
  const setTypeDiscontPromocode = () => {
    setType(type === 'retail' ? 'percentage' : 'retail');
  };
  type TPromocode = Omit<IPromocode, 'id'>;
  const onFinish = (values: TPromocode) => {
    create({ ...values, discountType: type });
  };
  return (
    <Row>
      <Col span={6}>
        <Form layout='vertical' name='promocode' onFinish={onFinish}>
          <Form.Item label='Промокод' name='title'>
            <Input />
          </Form.Item>
          <Form.Item label='Скидка' name='discount'>
            <InputNumber
              style={{ width: '100%' }}
              max={type === 'percentage' ? 100 : 999999999}
              addonAfter={
                <span style={stylesButtonTypeDiscont} onClick={setTypeDiscontPromocode}>
                  {type === 'retail' ? '₸' : <PercentageOutlined />}
                </span>
              }
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit'>Создать</Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={18}>
        <Table dataSource={data?.map((item) => ({ ...item, key: item.id })) || []}>
          <Table.Column title='Промокод' dataIndex='title' key='id' />
          <Table.Column
            title='скидка'
            dataIndex='discount'
            key='id'
            render={(discount: number, recourd: IPromocode) => (
              <span>
                {discount} {recourd.discountType === 'retail' ? '₸' : <PercentageOutlined />}
              </span>
            )}
          />
          <Table.Column
            title=''
            dataIndex='id'
            key='id'
            render={(id: number) => (
              <Button icon={<DeleteOutlined />} type='primary' danger onClick={() => destroy(id)}>
                Удалить
              </Button>
            )}
          />
        </Table>
      </Col>
    </Row>
  );
}
