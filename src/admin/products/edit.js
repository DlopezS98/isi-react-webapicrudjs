import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { FiSave } from 'react-icons/fi';

import Button from '../../components/button';
import Card, { CardBody, CardHeader } from '../../components/card';
import ProductsService from '../../services/products.service';
import BrandsService from '../../services/brands.service';
import CategoriesService from '../../services/categories.service';

export default function EditProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const productsService = React.useMemo(() => new ProductsService(), []);
    const categoriesService = React.useMemo(() => new CategoriesService(), []);
    const brandsService = React.useMemo(() => new BrandsService(), []);

    const formRef = useRef(null);
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

    const [product, setProduct] = useState(null);

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        data.id = id;
        data.createdAt = product.createdAt;

        await productsService.update(id, data);
        navigate('/admin/products');
    };

    useEffect(() => {
        const fetchProduct = async () => {
            const result = await productsService.getById(id);
            console.log("retrived product", result);
            setProduct(result);
        };

        fetchProduct();
    }, [id, productsService]);

    useEffect(() => {
        if (formRef.current && product) {
            formRef.current.name.value = product.name || '';
            formRef.current.categoryId.value = product.categoryId || 0;
            formRef.current.brandId.value = product.brandId || 0;
            formRef.current.unitPrice.value = product.unitPrice || 0;
            formRef.current.description.value = product.description || '';
        }
    }, [product, formRef]);

    return (
        <Card>
            <CardHeader>
                <h2>Edit Product</h2>
            </CardHeader>
            <CardBody>
                <form ref={formRef} onSubmit={handleOnSubmit} className='form shadow-md'>
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
                            <FiSave /> Update Product
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}