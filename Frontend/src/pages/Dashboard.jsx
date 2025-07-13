// Importazione moduli
import { useParams } from 'react-router-dom';
// Importazione componenti
import Input from '../components/Input';
import WalletsCont from '../components/WalletsCont';
// Importazione immagini
import addImgBLK from '../assets/icons/add-BLK.png';

// Creazione pagina
const Dashboard = () => {
    // Parametri
    const { id } = useParams();

    // Funzione gestione creazione portafoglio
    const handleInput = (value, setValue) => {
        const sanitizedValue = value.replace(/\s+/g, '');

        // Controllo input
        if (
            sanitizedValue &&
            sanitizedValue?.length >= 3 &&
            sanitizedValue?.length <= 30
        ) {
            // Gestione input
            //TODO - Faccio richiesta aggiunta portafoglio
            console.log('Aggiunta: ', value);
            // Cancello testo
            setValue('');
        } else if (sanitizedValue?.length < 3 || sanitizedValue?.length > 30) {
            // Gestione errore
            //TODO - Invio notifica di errore
            console.log(
                'Errore! Il nome deve essere compreso tra i 3 e i 30 caratteri'
            );
        }
    };

    return (
        <>
            {id ? (
                {id}
            ) : (
                <>
                    <Input
                        placeHolder={'Inserisci nome del Portafoglio'}
                        icon={addImgBLK}
                        action={handleInput}
                    />
                    <WalletsCont />
                </>
            )}
        </>
    );
};

// Esportazione pagina
export default Dashboard;
