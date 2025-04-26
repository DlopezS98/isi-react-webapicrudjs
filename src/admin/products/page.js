import React, { useEffect, useState } from 'react';
import Button from '../../components/button';
import Card, { CardBody, CardHeader } from '../../components/card';
import DataGrid from '../../components/data-grid';
import { useNavigate } from 'react-router';
import { FiPlus } from 'react-icons/fi';
import ProductsService from '../../services/products.service';
import BrandsService from '../../services/brands.service';

const BrandCell = ({ value }) => {
  const brandsService = React.useMemo(() => new BrandsService(), []);
  const [brand, setBrand] = useState();

  useEffect(() => {
    const fetchBrand = async () => {
      const result = await brandsService.getById(value);
      setBrand(result);
    };

    fetchBrand();
  }, [brandsService, value]);

  return <span>{brand ? brand.name : 'Loading...'}</span>;
};

const columns = [
  {
    header: 'Name',
    field: 'name',
    type: 'text',
  },
  {
    header: 'Brand',
    field: 'brandId',
    type: 'text',
    cellTemplate: BrandCell,
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
