"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Modal, Result } from "antd";
import styles from "./styles.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/store.hook";
import { setBasket } from "@/lib/slice/basket.slice";
import { IBasket } from "@/lib/interface";
import axios from "axios";
import ReactInputMask from "react-input-mask";
import { redirectAction } from "./redirect";

export default function Form() {
  const { products } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    phone: "+7",
    comment: "",
    paymentType: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    phone: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onClose = () => {
    setOpen(false);
    dispatch(setBasket([]));
    redirectAction();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.firstName.length < 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: "Имя должно содержать не менее 3 символов",
      }));
      return;
    }

    const phoneRegex = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
    if (!phoneRegex.test(formData.phone)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Некорректный формат телефона (ожидается: +7(777)777-77-77)",
      }));
      return;
    }

    setErrors({
      firstName: "",
      phone: "",
    });

    axios
      .post("http://localhost:5000/api/order", {
        name: formData.firstName,
        phone: formData.phone,
        type: formData.paymentType,
        basket: products,
        comment: formData.comment,
      })
      .then((respoce) => {
        setOpen(true);
      });
  };

  useEffect(() => {
    let initial = localStorage.getItem("basket");
    if (initial) {
      const parse = JSON.parse(initial) as IBasket[];
      dispatch(setBasket(parse));
    }
  }, [dispatch]);

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <div>
        <label htmlFor="firstName">Имя</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}
        <label htmlFor="phone">Телефон</label>
        <ReactInputMask
          mask="+7(999)999-99-99"
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        {errors.phone && <p className={styles.error}>{errors.phone}</p>}
        <label htmlFor="comment">Комментарий</label>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleInputChange}
          cols={30}
          rows={10}
        ></textarea>
      </div>
      <div>
        <div className={styles.itog}>
          <h1>Общий итог</h1>
          {eval(products.map((item) => item.que * item.price).join("+"))}
        </div>
        <h3 className={styles.h3}>Способ оплаты</h3>
        <label htmlFor="kaspi">
          <input
            type="radio"
            name="paymentType"
            value="Каспи"
            onChange={handleInputChange}
            className={styles.checkbox}
          />
          Оплатит сейчас (Kaspi QR)
        </label>
        <label htmlFor="cash">
          <input
            type="radio"
            name="paymentType"
            value="Наличка"
            onChange={handleInputChange}
            className={styles.checkbox}
          />
          Оплатить при получений
        </label>

        <button type="submit">Оплатить</button>
      </div>
      <Modal
        open={open}
        onCancel={onClose}
        footer={[]}
        title={""}
        width={1000}
      >
        <Result
          status="success"
          title="Спасибо за покупку"
          subTitle="Менеджер свяжется с вами течение 10 минут с 8 до 23 рабочего времени"
        />
      </Modal>
    </form>
  );
}
