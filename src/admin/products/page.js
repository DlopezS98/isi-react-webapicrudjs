import React, { useEffect, useState } from 'react';
import Button from '../../components/button';
import Card, { CardBody, CardHeader } from '../../components/card';
import DataGrid from '../../components/data-grid';
import { useNavigate } from 'react-router';
import { FiPlus } from 'react-icons/fi';
import ProductsService from '../../services/products.service';

const columns = [
  {
    header: 'Name',
    field: 'name',
    type: 'text',
  },
  {
    header: 'Price',
    field: 'unitPrice',
    type: 'money',
    prefix: '$',
  },
  {
    header: 'Created at',
    field: 'createdAt',
    type: 'date',
  },
];

const ProductsPage = () => {
  const productsService = React.useMemo(() => new ProductsService(), []);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const handleAddProduct = () => {
    navigate('/admin/products/create');
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await productsService.get();
      console.log(result);
      setProducts(result);
    };

    fetchProducts();
  }, [productsService]);

  return (
    <Card>
      <CardHeader>
        <h2>Product list</h2>
      </CardHeader>
      <CardBody>
        <p>Products page content</p>
        <DataGrid
          toolbar={
            <Button onClick={handleAddProduct} variant='primary'>
              <FiPlus /> Add product
            </Button>
          }
          rows={products}
          columns={columns}
        />
      </CardBody>
    </Card>
  );
};

export default ProductsPage;
