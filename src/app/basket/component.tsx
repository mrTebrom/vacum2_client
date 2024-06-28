"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Button, InputNumber } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import { IBasket } from "@/lib/interface";
import { useAppDispatch, useAppSelector } from "@/lib/store.hook";
import { changeQue, remove, setBasket } from "@/lib/slice/basket.slice";

const Row = ({ item, destroy }: { item: IBasket; destroy: Function }) => {
  const dispatch = useAppDispatch();
  const { title, price, que, img, id, discont, typeDiscont } = item;
  const [value, setValue] = useState(que);

  const onChange = (value: number) => {
    setValue(value);
    let storage = localStorage.getItem("basket");
    let parse = storage ? (JSON.parse(storage) as IBasket[]) : null;
    if (parse) {
      let index = parse.findIndex((item) => item.id === id);
      if (index !== -1) {
        parse[index].que = value;
        localStorage.setItem("basket", JSON.stringify(parse));
      }
    }
    dispatch(changeQue({ id: item.id, que: value }));
  };

  return (
    <div className={styles.layout}>
      <div className={styles.layoutImage}>
        <Image
          src={img}
          layout="responsive"
          width={200}
          height={200}
          loading="eager"
          alt={title}
        />
      </div>
      <div className={styles.layoutTitle}>{title}</div>
      <div className={styles.layoutPrice}>
        <s style={{ color: "red", fontSize: 12 }}>{price}</s>
        <br />
        {typeDiscont ? price - (price * discont) / 100 : price - discont}
      </div>
      <div className={styles.layoutQue}>
        <InputNumber
          value={value}
          onChange={(e) => (e ? onChange(e) : null)}
          style={{ pointerEvents: "visible" }}
        />
      </div>
      <div className={styles.layoutItog}>{typeDiscont ? (price - (price * discont) / 100) * value : (price - discont) * value}</div>
      <div className={styles.close}>
        <Button
          shape="circle"
          onClick={() => destroy(id)}
        >
          <CloseCircleFilled />
        </Button>
      </div>
    </div>
  );
};

const BasketRows = () => {
  const { products } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  const destroy = (id: number) => {
    const index = products.findIndex((item) => item.id === id);
    const copy = [...products];
    copy.splice(index, 1);
    localStorage.setItem("basket", JSON.stringify(copy));
    dispatch(remove({ id: id }));
  };

  useEffect(() => {
    let initial = localStorage.getItem("basket");
    if (initial) {
      const parse = JSON.parse(initial) as IBasket[];
      dispatch(setBasket(parse));
    }
  }, [dispatch]);

  return (
    <>
      {products?.map((item) => (
        <Row
          key={item.id}
          item={item}
          destroy={destroy}
        />
      ))}
    </>
  );
};

export default BasketRows;
