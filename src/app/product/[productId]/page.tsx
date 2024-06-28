import { IProduct } from "@/lib/interface";
import { PercentageOutlined } from "@ant-design/icons";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import styles from "./card.module.css";

export function Card({ title, images, price, id, discont, typeDiscont, star }: IProduct) {
  let finishPrice: number = price;

  if (discont > 0) {
    if (typeDiscont) {
      finishPrice = discont;
    } else {
      finishPrice = price - (price * discont) / 100;
    }
  }

  return (
    <Link
      href={"/product/" + id}
      style={{ textDecoration: "none", color: "#000" }}
    >
      <div className="card">
        {discont > 0 ? (
          <span className={styles.discont}>
            {discont} {!typeDiscont ? <PercentageOutlined /> : "₸"}{" "}
          </span>
        ) : undefined}
        <Image
          src={images[0]}
          alt={title}
          width={400}
          height={300}
        />
        <span
          className="star"
          style={{ color: "#E9A426", display: "flex", gap: 3, marginTop: 10, marginBottom: 10 }}
        >
          {[...Array(5)].map((_, index) => (index < star ? <StarFilled key={index} /> : <StarOutlined key={index} />))}
        </span>
        <p className="card-title">{title}</p>
        <p className="card-sub-price">Цена:</p>
        {discont > 0 ? <del className={styles.del}>{price} ₸</del> : undefined}
        <p className="card-price">{finishPrice}₸</p>
      </div>
    </Link>
  );
}
