import Button from '../../components/button';
import Card, { CardBody, CardHeader } from '../../components/card';
import { FiSave } from 'react-icons/fi';

export default function CreateProductPage() {
  return (
    <Card>
      <CardHeader>
        <div className='mx-3'>
          <h2>Create new product</h2>
        </div>
      </CardHeader>
      <CardBody>
        <form className='form shadow-md'>
          <div className='row gap-2 justify-center align-center'>
            <div className='column form__group'>
              <label htmlFor='name'>Product name</label>
              <input type='text' id='name' name='name' placeholder='Product name' />
            </div>
            <div className='column form__group'>
              <label htmlFor='category'>Category</label>
              <select id='category' name='category' className='select'>
                <option value=''>Select category</option>
                <option value='1'>Category 1</option>
                <option value='2'>Category 2</option>
              </select>
            </div>
          </div>
          <div className='row gap-2 justify-center align-center'>
            <div className='column form__group'>
              <label htmlFor='price'>Price</label>
              <input type='number' id='price' name='price' placeholder='Product price' />
            </div>
            <div className='column form__group'>
              <label htmlFor='quantity'>Quantity</label>
              <input type='number' id='quantity' name='quantity' placeholder='Product quantity' />
            </div>
          </div>
          <div className='row'>
            <div className='column form__group'>
              <label htmlFor='description'>Description</label>
              <textarea id='description' name='description' placeholder='Product description' rows={5}></textarea>
            </div>
          </div>
          <div className='column'>
            <Button onClick={() => {}} variant='primary'>
              <FiSave /> Create Product
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
