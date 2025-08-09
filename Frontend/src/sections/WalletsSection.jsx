// Importazione moduli
import { useState, useEffect } from 'react';
import { useNotification } from '../hooks/Notification.context';
import { usePopup } from '../hooks/Popup.context';
// Importazione componenti
import Input from '../components/Input';
import Wallet from '../components/Wallet';
import Spinner from '../components/Spinner';
// Importazione immagini
import addImgBLK from '../assets/icons/add-BLK.png';

// Creazione pagina
const WalletsSection = () => {
    // Notificatore
    const notify = useNotification();
    // Poppuper
    const popup = usePopup();
    // Stato portafogli
    const [wallets, setWallets] = useState([]);
    // Stato caricamento
    const [loading, setLoading] = useState(true);
    // Stato errore
    const [error, setError] = useState(null);

    // Caricamento dati
    useEffect(() => {
        try {
            //TODO - Effettuo chiamata API
            setTimeout(() => {
                setWallets([
                    { id: 1, name: 'Portafoglio 1' },
                    { id: 2, name: 'Portafoglio 2' },
                    { id: 3, name: 'Portafoglio 3' },
                ]);
                setLoading(false);
            }, 1000);
        } catch (error) {
            setError(error.message);
        } finally {
            // setLoading(false);
        }
    }, []);

    // Controllo errore
    useEffect(() => {
        if (error) {
            notify('error', error);
        }
    }, [error]);

    // Funzione gestione creazione portafoglio
    const handlerInput = (value, setValue, setError) => {
        const sanitizedValue = value.replace(/\s+/g, '');

        // Controllo value
        if (
            sanitizedValue &&
            sanitizedValue?.length >= 3 &&
            sanitizedValue?.length <= 30
        ) {
            // Gestione valore
            //TODO - Faccio richiesta aggiunta portafoglio
            //TODO - Mancanza id alle nuove transazioni (dovrei ricevere id da backend)
            setWallets([...wallets, { name: value }]);
            // Cancello testo e errore
            setValue('Nuovo Portafoglio');
            setError(null);
        } else if (sanitizedValue?.length < 3 || sanitizedValue?.length > 30) {
            // Gestione errore
            setError('Il nome deve essere compreso tra i 3 e i 30 caratteri');
        }
    };

    // Funzione gestione eliminazione portafoglio
    const handleDelete = (id, name) => {
        popup(
            'Conferma ELIMINAZIONE',
            `Eliminando "${name.toUpperCase()}" non sarà più possibile utilizzarlo e tutte le sue transazioni saranno anch'esse irrecuperabili. Quest'azione è irreversibile!`,
            'Procedi',
            () => {
                //TODO - Faccio richiesta eliminazione portafoglio
                setWallets(wallets.filter((wallet) => wallet.id !== id));
                notify(
                    'success',
                    'Il Portafoglio è stato eliminato correttamente!'
                );
            }
        );
    };

    return (
        <>
            <div className="flex flex-col gap-2.5">
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <Input
                            className={'mt-[5vh]'}
                            placeHolder={'Inserisci nome del Portafoglio'}
                            icon={addImgBLK}
                            addHandler={handlerInput}
                            defValue="Nuovo Portafoglio"
                        />
                        {wallets.map((wallet) => {
                            return (
                                <Wallet
                                    key={wallet.id}
                                    id={wallet.id}
                                    name={wallet.name}
                                    handleDelete={handleDelete}
                                />
                            );
                        })}
                    </>
                )}
            </div>
        </>
    );
};

// Esportazione pagina
export default WalletsSection;
