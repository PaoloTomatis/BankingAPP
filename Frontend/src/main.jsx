// Importazione moduli
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NotificationProvider } from './hooks/Notification.context';
import { PopupProvider } from './hooks/Popup.context';
import { TransactionActionProvider } from './hooks/TransactionAction.context';
import { ProtectedRoute } from './hooks/ProtectedRoute.context';
// Importazione pagine
import Dashboard from './pages/Dashboard';
import Credits from './pages/Credits';
import Auth from './pages/Auth';
import Tags from './pages/Tags';
import Transactions from './pages/Transactions';
import TransactionsHistory from './pages/TransactionsHistory';
import TransactionsRecurrent from './pages/TRansactionsRecurrent';
import Account from './pages/Account';
import Page404 from './pages/Page404';
import Warning from './pages/Warning';
// Importazione stile
import './main.css';

// Creazione router
const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <ProtectedRoute page={'/'}>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute page={'/dashboard'}>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: '/dashboard/:id',
        element: (
            <ProtectedRoute page={'/dashboard'}>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: '/credits',
        element: (
            <ProtectedRoute page={'/credits'}>
                <Credits />
            </ProtectedRoute>
        ),
    },
    {
        path: '/auth',
        element: (
            <ProtectedRoute page={'/auth'}>
                <Auth />
            </ProtectedRoute>
        ),
    },
    {
        path: '/auth/:type',
        element: (
            <ProtectedRoute page={'/auth'}>
                <Auth />
            </ProtectedRoute>
        ),
    },
    {
        path: '/tags',
        element: (
            <ProtectedRoute page={'/tags'}>
                <Tags />
            </ProtectedRoute>
        ),
    },
    {
        path: '/transactions',
        element: (
            <ProtectedRoute page={'/transactions'}>
                <Transactions />
            </ProtectedRoute>
        ),
    },
    {
        path: '/transactions-history',
        element: (
            <ProtectedRoute page={'/transactions-history'}>
                <TransactionsHistory />
            </ProtectedRoute>
        ),
    },
    {
        path: '/transactions-recurrent',
        element: (
            <ProtectedRoute page={'/transactions-recurrent'}>
                <TransactionsRecurrent />
            </ProtectedRoute>
        ),
    },
    {
        path: '/account',
        element: (
            <ProtectedRoute page={'/account'}>
                <Account />
            </ProtectedRoute>
        ),
    },
    {
        path: '/warning',
        element: <Warning />,
    },
    {
        path: '*',
        element: (
            <ProtectedRoute page={'/404'}>
                <Page404 />
            </ProtectedRoute>
        ),
    },
]);

// Caricamento router
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <NotificationProvider>
            <PopupProvider>
                <TransactionActionProvider>
                    <RouterProvider router={router} />
                </TransactionActionProvider>
            </PopupProvider>
        </NotificationProvider>
    </StrictMode>
);
