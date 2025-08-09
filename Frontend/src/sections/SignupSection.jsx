// Importazione moduli
import { Link } from 'react-router-dom';
import { useNotification } from '../hooks/Notification.context';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/Auth.context';
// Importazione componenti
import Input from '../components/Input';
import Button from '../components/Button';

// Creazione sezione
const SignupSection = () => {
    // Navigatore
    const navigator = useNavigate();
    // Notificatore
    const notify = useNotification();
    // Autenticazione
    const { signup } = useAuth();

    // Funzione gestione errori username
    const handlerUsernameError = (value, setError) => {
        // Sanificazione value
        const sanitizedInput = value.trim();

        // Controllo value
        if (sanitizedInput?.length > 30 || sanitizedInput?.length < 3) {
            // Impostazione errore
            setError('Il nome deve essere compreso tra i 3 e i 30 caratteri');
        } else {
            // Eliminazione errore
            setError(null);
        }
    };

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

    // Funzione generatrice di password
    const pswGenerator = (length) => {
        const data =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?. ,-_@#';
        let psw = '';

        while (
            !/^(?=[A-Za-z0-9!?. ,\-_@#]{8,255}$)(?=.*[0-9])(?=.*[!?. ,\-_@#])(?!.*[\s()])/.test(
                psw
            )
        ) {
            psw = '';
            for (let i = 0; i < length; i++) {
                psw += data[Math.floor(Math.random() * data.length)];
            }
        }

        return psw;
    };

    // Funzione registrazione account
    const handlerRegister = () => {
        // TODO Richiesta api di registrazione
        notify('success', 'Registrazione effettuata correttamente!');
        setTimeout(() => {
            notify(
                'info',
                "Effettua l'autenticazione per accedere al tuo nuovo account!"
            );
        }, 4500);
        navigator('/auth/login');
    };

    return (
        <div className="flex flex-col items-center w-full min-h-screen">
            <div className="flex flex-col gap-4 rounded-3xl bg-secondary-bg border-[3px] border-primary-txt items-center pb-7 pt-7 pl-5 pr-5 mt-[5vh]">
                <h1 className="text-3xlarge font-extrabold">Benvenuto!👋</h1>
                <Input
                    placeHolder={"Inserisci l'Username"}
                    errorHandler={handlerUsernameError}
                    defValue="Username"
                />
                <Input
                    placeHolder={"Inserisci l'Email"}
                    errorHandler={handlerEmailError}
                    defValue="email@email.com"
                />
                <Input
                    placeHolder={'Inserisci la Password'}
                    errorHandler={handlerPasswordError}
                    defValue={() => pswGenerator(20)}
                    type="password"
                />
                <Button className="text-[#fff]" onClick={handlerRegister}>
                    Registrati
                </Button>
                <p className="text-small">
                    Hai già un account?{' '}
                    <Link
                        to="/auth/login"
                        className="text-primary-btn font-bold"
                    >
                        Accedi
                    </Link>
                </p>
            </div>
        </div>
    );
};

// Esportazione sezione
export default SignupSection;
