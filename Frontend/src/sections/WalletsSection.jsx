// Importazione moduli
import { useState, useEffect } from 'react';
import { useNotification } from '../hooks/Notification.context';
// Importazione componenti
import Wallet from '../components/Wallet';
import Spinner from '../components/Spinner';

// Creazione pagina
const WalletsSection = () => {
    // Notificatore
    const notify = useNotification();
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

    return (
        <>
            <div className="flex flex-col gap-2.5">
                {loading ? (
                    <Spinner />
                ) : (
                    wallets.map((wallet) => {
                        return (
                            <Wallet
                                key={wallet.id}
                                id={wallet.id}
                                name={wallet.name}
                            />
                        );
                    })
                )}
            </div>
        </>
    );
};

// Esportazione pagina
export default WalletsSection;
