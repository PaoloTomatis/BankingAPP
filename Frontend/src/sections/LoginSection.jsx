// Importazione moduli
import { Link } from 'react-router-dom';
import { useNotification } from '../hooks/Notification.context';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/Auth.context';
import { useEffect, useState } from 'react';
import { pswGenerator } from '../utils/utils';
// Importazione componenti
import Input from '../components/Input';
import Button from '../components/Button';
import Spinner from '../components/Spinner';

// Creazione sezione
const LoginSection = () => {
    // Navigatore
    const navigator = useNavigate();
    // Notificatore
    const notify = useNotification();
    // Autenticazione
    const { login } = useAuth();
    // Stato email
    const [email, setEmail] = useState('email@email.com');
    // Stato password
    const [password, setPassword] = useState(() => pswGenerator(20));
    // Stato errore
    const [error, setError] = useState({
        email: null,
        password: null,
        page: null,
    });
    // Stato caricamento
    const [loading, setLoading] = useState(false);

    // Funzione gestione errori email
    const handlerEmailError = (value, setError) => {
        // Sanificazione value
        const sanitizedInput = value.trim();

        // Controllo value
        if (sanitizedInput?.length > 255 || sanitizedInput?.length < 5) {
            // Impostazione errore
            setError("L'email deve essere compresa tra i 5 e i 255 caratteri");
        } else if (!/\w+@\w+\.\w+/.test(sanitizedInput)) {
            // Impostazione errore
            setError(
                'L\'email deve contenere il nome utente, "@" e un dominio'
            );
        } else {
            // Eliminazione errore
            setError(null);
        }
    };

    // Funzione gestione errori password
    const handlerPasswordError = (value, setError) => {
        // Sanificazione value
        const sanitizedInput = value.trim();

        // Controllo value
        if (sanitizedInput?.length > 255 || sanitizedInput?.length < 8) {
            // Impostazione errore
            setError(
                'La password deve essere compresa tra gli 8 e i 255 caratteri'
            );
        } else if (
            !/^(?=[A-Za-z0-9!?. ,\-_@#]{8,255}$)(?=.*[0-9])(?=.*[!?. ,\-_@#])(?!.*[\s()])/.test(
                sanitizedInput
            )
        ) {
            // Impostazione errore
            setError(
                'La password deve contenere un carattere speciale e un numero'
            );
        } else {
            // Eliminazione errore
            setError(null);
        }
    };

    // Controllo errore
    useEffect(() => {
        if (error.page !== null) {
            notify('error', error.page);
            setError({ ...error, page: null });
        }
    }, [error.page]);

    // Funzione autenticazione account
    const handlerLogin = async () => {
        // Errori locali
        let localErrors = {};
        // Controllo errori
        handlerEmailError(email, (value) => (localErrors.email = value));
        handlerPasswordError(
            password,
            (value) => (localErrors.password = value)
        );
        const result = Object.values(localErrors).every((v) => v == null)
            ? await login(
                  email,
                  password,
                  (value) => setError({ ...error, page: value }),
                  setLoading
              )
            : 'bad request';

        // Impostazione errori
        setError((prev) => ({ ...prev, ...localErrors }));

        // Controllo risultati
        if (result && result !== 'bad request') {
            notify('success', 'Autenticazione effettuata correttamente!');
            navigator('/dashboard');
        } else if (result !== 'bad request') {
            setPassword('');
        }
    };

    return (
        <div className="flex flex-col items-center w-full min-h-screen">
            <div className="flex flex-col gap-4 rounded-3xl bg-secondary-bg border-[3px] border-primary-txt items-center pb-7 pt-7 pl-5 pr-5 mt-[5vh]">
                <h1 className="text-3xlarge font-extrabold">Bentornato!👋</h1>
                <Input
                    placeHolder={"Inserisci l'Email"}
                    value={email}
                    setValue={setEmail}
                    inputError={error.email}
                    setInputError={(value) =>
                        setError((prev) => ({ ...prev, email: value }))
                    }
                />
                <Input
                    placeHolder={'Inserisci la Password'}
                    value={password}
                    setValue={setPassword}
                    inputError={error.password}
                    setInputError={(value) =>
                        setError((prev) => ({ ...prev, password: value }))
                    }
                    type="password"
                />
                {loading ? (
                    <Spinner />
                ) : (
                    <Button className="text-[#fff]" onClick={handlerLogin}>
                        Accedi
                    </Button>
                )}
                <p className="text-small">
                    Non hai ancora un account?{' '}
                    <Link
                        to="/auth/signup"
                        className="text-primary-btn font-bold"
                    >
                        Registrati
                    </Link>
                </p>
            </div>
        </div>
    );
};

// Esportazione sezione
export default LoginSection;
