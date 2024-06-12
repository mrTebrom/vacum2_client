'use client';
import { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import { useCreateAttributeMutation, useDestroyAttributeMutation, useGetAttributesQuery, useUpdateAttributeMutation } from '@/lib/query/attribute.query';
import { CloseCircleOutlined } from '@ant-design/icons';
import { IAttribute } from '@/lib/interface';
import Drawer from '@/app/components/drawer';
interface FormData {
  value: string;
  description: string;
}

const Attribute = () => {
  useEffect(() => {}, []);
  return (
    <div className='container'>
      <div className='form'>
        <SimpleForm />
      </div>
      <div className='content'>
        <Table />
      </div>
    </div>
  );
};

const SimpleForm: React.FC = () => {
  const [isError, setError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    value: '',
    description: '',
  });
  const [mutate] = useCreateAttributeMutation();
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Очищаем ошибку при изменении значения
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Проверяем наличие значений в обязательных полях
    const errors: Partial<FormData> = {};
    if (!formData.value.trim()) {
      errors.value = 'Пожалуйста, заполните поле "Значение"';
    }
    if (!formData.description.trim()) {
      errors.description = 'Пожалуйста, заполните поле "Описание"';
    }

    // Если есть ошибки, не отправляем форму и устанавливаем их в состояние
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      // Ваша логика обработки данных формы
      mutate(formData)
        .unwrap()
        .then(() => {
          setError('');
        })
        .catch((err: any) => setError(err.data.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {isError && isError.length > 1 ? (
        <div className='error'>
          <CloseCircleOutlined /> {isError}
        </div>
      ) : null}
      <div>
        <label htmlFor='value'>Значение:</label>
        <input
          type='text'
          id='value'
          name='value'
          value={formData.value}
          onChange={handleChange}
        />
        {formErrors.value && <p className='error-message'>{formErrors.value}</p>}
      </div>
      <div>
        <label htmlFor='description'>Описание:</label>
        <textarea
          id='description'
          name='description'
          value={formData.description}
          onChange={handleChange}
        />
        {formErrors.description && <p className='error-message'>{formErrors.description}</p>}
      </div>
      <button type='submit'>Отправить</button>
    </form>
  );
};
const Table = () => {
  const { data } = useGetAttributesQuery();
  const [destroy] = useDestroyAttributeMutation();
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const handleEdit = (id: number) => {
    setEditItemId(id);
    setEdit(true);
  };

  return (
    <div className='table-container'>
      <table>
        <thead>
          <tr>
            <th className='small-cell'>id</th>
            <th className='large-cell'>Название</th>
            <th className='large-cell'>Описание</th>
            <th className='actions-cell'></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: any) => (
            <tr key={item.id}>
              <td className='small-cell'>{item.id}</td>
              <td className='large-cell'>{item.value}</td>
              <td className='large-cell'>{item.description}</td>
              <td
                className='small-cell'
                style={{ display: 'flex', gap: 10 }}
              >
                <button
                  className='edit btn'
                  onClick={() => handleEdit(item.id)}
                >
                  Изменить
                </button>
                <button
                  className='delete btn'
                  onClick={() => destroy(item.id)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Edit
        open={edit} // Открываем Edit компонент
        close={() => setEdit(false)} // Закрываем Edit компонент
        selectedItemId={editItemId}
      />
    </div>
  );
};
interface EditProps {
  open: boolean;
  close: () => void;
  selectedItemId: number | null;
}

const Edit = ({ open, close, selectedItemId }: EditProps) => {
  const [isError, setError] = useState('');
  const [formData, setFormData] = useState({
    value: '',
    description: '',
  });
  const [mutate] = useUpdateAttributeMutation();
  const [formErrors, setFormErrors] = useState<Partial<IAttribute>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData!,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Partial<IAttribute> = {};
    if (!formData?.value.trim()) {
      errors.value = 'Пожалуйста, заполните поле "Значение"';
    }
    if (!formData?.description.trim()) {
      errors.description = 'Пожалуйста, заполните поле "Описание"';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      //@ts-ignore
      await mutate({ id: selectedItemId!, data: formData! })
        .unwrap()
        .then(() => {
          close();
          setError('');
        })
        .catch((err: any) => setError(err.data.message));
    }
  };
  useEffect(() => {
    if (selectedItemId) {
      axios.get('http://localhost:5000/api/attribute/' + selectedItemId).then((res) => setFormData({ value: res.data.value, description: res.data.description }));
    }
  }, [selectedItemId]);
  return (
    <Drawer
      open={open}
      close={close}
      title='Редакитрование атрибута'
    >
      {isError && isError.length > 1 ? (
        <div className='error'>
          <CloseCircleOutlined /> {isError}
        </div>
      ) : null}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='value'>Название:</label>
          <input
            type='text'
            id='value'
            name='value'
            value={formData.value}
            onChange={handleChange}
          />
          {formErrors.value && <p className='error-message'>{formErrors.value}</p>}
        </div>
        <div>
          <label htmlFor='description'>Описание:</label>
          <textarea
            id='description'
            name='description'
            value={formData.description}
            onChange={handleChange}
          />
          {formErrors.description && <p className='error-message'>{formErrors.description}</p>}
        </div>
        <button type='submit'>Отправить</button>
      </form>
    </Drawer>
  );
};
export default Attribute;
