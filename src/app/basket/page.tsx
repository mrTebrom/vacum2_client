import Link from "next/link";
import styles from "./page.module.css";
import Basket from "./component";
import SellBasket from "./sellComponent";

export default function BasketPage() {
  return (
    <section className={styles.section}>
      {/* Хлебные крошки */}
      <div className={styles.breadcrumbContainer}>
        <Link
          href="/"
          className={styles.breadcrumb}
        >
          Вакууматоры
        </Link>
        <span className={styles.breadcrumb}>/</span>
        <span className={styles.breadcrumbActive}>Корзина</span>
      </div>

      {/* Заголовок */}
      <h1 className={styles.title}>Ваша Корзина</h1>

      {/* Разметка корзины */}
      <div className={styles.layputFather}>
        <div>
          <div className={styles.layout}>
            <div className={styles.layoutImage}></div>
            <div className={styles.layoutTitle}>Название</div>
            <div className={styles.layoutPrice}>Цена</div>
            <div className={styles.layoutQue}>Кол.</div>
            <div className={styles.layoutItog}>Итог</div>
          </div>
          {/* Компонент отображения товаров в корзине */}
          <Basket />
        </div>

        {/* Общая информация и кнопки */}
        <div className={styles.sell}>
          <h1 className={styles.sellTitle}>Сумма</h1>
          <h2 className={styles.sellh2}>Активировать промокод</h2>
          <hr />
          {/* Компонент с общей информацией о заказе */}
          <SellBasket />
        </div>
      </div>
    </section>
  );
}
