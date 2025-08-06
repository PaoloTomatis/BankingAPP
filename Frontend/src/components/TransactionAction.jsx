// Importazione moduli
import { useEffect, useState } from 'react';
import { useNotification } from '../hooks/Notification.context';
// Importazione componenti
import Button from '../components/Button';
import Spinner from '../components/Spinner';
// Importazione immagini
import closeImg from '../assets/icons/add-BLK.png';

// Creazione componente
const TransactionAction = ({
    id: defId,
    amount: defAmount,
    type,
    date: defDate,
    walletId: defWalletId,
    tagId: defTagId,
    setShow,
    recurrent,
}) => {
    const oggi = new Date();
    const giorno = String(oggi.getDate()).padStart(2, '0');
    const mese = String(oggi.getMonth() + 1).padStart(2, '0');
    const anno = oggi.getFullYear();

    // Transazione originale
    const originalTransaction = {
        id: defId,
        amount: type === 'income' ? defAmount : -defAmount,
        date: defDate || `${anno}-${mese}-${giorno}`,
        walletId: defWalletId,
        tagId: defTagId,
    };
    // Notificatore
    const notify = useNotification();
    // Stato portafogli
    const [wallets, setWallets] = useState([]);
    // Stato tags
    const [tags, setTags] = useState([]);
    // Stato transazione
    const [transaction, setTransaction] = useState(originalTransaction);
    // Stato errore
    const [error, setError] = useState(null);
    // Stato caricamento
    const [loading, setLoading] = useState(true);

    // Caricamento dati
    useEffect(() => {
        try {
            //TODO - Effettuo chiamata API
            setTimeout(() => {
                setTags([
                    { id: 1, name: 'Tag1', color: '#F44336' },
                    { id: 2, name: 'Tag2', color: '#FFC107' },
                    { id: 3, name: 'Tag3', color: '#3A7CD9' },
                ]);
                setWallets([
                    { id: 1, name: 'Portafoglio 1' },
                    { id: 2, name: 'Portafoglio 2' },
                    { id: 3, name: 'Portafoglio 3' },
                ]);
                setLoading(false);
            }, 500);
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

    // Funzione gestione salvataggio
    const handleSave = () => {
        try {
            //TODO - Effettuo chiamata API
            const keys1 = Object.keys(transaction);
            let save = false;

            // Controllo uguaglianza transazione
            for (let key of keys1) {
                if (transaction[key] !== originalTransaction[key]) save = true;
            }

            // Esecuzione salvataggio
            if (save && !recurrent) {
                notify(
                    'success',
                    'La transazione è stata modificata correttamente!'
                );
            } else if (save && recurrent) {
                // Lista possibili ricorrenze
                const possibleRecurrence = ['m', 'h', 'd', 'w', 'M', 'y'];
                if (
                    possibleRecurrence.includes(transaction.date.slice(-1)) &&
                    !isNaN(transaction.date.slice(0, -1))
                ) {
                    notify(
                        'success',
                        'La transazione è stata modificata correttamente!'
                    );
                } else {
                    notify(
                        'error',
                        'La ricorrenza deve avere un numero seguito da una lettera (m = minuti, h = ore, d = giorni, M = mesi, y = anni)!'
                    );
                }
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setShow(false);
        }
    };

    return (
        <div className="flex w-screen h-screen bg-black/60 items-center justify-center fixed top-0 left-0 z-40">
            <div className="flex flex-col w-[95%] max-w-[500px] rounded-2xl gap-3 relative bg-primary-bg z-40 border-border border-[3px] p-3 items-center">
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <div className="flex items-center justify-center">
                            <input
                                type="number"
                                step="0.01"
                                value={transaction.amount}
                                className="text-4xlarge border-none bg-transparent outline-none w-[95%] max-w-[100px] text-center [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                                onChange={(e) =>
                                    setTransaction({
                                        ...transaction,
                                        amount: e.target.value,
                                    })
                                }
                            />
                            <p className="text-large">€</p>
                        </div>
                        <div className="flex items-center justify-center">
                            <p className="text-large font-bold">
                                {recurrent ? 'Ricorrenza:' : 'Data:'}
                            </p>
                            <input
                                type={recurrent ? 'text' : 'date'}
                                value={transaction.date}
                                className="text-large border-none bg-transparent outline-none w-[95%] max-w-[200px] text-center"
                                onChange={(e) =>
                                    setTransaction({
                                        ...transaction,
                                        date: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <p className="text-large font-bold">Portafoglio:</p>
                            <select
                                value={transaction.walletId}
                                onChange={(e) =>
                                    setTransaction({
                                        ...transaction,
                                        walletId: e.target.value,
                                    })
                                }
                                className="text-large border-none bg-transparent outline-none w-[95%] max-w-[200px] text-center"
                            >
                                {wallets.map((wallet) => {
                                    return (
                                        <option
                                            key={wallet.id}
                                            value={wallet.id}
                                        >
                                            {wallet.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="flex items-center justify-center">
                            <p className="text-large font-bold">Tag:</p>
                            <select
                                value={transaction.tagId}
                                onChange={(e) =>
                                    setTransaction({
                                        ...transaction,
                                        tagId: e.target.value,
                                    })
                                }
                                className="text-large border-none bg-transparent outline-none w-[95%] max-w-[200px] text-center"
                            >
                                {tags.map((tag) => {
                                    return (
                                        <option key={tag.id} value={tag.id}>
                                            {tag.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <Button onClick={handleSave}>Salva</Button>
                        <img
                            src={closeImg}
                            alt="X"
                            role="button"
                            onClick={() => setShow(false)}
                            className="object-cover aspect-square w-6 rotate-45 top-4 right-4 absolute"
                        />
                    </>
                )}
            </div>
        </div>
    );
};

// Esportazione componente
export default TransactionAction;
