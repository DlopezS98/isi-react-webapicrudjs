import Button from '../../components/button';
import Card, { CardBody, CardHeader } from '../../components/card';
import DataGrid from '../../components/data-grid';
import { Products } from './data';
import { useNavigate } from 'react-router';
import { FiPlus } from 'react-icons/fi';

const columns = [
  {
    header: 'Id',
    field: 'id',
    type: 'number',
  },
  {
    header: 'Name',
    field: 'name',
    type: 'text',
  },
  {
    header: 'Price',
    field: 'price',
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
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate('/admin/products/create');
  };

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
          rows={Products}
          columns={columns}
        />
      </CardBody>
    </Card>
  );
};

export default ProductsPage;
