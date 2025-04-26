import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Card, { CardBody, CardHeader } from '../../components/card';
import ProductsService from '../../services/products.service';

export default function EditProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const productsService = React.useMemo(() => new ProductsService(), []);

    const [product, setProduct] = useState(null);

    const handleSave = async (product) => {
        await productsService.update(id, product);
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

    return (
        <Card>
            <CardHeader>
                <h2>Edit Product</h2>
            </CardHeader>
            <CardBody>
                Form goes here
            </CardBody>
        </Card>
    );
}