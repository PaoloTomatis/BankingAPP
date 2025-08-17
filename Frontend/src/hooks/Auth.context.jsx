// Importazione moduli
import { useContext, createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Creazione contesto
const AuthContext = createContext();

// Provider
const AuthProvider = ({ children }) => {
    // Stato access token
    const [accessToken, setAccessToken] = useState(null);
    // Stato utente
    const [user, setUser] = useState(null);
    // Stato caricamento
    const [loading, setLoading] = useState(true);

    // Caricamento dati
    useEffect(() => {
        // Richiesta token
        if (localStorage.getItem('accessToken')) {
            // Impostazione token
            setAccessToken(localStorage.getItem('accessToken'));
        } else {
            setLoading(false);
        }
    }, []);

    // Funzione richiesta refresh
    const getRefresh = async () => {
        // Effettuazione richiesta
        const req = await fetch(
            `${import.meta.env.VITE_API_URL}/auth/refresh`,
            { credentials: 'include', method: 'GET' }
        );
        // Controllo richiesta
        if (!req.ok) {
            // Cancellazione token e utente
            setAccessToken(null);
            setUser(null);
            localStorage.removeItem('accessToken');
            // Reidirizzamento
            console.log('Reindirizzamento: ', accessToken);
            window.location = '/auth/login';
            return;
        }

        // Conversione richiesta
        const data = await req.json();

        // Impostazione token
        setAccessToken(data.data);
    };

    // Controllo token
    useEffect(() => {
        if (accessToken) {
            // Impostazione utente
            try {
                const decodedToken = jwtDecode(accessToken);
                if (decodedToken) {
                    setUser({
                        id: decodedToken.id,
                        username: decodedToken.username,
                        email: decodedToken.email,
                    });
                }

                // Controllo scadenza
                if (new Date() > new Date(jwtDecode(accessToken)?.exp * 1000)) {
                    // Richiesta refresh
                    console.log('Scadenza: ', accessToken);
                    getRefresh();
                }
                // Timeout alla scadenza
                const timeoutId = setTimeout(
                    () => getRefresh(),
                    new Date(jwtDecode(accessToken)?.exp * 1000) - new Date()
                );

                return () => clearTimeout(timeoutId);
            } catch (error) {
                // Cancellazione token e utente
                setAccessToken(null);
                setUser(null);
                localStorage.removeItem('accessToken');
            } finally {
                setLoading(false);
            }
        }
    }, [accessToken]);

    // Funzione login
    const login = async (email, psw, setError, setLoading) => {
        // Blocco gestione errori
        try {
            // Impostazione caricamento
            setLoading(true);
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
            setAccessToken(data.data.accessToken);
            localStorage.setItem('accessToken', data.data.accessToken);
            return true;
        } catch (error) {
            // Impostazione errore
            setError(error.message);
            return false;
        } finally {
            // Eliminazione caricamento
            setLoading(false);
        }
    };
    // Funzione registrazione
    const signup = async (username, email, psw, setError, setLoading) => {
        // Blocco gestione errori
        try {
            // Impostazione caricamento
            setLoading(true);
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
            return true;
        } catch (error) {
            // Impostazione errore
            setError(error.message);
            return false;
        } finally {
            // Eliminazione caricamento
            setLoading(false);
        }
    };
    // Funzione logout
    const logout = async (setError, setLoading) => {
        // Blocco gestione errori
        try {
            // Impostazione caricamento
            setLoading(true);
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

            // Cancellazione token e utente
            setAccessToken(null);
            setUser(null);
            localStorage.removeItem('accessToken');
        } catch (error) {
            // Impostazione errore
            setError(error.message);
        } finally {
            // Eliminazione caricamento
            setLoading(false);
        }
    };
    // Funzione eliminazione utente
    const userDelete = async (setError, setLoading) => {
        // Blocco gestione errori
        try {
            // Impostazione caricamento
            setLoading(true);
            // Effettuazione richiesta
            const req = await fetch(
                `${import.meta.env.VITE_API_URL}/api/users`,
                {
                    credentials: 'include',
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );

            // Conversione richiesta
            const data = await req.json();

            // Controllo richiesta
            if (!req.ok) throw new Error(data.message);

            // Cancellazione token e utente
            setAccessToken(null);
            setUser(null);
            localStorage.removeItem('accessToken');
            return true;
        } catch (error) {
            // Impostazione errore
            setError(error.message);
            return false;
        } finally {
            // Eliminazione caricamento
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                user,
                login,
                signup,
                logout,
                userDelete,
                loading,
            }}
        >
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
