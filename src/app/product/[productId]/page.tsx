import { IProduct } from "@/lib/interface";
import { Row, Col } from "antd";
import axios from "axios";
import Image from "next/image";
import styles from "./page.module.css";
import { AddBasket } from "@/app/components/basketButton";
import { StarFilled, StarOutlined } from "@ant-design/icons";

export default async function PageIdProduct({ params }: any) {
  const { data } = await axios.get<IProduct>("http://localhost:5000/api/product/" + params.productId);

  return (
    <section className={styles.productPage}>
      <Row className={styles.row}>
        <Col
          span={24}
          className={styles.breadcrumbContainer}
        >
          <span className={styles.breadcrumb}>{data.category.value}</span> <span className={styles.breadcrumb}>/</span> <span className={styles.breadcrumbActive}>{data.title}</span>
        </Col>
        <Col span={24}>
          <h1 className={styles.title}>{data.title}</h1>
        </Col>
        <Col
          lg={1}
          md={2}
        >
          <div className={styles.imageList}>
            {data.images?.map((item: string, i: number) => (
              <Image
                alt={data.title}
                src={item}
                key={i}
                className={styles.imageItem}
                width={60}
                height={60}
                loading="eager"
              />
            ))}
          </div>
        </Col>
        <Col
          lg={7}
          md={20}
          span={20}
        >
          <Image
            alt={data.title}
            src={data.images[0]}
            layout="responsive"
            width={500}
            height={300}
            loading="lazy"
          />
          <p style={{ display: "flex", alignItems: "center", fontSize: 24 }}>
            Оценка:
            <span
              className="star"
              style={{ color: "#E9A426", display: "flex", gap: 3, marginTop: 10, marginBottom: 10, marginLeft: 10 }}
            >
              {[...Array(5)].map((_, index) => (index < data.star ? <StarFilled key={index} /> : <StarOutlined key={index} />))}
            </span>
          </p>
        </Col>
        <Col
          xl={7}
          md={11}
          span={24}
        >
          <h2 className={styles.h2}>Харастеристики</h2>
          <ul className={styles.attributes}>
            {data.attributes.map((item) => (
              <li
                key={item.id}
                className={styles.attributesItem}
              >
                <span className={styles.attributesTitle}>{item.value}</span>
                <span className={styles.attributesValue}>{item.ProductAttribute.value}</span>
              </li>
            ))}
          </ul>
          <p className="description">{data.description}</p>
        </Col>
        <Col
          xl={2}
          lg={0}
          md={0}
          span={0}
        ></Col>
        <Col
          xl={4}
          md={11}
          span={24}
        >
          <p className={styles.price}>{data.price} ₸</p>
          <AddBasket
            product={data}
            className={styles.addBasket}
          />
        </Col>
      </Row>
    </section>
  );
}
