import { Link, Outlet } from 'react-router';
import logo from '../logo.svg';
import { useAuth } from '../context/auth.context';
import { FiBarChart2 } from 'react-icons/fi';
import { FiBox } from 'react-icons/fi';
import { FiTag } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';

const AdminLayout = (props) => {
  const auth = useAuth();
  const currentUser = auth.user;
  const currentPath = window.location?.pathname || '';
  const getIsActive = (path) => (currentPath === path ? 'active' : '');

  return (
    <div className='admin-container'>
      <header className='admin-header shadow-md'>
        <div className='admin-header-logo'>
          <img src={logo} className='App-logo' alt='logo' />
        </div>
        <div className='admin-header-toolbar'>
          <span className='user-name'>{`${currentUser.firstName} ${currentUser.lastName}`}</span>
          <div className='user-avatar'>
            <img src={logo} className='App-logo' alt='logo' />
          </div>
        </div>
      </header>
      <aside className='admin-sidebar'>
        <ul>
          <li>
            <Link to='/admin/dashboard' className={getIsActive('/admin/dashboard') || getIsActive('/admin')}>
              <FiBarChart2 /> Dashboard
            </Link>
          </li>
          <li>
            <Link to='/admin/products' className={getIsActive('/admin/products')}>
              <FiBox /> Products
            </Link>
          </li>
          <li>
            <Link to='/admin/categories' className={getIsActive('/admin/categories')}>
              <FiTag /> Categories
            </Link>
          </li>
        </ul>
        <div className='logout-container'>
          <button onClick={() => auth.logout()} type='button'>
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>
      <main className='admin-main-container'>
        <div className='admin-main-content container py-3'>
          <Outlet />
        </div>
        <footer className='admin-footer'>
          <p>Admin Footer</p>
        </footer>
      </main>
    </div>
  );
};

export default AdminLayout;
