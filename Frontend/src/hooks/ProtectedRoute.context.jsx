// Importazione moduli
import { useContext, createContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './Auth.context';
// Importazione componenti
import Spinner from '../components/Spinner';

// Contesto
const ProtectedRouteContext = createContext();

// Provider
const ProtectedRoute = ({ children, auth = false }) => {
    // Pagina corrente
    const page = useLocation().pathname;
    // Autenticazione
    const { accessToken, loading } = useAuth();

    useEffect(() => {
        if (sessionStorage.getItem('bannerShown') !== 'true') {
            sessionStorage.setItem('bannerPage', page);
        }
    }, []);

    return (
        <ProtectedRouteContext.Provider value={null}>
            {loading === true ? (
                <Spinner />
            ) : sessionStorage.getItem('bannerShown') !== 'true' ? (
                <Navigate to="/warning" />
            ) : !accessToken && auth ? (
                <Navigate to="/auth/login" />
            ) : (
                children
            )}
        </ProtectedRouteContext.Provider>
    );
};

// Hook
const useProtectedRoute = () => {
    return useContext(ProtectedRouteContext);
};

// Esportazione provider e hook
export { ProtectedRoute, useProtectedRoute };
