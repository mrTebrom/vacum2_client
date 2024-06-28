"use client";

import { useEffect, useState } from "react";
import { Alert, Button, Form, Input, Modal, Typography } from "antd";
import { UserOutlined, ShoppingOutlined, SearchOutlined, MenuOutlined, InstagramOutlined, WhatsAppOutlined, PhoneOutlined, InfoOutlined, PercentageOutlined, CarOutlined } from "@ant-design/icons";
import Drawer from "./drawer";
import Link from "next/link";
import axios from "axios";
const { Paragraph } = Typography;
import "./header.css";
import { useAppDispatch } from "@/lib/store.hook";
import { setToken } from "@/lib/slice/token.slice";
import Image from "next/image";

interface IForm {
  email: string;
  password: string;
  passwordTwo: string;
}

const Header = () => {
  const dispatch = useAppDispatch();
  const [searchVisible, setSearchVisible] = useState(false);
  const [auth, setAuth] = useState(false);
  const [state, setState] = useState(true);
  const [error, setError] = useState("");
  const [nav, setNav] = useState(false);

  const toggleSearchVisibility = () => setSearchVisible(!searchVisible);
  const showAuth = () => setAuth(true);
  const hideAuth = () => setAuth(false);
  const onReg = () => setState(true);
  const onAuth = () => setState(false);

  const handleApiRequest = async (endpoint: string, values: IForm) => {
    try {
      const result = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, values);
      dispatch(setToken(result.data));
      localStorage.setItem("access_token", result.data);
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  const onFinish = (values: IForm) => {
    const endpoint = state ? "login" : "register";
    handleApiRequest(endpoint, values);
  };

  const close = () => {
    setNav(false);
  };

  useEffect(() => {
    dispatch(setToken(localStorage.getItem("access_token") as string));
  }, [dispatch]);

  const [mobAuth, setMobAuth] = useState(false);
  const showMobileAuth = () => setMobAuth(true);

  return (
    <header style={{ flex: 0 }}>
      <div className="logo">
        <Image
          src="/logo.png"
          alt="Logo"
          className="logoImage"
          width={150}
          height={50}
          priority
          sizes="(max-width: 768px) 100px, (max-width: 1200px) 150px, 200px"
        />
      </div>
      <button
        className="userSignIn"
        onClick={showMobileAuth}
      >
        <UserOutlined />
      </button>
      <div className="btn-list-mobile">
        <button onClick={() => setNav(true)}>
          <MenuOutlined />
        </button>
      </div>
      <nav className="navbar">
        <ul>
          <li>
            <Link href="/admin">Каталог</Link>
          </li>
          <li>
            <Link href="/">Каталог</Link>
          </li>
          <li>
            <Link href="/">Каталог</Link>
          </li>
        </ul>
      </nav>
      <Modal
        open={mobAuth}
        onCancel={() => setMobAuth(false)}
        footer={[]}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          name={state ? "login-mob" : "register-mob"}
        >
          {error.length > 3 ? (
            <Alert
              message={error}
              type="error"
              showIcon
            />
          ) : null}
          <Form.Item
            name="email"
            label="Почта"
            rules={[
              { type: "email", message: "" },
              { required: true, message: "" },
            ]}
          >
            <Input
              style={{ width: "100%", background: "#D9D9D9", borderRadius: 51.5 }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Пароль"
            rules={[{ required: true, message: "" }]}
          >
            <Input.Password
              size="large"
              style={{ background: "#D9D9D9", width: "100%", borderRadius: 51.5 }}
            />
          </Form.Item>
          {!state ? (
            <Form.Item
              name="passwordTwo"
              label="Потвердите пароль"
              rules={[{ required: true, message: "" }]}
            >
              <Input.Password
                size="large"
                style={{ background: "#D9D9D9", width: 258, borderRadius: 51.5 }}
              />
            </Form.Item>
          ) : null}
          <Paragraph style={{ textAlign: "end", color: "#747474" }}>
            <Link href="/forgot">Забыли пароль ?</Link>
          </Paragraph>
          {!state ? <hr /> : null}
          <Form.Item>
            <Button
              size="large"
              style={{ background: "#D9D9D9", width: "100%", borderRadius: 51.5 }}
              htmlType="submit"
            >
              {state ? "Войти" : "Зарегистрироватся"}
            </Button>
          </Form.Item>
          {state ? <hr /> : null}
          {state ? (
            <Paragraph
              style={{ textAlign: "center", cursor: "pointer", fontSize: 12 }}
              onClick={onAuth}
            >
              Зарегистрироватся
            </Paragraph>
          ) : (
            <Paragraph
              style={{ textAlign: "center", cursor: "pointer", fontSize: 12 }}
              onClick={onReg}
            >
              Войти
            </Paragraph>
          )}
        </Form>
      </Modal>
      <div className="rightSection">
        <Link href="/basket">
          <Button
            icon={<ShoppingOutlined />}
            type="text"
          ></Button>
        </Link>
        <div className={`auth ${auth ? "active" : null}`}>
          <Form
            layout="vertical"
            onFinish={onFinish}
            name={state ? "login" : "register"}
          >
            {error.length > 3 ? (
              <Alert
                message={error}
                type="error"
                showIcon
              />
            ) : null}
            <Form.Item
              name="email"
              label="Почта"
              rules={[
                { type: "email", message: "" },
                { required: true, message: "" },
              ]}
            >
              <Input
                style={{ width: 258, background: "#D9D9D9", borderRadius: 51.5 }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Пароль"
              rules={[{ required: true, message: "" }]}
            >
              <Input.Password
                size="large"
                style={{ background: "#D9D9D9", width: 258, borderRadius: 51.5 }}
              />
            </Form.Item>
            {!state ? (
              <Form.Item
                name="passwordTwo"
                label="Потвердите пароль"
                rules={[{ required: true, message: "" }]}
              >
                <Input.Password
                  size="large"
                  style={{ background: "#D9D9D9", width: 258, borderRadius: 51.5 }}
                />
              </Form.Item>
            ) : null}
            <Paragraph style={{ textAlign: "end", color: "#747474" }}>
              <Link href="/forgot">Забыли пароль ?</Link>
            </Paragraph>
            {!state ? <hr /> : null}
            <Form.Item>
              <Button
                size="large"
                style={{ background: "#D9D9D9", width: "100%", borderRadius: 51.5 }}
                htmlType="submit"
              >
                {state ? "Войти" : "Зарегистрироватся"}
              </Button>
            </Form.Item>
            {state ? <hr /> : null}
            {state ? (
              <Paragraph
                style={{ textAlign: "center", cursor: "pointer", fontSize: 12 }}
                onClick={onAuth}
              >
                Зарегистрироватся
              </Paragraph>
            ) : (
              <Paragraph
                style={{ textAlign: "center", cursor: "pointer", fontSize: 12 }}
                onClick={onReg}
              >
                Войти
              </Paragraph>
            )}
          </Form>
        </div>
        <div
          className={`auth-bg ${auth ? "active" : null}`}
          onClick={hideAuth}
        ></div>
      </div>
      <Drawer
        open={nav}
        close={close}
        title={<a>+7(777)777-77-77</a>}
      >
        <div className="navbar-menu-mobile">
          <h3>Информация</h3>
          <Link href="/about">
            <CarOutlined /> Доставка
          </Link>
          <Link href="/about">
            <PercentageOutlined /> Скидки
          </Link>
          <Link href="/about">
            <InfoOutlined /> О нас
          </Link>
          <h3>Контактная информация</h3>
          <a href="">
            <InstagramOutlined /> Наш Инстаграмм
          </a>
          <a href="">
            <WhatsAppOutlined /> Наш WhatsApp
          </a>
          <a href="">
            <PhoneOutlined /> Телефон
          </a>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
