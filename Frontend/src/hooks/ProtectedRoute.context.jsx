// Importazione moduli
import { createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Contesto
const ProtectedRouteContext = createContext();

// Provider
const ProtectedRoute = ({ children, page, auth = false }) => {
    // Navigatore
    const navigator = useNavigate();

    // Reindirizzamento
    useEffect(() => {
        // Controllo visibilità banner
        if (!sessionStorage.getItem('bannerShown')) {
            navigator('/warning');
        }
    }, []);

    return (
        <ProtectedRouteContext.Provider value={page}>
            {children}
        </ProtectedRouteContext.Provider>
    );
};

// Hook
const useProtectedRoute = () => {
    return useContext(ProtectedRouteContext);
};

// Esportazione provider e hook
export { ProtectedRoute, useProtectedRoute };
