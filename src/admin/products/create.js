import React from 'react';
import { useNavigate } from 'react-router';

import Button from '../../components/button';
import Card, { CardBody, CardHeader } from '../../components/card';
import { FiSave } from 'react-icons/fi';
import CategoriesService from '../../services/categories.service';
import BrandsService from '../../services/brands.service';
import ProductsService from '../../services/products.service';

export default function CreateProductPage() {
  const categoriesService = React.useMemo(() => new CategoriesService(), []);
  const brandsService = React.useMemo(() => new BrandsService(), []);
  const productsService = React.useMemo(() => new ProductsService(), []);

  const navigate = useNavigate();

  const [brands, setBrands] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  
  React.useEffect(() => {
    const fetchCategories = async () => {
      const result = await categoriesService.get();
      setCategories(result);
    };

    fetchCategories();
  }, [categoriesService]);

  React.useEffect(() => {
    const fetchBrands = async () => {
      const result = await brandsService.get();
      setBrands(result);
    };

    fetchBrands();
  }, [brandsService]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    await productsService.create(data);
    navigate('/admin/products');
  };


  return (
    <Card>
      <CardHeader>
        <div className='mx-3'>
          <h2>Create new product</h2>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className='form shadow-md'>
          <div className='row gap-2 justify-center align-center'>
            <div className='column form__group'>
              <label htmlFor='name'>Product name</label>
              <input type='text' id='name' name='name' placeholder='Product name' />
            </div>
            <div className='column form__group'>
              <label htmlFor='category'>Category</label>
              <select id='category' name='categoryId' className='select'>
                <option value=''>Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='row gap-2 justify-center align-center'>
            <div className='column form__group'>
              <label htmlFor='quantity'>Brand</label>
              <select id='brand' name='brandId' className='select'>
                <option value=''>Select brand</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='column form__group'>
              <label htmlFor='price'>Price</label>
              <input type='number' id='price' name='unitPrice' placeholder='Product price' />
            </div>
          </div>
          <div className='row'>
            <div className='column form__group'>
              <label htmlFor='description'>Description</label>
              <textarea id='description' name='description' placeholder='Product description' rows={5}></textarea>
            </div>
          </div>
          <div className='column'>
            <Button type="submit" variant='primary'>
              <FiSave /> Create Product
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
