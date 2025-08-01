// Importazione moduli
// Importazione componenti
import Input from '../components/Input';
// Importazione immagini
import eyeImg from '../assets/icons/eye-SHW.png';
// Importazione stile

// Creazione sezione
const SignupSection = () => {
    // Funzione gestione errori username
    const handlerUsernameError = (value, setError) => {
        // Sanificazione value
        const sanitizedInput = value.trim();

        // Controllo value
        if (sanitizedInput?.length > 30 || sanitizedInput?.length < 3) {
            // Impostazione errore
            setError(
                'Errore! Il nome deve essere compreso tra i 3 e i 30 caratteri'
            );
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
            setError(
                "Errore! L'email deve essere compresa tra i 5 e i 255 caratteri"
            );
        } else if (!/\w+@\w+\.\w+/.test(sanitizedInput)) {
            // Impostazione errore
            setError(
                'Errore! L\'email deve contenere il nome utente, "@" e un dominio'
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
                'Errore! La password deve essere compresa tra gli 8 e i 255 caratteri'
            );
        } else if (
            /^(?=.*[0-9])(?=.*[!?. ,\-_@#])(?!.*[\s()])[A-Za-z0-9!?. ,\-_@#]{8,255}$/.test(
                sanitizedInput
            )
        ) {
            // Impostazione errore
            setError(
                'Errore! La password deve contenere un carattere speciale, un numero e non può contenere spazi'
            );
        } else {
            // Eliminazione errore
            setError(null);
        }
    };

    return (
        <div className="flex flex-col items-center w-full min-h-screen">
            <div className="flex flex-col gap-4">
                <h1>Benvenuto!👋</h1>
                <Input
                    placeHolder={"Inserisci l'Username"}
                    errorHandler={handlerUsernameError}
                />
                <Input
                    placeHolder={"Inserisci l'Email"}
                    errorHandler={handlerEmailError}
                />
                <Input
                    placeHolder={'Inserisci la Password'}
                    errorHandler={handlerPasswordError}
                />
            </div>
        </div>
    );
};

// Esportazione sezione
export default SignupSection;
