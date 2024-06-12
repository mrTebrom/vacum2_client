'use client';

import { useAppSelector } from "@/lib/store.hook";

const BasketRows = () => {
  const {products} = useAppSelector(state => state.basket)
  return <>{products.map(item => item.title)}</>
}

 
export default BasketRows