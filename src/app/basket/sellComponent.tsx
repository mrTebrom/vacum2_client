'use client';
import { RightOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/lib/store.hook';
import styles from './page.module.css';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { setPromocode } from '@/lib/slice/basket.slice';
export default function SellBasket() {
  const dispatch = useAppDispatch();
  const [promocodeValue, setPromocodeValue] = useState<string>('');
  const { products, discount, typeDiscount, namePromocode } = useAppSelector((state) => state.basket);
  const onPromocode = () => {
    axios.get('http://localhost:5000/api/promocode/' + promocodeValue).then((result) => {
      if (result.data.title) {
        dispatch(
          setPromocode({
            namePromocode: result.data.title,
            typeDiscount: result.data.discountType as 'percentage' | 'retail',
            discount: result.data.discount,
          }),
        );
      }
    });
  };
  return (
    <>
      <p className={styles.itog}>
        <span>Под. Итог</span>
        <span>
          {eval(
            products
              .map(
                (item) =>
                  (item.typeDiscont
                    ? item.price - (item.price * item.discont) / 100 // Если typeDiscont === true, применяем процентную скидку
                    : item.price - item.discont) * // Если typeDiscont === false, применяем фиксированную скидку
                  item.que,
              )
              .join('+'),
          ) || 0}
        </span>
      </p>

      <div className={styles.promocodeFlex}>
        <input type='text' className={styles.promocodeInput} value={promocodeValue} onChange={(event) => setPromocodeValue(event.currentTarget.value)} />
        <button className={styles.promocodeBtn} onClick={onPromocode}>
          <RightOutlined />
        </button>
      </div>
      <p className={styles.itog}>
        <span>Итог</span>
        <span>
          {eval(
            products
              .map(
                (item) =>
                  (item.typeDiscont
                    ? item.price - (item.price * item.discont) / 100 // Если typeDiscont === true, применяем процентную скидку
                    : item.price - item.discont) * // Если typeDiscont === false, применяем фиксированную скидку
                  item.que,
              )
              .join('+'),
          ) || 0}
        </span>
      </p>
      <Link href='/order'>
        <button className={styles.sellTelegram} disabled={products.length <= 0}>
          Покупка через Телеграм
        </button>
      </Link>
    </>
  );
}
