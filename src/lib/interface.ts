export interface IUserInit {
  id: number;
  email: string;
  role: IRole[];
}

export interface IRole {
  id: number;
  value: string;
  description: string;
}
export interface IAttribute {
  id: number;
  value: string;
  description: string;
  ProductAttribute: {
    value: string;
  }
}
export interface ICategory {
  id: number;
  value: string;
  description: string;
  attributes: IAttribute[];
}

interface IProdAndAttr extends IAttribute {
  ProductAttribute: {
    value: string;
  }
  value: string;
}
export interface IProduct {
  id: number;
  images: string[]
  title: string;
  price: number;
  category: ICategory;
  description: string;
  attributes: IProdAndAttr[];
  discont: number;
  typeDiscont: boolean;
  star: number;
}

interface IProdAndAttrCreate {
  id: number;
  value: string;
}
export interface CreateProduct {
  title: string;
  price: number;
  categoryId: number;
  description: string;
  attributes: IProdAndAttrCreate[];
  discont: number;
  typeDiscont: boolean;
  star: number;
}


export interface Tab {
  title: string;
  href: string;
  content: React.ReactNode;
}


export interface IBasket {
  id: number;
  title: string;
  price: number;
  que: number;
  img: string;
  discont: number;
  typeDiscont: boolean;
}


export interface IPromocode {
  id: number;
  title: string;
  discount: number;
  discountType: 'retail' | 'percentage';
}