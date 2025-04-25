import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthProvider from './context/auth.context';
import { BrowserRouter, Route, Routes } from 'react-router';
import LoginPage from './public/authentication/login/page';
import Placeholder from './components/placeholder';
import ProtectedRoute from './components/protected-route';
import AdminLayout from './admin/layout';
import ProductsPage from './admin/products/page';
import CreateProductPage from './admin/products/create';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/onboarding' element={<Placeholder />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/admin' element={<AdminLayout />}>
              <Route index element={<Placeholder label='Dashboard' />} />
              <Route path='dashboard' element={<Placeholder label='Dashboard' />} />
              <Route path='products'>
                <Route index element={<ProductsPage />} />
                <Route path='create' element={<CreateProductPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
