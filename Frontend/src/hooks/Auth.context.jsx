// Importazione moduli
import { useContext, createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

// Creazione contesto
const AuthContext = createContext();

// Provider
const AuthProvider = ({ children }) => {
    // Navigatore
    const navigator = useNavigate();
    // Stato access token
    const [accessToken, setAccessToken] = useState(null);

    // Caricamento dati
    useEffect(() => {
        // Richiesta token
        if (localStorage.getItem('accessToken')) {
            // Impostazione token
            setAccessToken(localStorage.getItem('accessToken'));
        }
    }, []);

    // Controllo token
    useEffect(() => {
        if (accessToken) {
            // Funzion richiesta refresh
            const getRefresh = async () => {
                // Effettuazione richiesta
                const req = await fetch(
                    `${import.meta.env.VITE_API_URL}/auth/refresh`,
                    { credentials: 'include', method: 'GET' }
                );
                // Controllo richiesta
                if (!req.ok) {
                    // Cancellazione token
                    setAccessToken(null);
                    localStorage.removeItem('accessToken');
                    // Reidirizzamento
                    navigator('/auth/login');
                    return;
                }

                // Conversione richiesta
                const data = await req.json();

                // Impostazione token
                setAccessToken(data.data);
            };

            // Controllo scadenza
            if (new Date() > new Date(jwtDecode(accessToken)?.exp * 1000)) {
                // Richiesta refresh
                getRefresh();
            }
            // Timeout alla scadenza
            const timeoutId = setTimeout(
                () => getRefresh(),
                new Date(jwtDecode(accessToken)?.exp * 1000) - new Date()
            );

            return () => clearTimeout(timeoutId);
        }
    }, [accessToken]);

    // Funzione login
    const login = async (email, psw, setError) => {
        // Blocco gestione errori
        try {
            // Effettuazione richiesta
            const req = await fetch(
                `${import.meta.env.VITE_API_URL}/auth/login`,
                {
                    credentials: 'include',
                    body: JSON.stringify({ email, psw }),
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            // Conversione richiesta
            const data = await req.json();

            // Controllo richiesta
            if (!req.ok) throw new Error(data.message);

            // Impostazione token
            setAccessToken(data.data);
            localStorage.setItem('accessToken', data.data);
        } catch (error) {
            // Impostazione errore
            setError(error.message);
        }
    };
    // Funzione registrazione
    const signup = async (username, email, psw, setError) => {
        // Blocco gestione errori
        try {
            // Effettuazione richiesta
            const req = await fetch(
                `${import.meta.env.VITE_API_URL}/auth/register`,
                {
                    credentials: 'include',
                    body: JSON.stringify({ username, email, psw }),
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            // Conversione richiesta
            const data = await req.json();

            // Controllo richiesta
            if (!req.ok) throw new Error(data.message);
        } catch (error) {
            // Impostazione errore
            setError(error.message);
        }
    };
    // Funzione logout
    const logout = async (setError) => {
        // Blocco gestione errori
        try {
            // Effettuazione richiesta
            const req = await fetch(
                `${import.meta.env.VITE_API_URL}/auth/logout`,
                {
                    credentials: 'include',
                    method: 'GET',
                }
            );

            // Conversione richiesta
            const data = await req.json();

            // Controllo richiesta
            if (!req.ok) throw new Error(data.message);

            // Cancellazione token
            setAccessToken(null);
            localStorage.removeItem('accessToken');
        } catch (error) {
            // Impostazione errore
            setError(error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ accessToken, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook
const useAuth = () => {
    return useContext(AuthContext);
};

// Esportazione moduli
export { useAuth, AuthProvider };
