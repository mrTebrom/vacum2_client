import { InstagramOutlined, WhatsAppOutlined, PhoneOutlined } from '@ant-design/icons';
import Link from 'next/link';
import styles from './footer.module.css';
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.col}>
        <h1>Logo</h1>
        <h2 className={styles.title}>Магазин вакууматоров для продуктов</h2>
        <p>
          <a href="tel:8888888" className={styles.a}>
            +777 775 777 0000
          </a>
        </p>
      </div>
      {/* <div className={styles.col}>
      <p className={styles.title}>Для покупателей</p>
      <p><Link href='/about' className={styles.a}>Процедура оплата и вызврата</Link></p>
      <p><Link href='/about' className={styles.a}>Политика конфидинцальности</Link></p>
      <p><Link href='/about' className={styles.a}>Оферета</Link></p>
      <p><Link href='/about' className={styles.a}>Условия доставки</Link></p>
    </div> */}
      <div className={styles.col}></div>
      <div className={styles.col}>
        <p className={styles.title}>Информация</p>
        <p>
          <Link href="/about" className={styles.a}>
            О нас
          </Link>
        </p>
        <p>
          <Link href="/about" className={styles.a}>
            Доставка
          </Link>
        </p>
      </div>
      <div className={styles.col}>
        <p className={styles.title}>Контакты</p>
        <p>
          <Link href="/about" className={styles.a}>
            <PhoneOutlined /> +7(777)777-77-77
          </Link>
        </p>
        <p>
          <Link href="/about" className={styles.a}>
            <WhatsAppOutlined /> Прямая связь
          </Link>
        </p>
        <p>
          <Link href="/about" className={styles.a}>
            <InstagramOutlined /> Инстаграмм
          </Link>
        </p>
      </div>
    </footer>
  );
};
export default Footer;
