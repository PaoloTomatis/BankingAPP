// Importazione moduli
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Importazione pagine
import Dashboard from './pages/Dashboard';
import Credits from './pages/Credits';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Tags from './pages/Tags';
import Transactions from './pages/Transactions';
import Account from './pages/Account';
import Page404 from './pages/Page404';
// Importazione stile
import './main.css';

// Creazione router
const router = createBrowserRouter([
    { path: '/', element: <Dashboard /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/dashboard/:id', element: <Dashboard /> },
    { path: '/credits', element: <Credits /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/tags', element: <Tags /> },
    { path: '/transactions', element: <Transactions /> },
    { path: '/account', element: <Account /> },
    { path: '*', element: <Page404 /> },
]);

// Caricamento router
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
