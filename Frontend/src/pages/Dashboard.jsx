// npx tailwindcss -i ./src/input.css -o ./src/main.css --watch
// Importazione moduli
import { useParams } from 'react-router-dom';
// Importazione componenti
import Navbar from '../components/Navbar';
import Input from '../components/Input';
import WalletsSection from '../sections/WalletsSection';
import DashboardSection from '../sections/DashboardSection';
// Importazione immagini
import addImgBLK from '../assets/icons/add-BLK.png';

// Creazione pagina
const Dashboard = () => {
    // Parametri
    const { id } = useParams();

    // Funzione gestione creazione portafoglio
    const handlerInput = (value, setValue) => {
        const sanitizedValue = value.replace(/\s+/g, '');

        // Controllo value
        if (
            sanitizedValue &&
            sanitizedValue?.length >= 3 &&
            sanitizedValue?.length <= 30
        ) {
            // Gestione value
            //TODO - Faccio richiesta aggiunta portafoglio
            console.log('Aggiunta: ', value);
            // Cancello testo
            setValue('Nuovo Portafoglio');
        } else if (sanitizedValue?.length < 3 || sanitizedValue?.length > 30) {
            // Gestione errore
            //TODO - Invio notifica di errore
            console.log(
                'Errore! Il nome deve essere compreso tra i 3 e i 30 caratteri'
            );
        }
    };

    // Funzione gestione errori
    const handlerInputError = (value, setError) => {
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

    return (
        <>
            {id ? (
                <>
                    <DashboardSection id={id} />
                    <Navbar />
                </>
            ) : (
                <>
                    <Input
                        placeHolder={'Inserisci nome del Portafoglio'}
                        icon={addImgBLK}
                        addHandler={handlerInput}
                        errorHandler={handlerInputError}
                    />
                    <WalletsSection />
                    <Navbar />
                </>
            )}
        </>
    );
};

// Esportazione pagina
export default Dashboard;
