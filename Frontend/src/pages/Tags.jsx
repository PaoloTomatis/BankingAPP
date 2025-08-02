// Importazione moduli
import { useNotification } from '../hooks/Notification.context';
// Importazione componenti
import Navbar from '../components/Navbar';
import Input from '../components/Input';
import TagsSection from '../sections/TagsSection';
// Importazione immagini
import addImgBLK from '../assets/icons/add-BLK.png';

// Creazione pagina
const Tags = () => {
    // Notificatore
    const notify = useNotification();

    // Funzione gestione creazione tag
    const handlerInput = (value, setValue, setError) => {
        const sanitizedValue = value.replace(/\s+/g, '');

        // Controllo value
        if (
            sanitizedValue &&
            sanitizedValue?.length >= 3 &&
            sanitizedValue?.length <= 30
        ) {
            // Gestione value
            //TODO - Faccio richiesta aggiunta tag
            console.log('Aggiunta: ', value);
            // Cancello testo
            setValue('Nuovo Tag');
        } else if (sanitizedValue?.length < 3 || sanitizedValue?.length > 30) {
            // Gestione errore
            setError('Il nome deve essere compreso tra i 3 e i 30 caratteri');
        }
    };

    // Funzione gestione errori
    const handlerInputError = (value, setError) => {
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

    return (
        <>
            <Input
                className={'mt-[5vh]'}
                placeHolder={'Inserisci nome del Tag'}
                icon={addImgBLK}
                addHandler={handlerInput}
                errorHandler={null}
                defValue="Nuovo Tag"
            />
            <TagsSection />
            <Navbar />
        </>
    );
};

// Esportazione pagina
export default Tags;
