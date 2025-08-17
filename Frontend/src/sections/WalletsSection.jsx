// Importazione moduli
import { useState, useEffect } from 'react';
import { useNotification } from '../hooks/Notification.context';
import { usePopup } from '../hooks/Popup.context';
import { useAuth } from '../hooks/Auth.context';
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
    // Autenticazione
    const { accessToken } = useAuth();

    // Caricamento dati
    useEffect(() => {
        try {
            const getWallets = async () => {
                // Effettuazione richiesta
                const req = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/wallets`,
                    {
                        credentials: 'include',
                        method: 'GET',
                        headers: { Authorization: `Bearer ${accessToken}` },
                    }
                );

                // Conversione richiesta
                const data = await req.json();

                // Controllo richiesta
                if (!req.ok)
                    throw new Error(
                        data?.message || 'Errore interno del server'
                    );

                // Impostazione portafogli
                setWallets(
                    data.data.map((wallet) => {
                        return { id: wallet.id, name: wallet.name };
                    })
                );
            };

            getWallets();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Controllo errore
    useEffect(() => {
        if (error) {
            notify('error', error);
            setError(null);
        }
    }, [error]);

    // Funzione gestione creazione portafoglio
    const handlerInput = async (value, setValue, setError) => {
        // Backup portafogli
        const prevWallets = [...wallets];

        try {
            const sanitizedValue = value.replace(/\s+/g, '');

            const result = wallets.find((wallet) => wallet.id === 'waiting');

            // Controllo value
            if (
                !result &&
                sanitizedValue &&
                sanitizedValue?.length >= 3 &&
                sanitizedValue?.length <= 30
            ) {
                // Impostazione nuovo portafoglio
                setWallets([...wallets, { id: 'waiting', name: value }]);

                // Effettuazione richiesta
                const req = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/wallets`,
                    {
                        credentials: 'include',
                        method: 'POST',
                        body: JSON.stringify({
                            data: { name: value },
                        }),
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                // Conversione richiesta
                const data = await req.json();

                // Controllo richiesta
                if (!req.ok)
                    throw new Error(
                        data?.message || 'Errore interno del server'
                    );

                setWallets((prevWalletsMap) =>
                    prevWalletsMap.map((wallet) =>
                        wallet.id === 'waiting'
                            ? { id: data.data.id, name: wallet.name }
                            : wallet
                    )
                );

                // Cancello testo e errore
                setValue('Nuovo Portafoglio');
                setError(null);
            } else if (
                sanitizedValue?.length < 3 ||
                sanitizedValue?.length > 30
            ) {
                // Gestione errore
                setError(
                    'Il nome deve essere compreso tra i 3 e i 30 caratteri'
                );
            } else if (result) {
                // Gestione errore
                notify(
                    'error',
                    'Un portafoglio deve ancora essere caricato in rete, attendi'
                );
            }
        } catch (error) {
            notify('error', error.message);
            setWallets(prevWallets);
        }
    };

    // Funzione gestione eliminazione portafoglio
    const handleDelete = (id, name) => {
        popup(
            'Conferma ELIMINAZIONE',
            `Eliminando "${name.toUpperCase()}" non sarà più possibile utilizzarlo e tutte le sue transazioni saranno anch'esse irrecuperabili. Quest'azione è irreversibile!`,
            'Procedi',
            async () => {
                // Backup portafogli
                const prevWallets = [...wallets];

                try {
                    setWallets(wallets.filter((wallet) => wallet.id !== id));
                    // Effettuazione richiesta
                    const req = await fetch(
                        `${import.meta.env.VITE_API_URL}/api/wallets/${id}`,
                        {
                            credentials: 'include',
                            method: 'DELETE',
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }
                    );

                    // Conversione richiesta
                    const data = await req.json();

                    // Controllo richiesta
                    if (!req.ok)
                        throw new Error(
                            data?.message || 'Errore interno del server'
                        );

                    notify(
                        'success',
                        'Il Portafoglio è stato eliminato correttamente!'
                    );
                } catch (error) {
                    notify('error', error.message);
                    setWallets(prevWallets);
                }
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
                        {wallets.length <= 0 ? (
                            <p className="text-center">
                                Non sono presenti portafogli!
                            </p>
                        ) : (
                            wallets.map((wallet) => {
                                return (
                                    <Wallet
                                        key={wallet.id}
                                        id={wallet.id}
                                        name={wallet.name}
                                        handleDelete={handleDelete}
                                    />
                                );
                            })
                        )}
                    </>
                )}
            </div>
        </>
    );
};

// Esportazione pagina
export default WalletsSection;
