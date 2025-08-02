// Importazione componenti
import Input from '../components/Input';
import WalletsSection from '../sections/WalletsSection';
// Importazione immagini
import addImgBLK from '../assets/icons/add-BLK.png';

// Creazione pagina
const DashboardSection1 = () => {
    // Funzione gestione creazione portafoglio
    const handlerInput = (value, setValue, setError) => {
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
                placeHolder={'Inserisci nome del Portafoglio'}
                icon={addImgBLK}
                addHandler={handlerInput}
                errorHandler={null}
                defValue="Nuovo Portafoglio"
            />
            <WalletsSection />
        </>
    );
};

// Esportazione pagina
export default DashboardSection1;
