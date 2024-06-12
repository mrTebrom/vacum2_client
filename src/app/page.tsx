import type { Metadata } from 'next';
import Slider from './components/Slider';
import axios from 'axios';
import { Card } from './components/card';
import { IProduct } from '@/lib/interface';
import styles from './page.module.css';
import Tab from './components/Tab';
import Link from 'next/link';
import Image from 'next/image';
export const metadata: Metadata = {
  title: 'Продажа вакуумных упаковщиков | Магазин',
  description: 'Купите вакуумные упаковщики высокого качества для хранения продуктов. Большой выбор и доступные цены.',
  keywords: ['вакуумные упаковщики', 'упаковка продуктов', 'сохранность продуктов', 'пищевая упаковка'],
  //@ts-ignore
  og: {
    title: 'Продажа вакуумных упаковщиков | Магазин',
    description: 'Купите вакуумные упаковщики высокого качества для хранения продуктов. Большой выбор и доступные цены.',
    image: 'ссылканаваше_изображение',
  },
};

const Catalog = async () => {
  const { data } = await axios.get('http://localhost:5000/api/product');
  const newsProductData = await axios.get('http://localhost:5000/api/product/news');
  return (
    <section className={styles.sectionCatalog}>
      <h2 className={styles.catalogTitle}>Каталог</h2>
      <h3 className={styles.catalogSubTitle}>Просмотрите весь интиресуеший вас товар</h3>
      <Tab
        tabs={[
          {
            title: 'Новое поступление',
            id: '1',
            content: (
              <div className={styles.cardList}>
                {newsProductData.data.map((product: IProduct) => (
                  <Card key={product.id} {...product} />
                ))}
              </div>
            ),
          },

          { title: 'Скидки', id: '3', content: <></> },
        ]}
      />
    </section>
  );
};
const Promition = async () => {
  let { data } = await axios.get('http://localhost:5000/api/promo');
  console.log(data);
  let promotion = {
    title: 'Акция',
    description: 'Товар с промокодами',
    href: '/',
    discont: 20,
    buttonTitle: 'Подробнее об \n акций',
  };
  if (!data.title) data = { ...promotion };
  return (
    <section className={styles.promotion}>
      <div className={styles.promotionInfo}>
        <h1 className={styles.promotionTitle}>{data?.title}</h1>
        <p className={styles.promotionDescription}>{data?.description}</p>
        <button className={styles.promotionButton}>
          <Link href={data?.href} style={{ color: '#fff', textDecoration: 'none' }}>
            {data?.buttonTitle}
          </Link>
        </button>
      </div>
      <div className={styles.promotionImage}>
        <p className={styles.promotionDiscont}>-{data?.discont}%</p>
        <Image src={'/uploads/promo-pictures/' + data?.image || '/uploads/promo-pictures/zagluska.webp'} width={397} height={397} className={styles.promotionImageSrc} alt={data?.title} />
      </div>
    </section>
  );
};
export default function HomePage() {
  return (
    <main>
      <Slider />
      <Catalog />
      <Promition />
    </main>
  );
}
