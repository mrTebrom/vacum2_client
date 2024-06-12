import axios from 'axios';

interface Form {
  title: string | undefined;
  price: number | undefined;
  categoryId: number | undefined;
  files: File[] | undefined;
  description: string | null;
}

export interface FormError {
  title: string | null;
  price: string | null;
  categoryId: string | null;
  files: string | null;
  description: string | null;
}

let errorMessage = 'Пожалуйста, заполните ';

export const productFormValid = (values: Form): FormError | null => {
  const error: FormError = {
    title: null,
    price: null,
    description: null,
    categoryId: null,
    files: null,
  };

  if (!values.title || values.title.length === 0) {
    error.title = errorMessage + 'название!';
  }

  if (values.price === undefined) {
    error.price = errorMessage + 'цену!';
  }

  if (values.description === undefined) {
    error.description = errorMessage + 'описание!';
  }

  if (values.categoryId === undefined) {
    error.categoryId = 'Пожалуйста, выберите категорию!';
  }

  if (!Array.isArray(values.files) || values.files.length === 0) {
    error.files = 'Пожалуйста, загрузите изображение!';
  }

  // Проверка наличия ошибок
  if (Object.values(error).some((value) => value !== null)) {
    return error;
  }

  // Если ошибок нет, возвращаем null
  return null;
};

export const fetchImageProduct = (files: File[]) => {
  const form = new FormData();
  for (let file of files) {
    form.append('file', file);
  }

  const images = fetch('http://localhost:5000/api/product/upload', {
    method: 'POST',
    body: form,
    headers: {
      'Content-Type': 'multipart/form-data', // Добавьте этот заголовок
    },
  });
};
