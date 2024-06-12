'use client';
import { IBasket, IProduct } from '@/lib/interface';
import { FC } from 'react';

interface Prop {
  product: IProduct;
  className: any;
}
export const AddBasket: FC<Prop> = ({ product, className }) => {
  const add = () => {
    const initial = localStorage.getItem('basket');
    const initialParse = initial ? (JSON.parse(initial) as IBasket[]) : [];
    const candidate = initialParse.findIndex((item) => item.id === product.id);

    if (candidate > -1) {
      initialParse[candidate].que += 1;
    } else {
      initialParse.push({
        title: product.title,
        que: 1,
        id: product.id,
        img: product.images[0],
        price: product.price,
        discont: product.discont,
        typeDiscont: product.typeDiscont,
      });
    }
    localStorage.setItem('dd', 'dd');
    localStorage.setItem('basket', JSON.stringify(initialParse));
  };
  return (
    <button onClick={add} className={className}>
      Добавить в карзину
    </button>
  );
};
