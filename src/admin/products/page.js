import React, { useEffect, useState } from 'react';
import Button from '../../components/button';
import Card, { CardBody, CardHeader } from '../../components/card';
import DataGrid from '../../components/data-grid';
import { useNavigate } from 'react-router';
import { FiPlus } from 'react-icons/fi';
import ProductsService from '../../services/products.service';
import BrandsService from '../../services/brands.service';
import CategoriesService from '../../services/categories.service';

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

const CategoryCell = ({ value }) => {
  const categoriesService = React.useMemo(() => new CategoriesService(), []);
  const [category, setCategory] = useState();

  useEffect(() => {
    const fetchCategory = async () => {
      const result = await categoriesService.getById(value);
      setCategory(result);
    };

    fetchCategory();
  }, [categoriesService, value]);

  return <span>{category ? category.name : 'Loading...'}</span>;
};

const ActionsCell = ({ row, onRowDeleted }) => {
  const navigate = useNavigate();
  const productsService = React.useMemo(() => new ProductsService(), []);

  const handleEdit = () => {
    navigate(`/admin/products/edit/${row.id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await productsService.delete(row.id);
      onRowDeleted(row);
    }
  };

  return (
    <div className='flex gap-1'>
      <Button onClick={handleEdit} variant='secondary'>
        Edit
      </Button>
      <Button onClick={handleDelete} variant='danger'>
        Delete
      </Button>
    </div>
  );
};

const ProductsPage = () => {
  const productsService = React.useMemo(() => new ProductsService(), []);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const handleRowDeleted = async () => {
    fetchProducts();
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
      header: 'Category',
      field: 'categoryId',
      type: 'text',
      cellTemplate: CategoryCell,
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
    {
      header: "Actions",
      field: "actions",
      type: "actions",
      cellTemplate: (props) => <ActionsCell {...props} onRowDeleted={handleRowDeleted} />,
    }
  ];

  const handleAddProduct = () => {
    navigate('/admin/products/create');
  };

  const fetchProducts = async () => {
    const result = await productsService.get();
    setProducts(result);
  };

  useEffect(() => {

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
