"use client";
import Drawer from '@/app/components/drawer'; 
import { useState, ChangeEvent, useRef, Dispatch, SetStateAction, useEffect, FC } from 'react';
import { CloseOutlined, UploadOutlined, CloseCircleOutlined, PercentageOutlined } from '@ant-design/icons';
import './style.css';
import { useGetCategoriesQuery } from '@/lib/query/category.query';
import { productFormValid } from './service';
import { FormError } from './service'; 
import { useCreateProductMutation, useDestroyProductMutation, useGetByIdProductQuery, useGetProductsQuery, useUpdateProductMutation, useUploadImagesMutation } from '@/lib/query/product.query';
import { CreateProduct, IAttribute, IProduct } from '@/lib/interface';
import { Slider } from 'antd';
export default function ProductAdmin () {
  useEffect(() => {}, []);
  const [open, setOpen] = useState(false);
  const hide = () => setOpen(false);
  const show = () => setOpen(true);
  return (
    <>
      <button className="btn primary" onClick={show}>
        Создать товар
      </button>
      <Table />
      <Drawer open={open} close={hide} title="Создать товар">
        <Form  close={hide} editData={undefined}/>
      </Drawer>
    </>
  );
}
const Form:FC<{close: Function, editData?: IProduct | undefined}> = ({close, editData}) => {
  const { data } = useGetCategoriesQuery();
  const [mutate] = useCreateProductMutation();
  const [update] = useUpdateProductMutation()
  const [upload] = useUploadImagesMutation();
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<CreateProduct>({
    title: '',
    price: 0,
    categoryId: 1,
    description: '', // Добавлено поле description в стейт
    discont: 0,
    typeDiscont: false,
    attributes: [],
    star: 5
  });
  const [errorForm, setErrorForm] = useState<FormError>({
    title: null,
    price: null,
    categoryId: null,
    description: null,
    files: null,
  });
  const [attributes, setAttributes] = useState<IAttribute[]>([]);
  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form, attributes)
    // Валидация формы
    const validationError: FormError | null = productFormValid({ ...form, files: images });

    if (validationError !== null) {
      // Если есть ошибки валидации, устанавливаем их в state
      setErrorForm(validationError);
    } else {
      // Если нет ошибок валидации, тут можете отправить форму
      // fetchImageProduct(images);
      const formData = new FormData(); 
      for (let file in images) formData.append('files', images[file]);
      
      upload(formData).then(res =>{
      
        if(editData) {
          console.log(editData.id)
            //@ts-ignore  
          update({id: editData.id, data: {...form, images: res.data}})
            .unwrap()
            .then(result => {
              console.log(result)
              close();
              setError(null)
            })
            .catch((err: any)=> {
              setError(err.data.message)
              console.log(err.data.message);
            });
        }
         
        else {
          //@ts-ignore 
          mutate({...form, images: res.data  })
            .unwrap()
            .then(result => {
              console.log(result)
              close();
              setError(null)
            })
            .catch((err: any)=> {
              setError(err.data.message)
              console.log(err.data.message);
            }) 
        }
      }
      );  
    }
  };
  useEffect(() => {
    if (data && data?.length > 0) {
      setForm({ ...form, categoryId: data[0].id });
      setAttributes(data[0].attributes);
    }
  }, [data]);

  useEffect(() => { 
    if (editData) {
      setForm({
        title: editData.title,
        price: editData.price,
        categoryId: editData.category.id,
        description: editData.description,
        discont: editData.discont,
        typeDiscont: editData.typeDiscont,
        attributes: editData.attributes,
        star: editData.star 
      });
      setAttributes(editData.attributes);
    }
    else{
      setForm({
        title: '',
        price: 0,
        categoryId: 1,
        description: '', // Добавлено поле description в стейт
        discont: 0,
        typeDiscont: false,
        attributes: [],
        star: 5
      })
      
    }
  }, [editData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === 'categoryId') {
      let attr = data?.find((item) => item.id === Number(value));
      setAttributes(attr?.attributes || []);
    }
  };
  const handleAttribute = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm({ ...form, attributes: [...form.attributes, { id: Number(name), value: value }] });
  };
  const changeStar = (value: number) => {
    setForm({...form, star: value})
  }
  return (
    <form onSubmit={handleSubmit}>
      {error ? <div className="error"> <CloseCircleOutlined /> {error}</div> : null}
      <label htmlFor="title">Название</label>
      <input type="text" id="title" name="title" value={form.title} onChange={handleChange} />
      <span style={{ color: 'red' }}>{errorForm.title}</span>
      <label htmlFor="price">Цена</label>
      <input type="number" id="price" name="price" value={form.price} onChange={handleChange} />
      <span style={{ color: 'red' }}>{errorForm.price}</span>
      
      <label htmlFor="discont">Скидка</label>
      <div style={{display: 'flex', marginBottom: 16}}>
      <input style={{margin: 0}} type="number" id="discont" name="discont" value={form.discont} onChange={handleChange} />
      <button 
        style={{padding: 0, height: 'auto', paddingLeft: 7, paddingRight: 7, width: '30px !important'}} 
        onClick={() => setForm({...form, typeDiscont: !form.typeDiscont})}
        type="button"
        >
        <span style={{width: 16, display: 'block'}}>{form.typeDiscont ? '₸' : <PercentageOutlined />}</span>
         
      </button>
      </div>
      <span style={{ color: 'red' }}>{errorForm.price}</span>

      <label htmlFor="star">Оценка</label>
      <Slider value={form.star} max={5} min={0} marks={{ '0': 0, '1': 1,'2': 2,'3': 3,'4': 4,'5': 5}} onChange={changeStar} />

      <label htmlFor="categoryId">Категория товара</label>
      <select name="categoryId" id="categoryId" value={form.categoryId} onChange={handleChange}>
        {data?.map((item) => (
          <option value={item.id} key={item.id}>
            {item.value}
          </option>
        ))}
      </select>
      <span style={{ color: 'red' }}>{errorForm.categoryId}</span>
      <label htmlFor="description">Описание</label>
      <textarea id="description" name="description" value={form.description} onChange={handleChange} />
      <span style={{ color: 'red' }}>{errorForm.description}</span>
      {attributes.map((item) => (
        <>
        <span>{item.description}</span>
        <input 
          key={item.id} 
          name={item.id.toString()} 
          defaultValue={item.ProductAttribute?.value || ''}
          // value={item.ProductAttribute.value}
         // Установите значение атрибута в качестве значения инпута
          onChange={handleChange} // Передайте id атрибута и значение инпута
        />
        </>
      ))}
      <ImageUpload setValue={setImages} /> <span style={{ color: 'red' }}>{errorForm.files}</span>
      <button type="submit" style={{ margin: 'auto', display: 'block' }}>
        Создать
      </button>
    </form>
  );
};
const EditProduct = ({close, open, id}: {close: () => void, open: boolean, id: number | null}) => {

  const { data, refetch } = useGetByIdProductQuery(id || 0);

  useEffect(() => {
    if (id !== null) {
      refetch();
    }
  }, [id, refetch]);

  // Если id === null, значит, форма для редактирования не должна быть открыта или отправлять запросы
  if (id === null) {
    return null;
  }

 
  return <Drawer open={open} close={close} title="Редактирование товара">
    <Form close={close} editData={data} />
  </Drawer>
}
const ImageUpload: React.FC<{ setValue: Dispatch<SetStateAction<File[]>> }> = ({ setValue }) => {
  interface ImageItem {
    id: string;
    file: File;
  }
  const ref = useRef<HTMLInputElement>(null);
  const [selectedImages, setSelectedImages] = useState<ImageItem[]>([]);
  const [imageIdCounter, setImageCounter] = useState(1); // Change const to let

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log(files)
    if (files) {
      const newImages: (ImageItem | null)[] = Array.from(files).map((file) => {
        if (isImageFile(file)) {
          setImageCounter((prevCounter) => prevCounter + 1);
          return { id: `${file.name}_${imageIdCounter}_${Date.now()}`, file };
        }
        return null;
      });

      const filteredNewImages = newImages.filter((image): image is ImageItem => image !== null);

      setValue((prevValue) => [...prevValue, ...filteredNewImages.map((image) => image.file)]);
      setSelectedImages((prevImages) => [...prevImages, ...filteredNewImages]);
    } else {
      alert('Please select valid image files.');
    }
  };
  const isImageFile = (file: File) => {
    const acceptedImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
    return acceptedImageTypes.includes(file.type);
  };

  const handleRemoveImage = (id: string) => {
    setSelectedImages((prevImages) => {
      const updatedImages = prevImages.filter((image) => image.id !== id);

      // Обновление значения в родительском компоненте после удаления
      setTimeout(() => {
        setValue((prevValue) => updatedImages.map((image) => image.file));
      }, 0);

      return updatedImages;
    });
  };

  return (
    <div>
      <button className="btn btn-upload" onClick={() => ref.current?.click()} type="button">
        <UploadOutlined /> Загрузить изображенеие
      </button>

      <input type="file" ref={ref} multiple accept="image/*" onChange={handleImageChange} className="input-file" />

      <div>
        {selectedImages.length > 0 && (
          <ul className="image-list">
            {selectedImages.map((image) => (
              <li key={image.id} style={{ display: 'flex', alignItems: 'center' }}>
                <img src={URL.createObjectURL(image.file)} alt={`Image ${image.id}`} style={{ maxWidth: '50px', marginRight: '10px' }} />
                <p>{image.file.name}</p>
                <button className="btn delete small" onClick={() => handleRemoveImage(image.id)}>
                  <CloseOutlined />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const Table = () => {
  const { data } = useGetProductsQuery(); // Используем хук для получения списка продуктов
  const [destroy] = useDestroyProductMutation(); // Хук для удаления продукта
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [edit, setEdit] = useState<boolean>(false);

  const handleEdit = (id: number) => {
    setEditItemId(id);
    setEdit(true);

  };

  return (
    <div className="table-container">
      <EditProduct open={edit} close={() => setEdit(false)} id={editItemId} />
      <table>
        <thead>
          <tr>
            <th className="small-cell">ID</th>
            <th className="large-cell">Название</th>
            <th className="medium-cell">Цена</th>
            <th className='medium-cell'>Скидка</th>
            <th className='medium-cell'>Оценка</th>
            
            <th className='medium-cell'>Категория</th>

            <th className="large-cell">Описание</th>
            
            <th className="actions-cell"></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((product) => (
            <tr key={product.id}>
              <td className="small-cell">{product.id}</td>
              <td className="large-cell">{product.title}</td>
              <td className="medium-cell">{product.price}</td>
              <td className="medium-cell">{product.description} {product.typeDiscont ? '₸' : <PercentageOutlined />}</td>
              <td className="medium-cell">{product.star}</td>
              <td className="large-cell">{product.category.value}</td>
              <td className="large-cell">{product.description}</td>
              
              <td className="small-cell" style={{ display: 'flex', gap: 10 }}>
                <button className="edit btn" onClick={() => handleEdit(product.id)}>
                  Изменить
                </button>
                <button className="delete btn" onClick={() => destroy(product.id)}>
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <EditProduct
        open={edit} // Открываем компонент редактирования продукта
        close={() => setEdit(false)} // Закрываем компонент редактирования продукта
        selectedItemId={editItemId}
      /> */}
    </div>
  );
};
