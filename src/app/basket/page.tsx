// import { Row, Col } from "antd";

import styles from './page.module.css';
import Link from 'next/link';
import Basket from './component';
import SellBasket from './sellComponent';
export default function BasketPage() {
  return (
    <section className={styles.section}>
      <Link href="/" className={styles.breadcrumb}>
        Вакуматоры
      </Link>
      <span className={styles.breadcrumb}>/</span>
      <span className={styles.breadcrumbActive}>Корзина</span>
      <h1 className={styles.title}>Ваша Корзина</h1>
      <div className={styles.layputFather}>
        <div>
          <div className={styles.layout}>
            <div className={styles.layoutImage}></div>
            <div className={styles.layoutTitle}>Название</div>
            <div className={styles.layoutPrice}>Цена</div>
            <div className={styles.layoutQue}>Кол.</div>
            <div className={styles.layoutItog}>Итог</div>
          </div>
          <Basket />
        </div>
        <div className={styles.sell}>
          <h1 className={styles.sellTitle}>Сумма</h1>
          <h2 className={styles.sellh2}>Активировать промокод</h2>
          <hr />
          <SellBasket />
        </div>
      </div>
    </section>
  );
}
