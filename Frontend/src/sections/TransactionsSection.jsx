// Importazione moduli
import { useEffect, useState } from 'react';
import { useNotification } from '../hooks/Notification.context';
import { usePopup } from '../hooks/Popup.context';
// Importazione componenti
import Transaction from '../components/Transaction';
import Spinner from '../components/Spinner';
import Input from '../components/Input';
// Importazione immagini
import addImgBLK from '../assets/icons/add-BLK.png';

// Creazione sezione
const TransactionsSection = ({ className, recurrents = false }) => {
    // Poppuper
    const popup = usePopup();
    // Notificatore
    const notify = useNotification();
    // Stato transazioni
    const [transactions, setTransactions] = useState([]);
    // Stato tag
    const [tags, setTags] = useState([]);
    // Stato caricamento
    const [loading, setLoading] = useState(true);
    // Stato errore
    const [error, setError] = useState(null);

    // Funzione gestione eliminazione transazione
    const handleDelete = (id) => {
        popup(
            'Conferma ELIMINAZIONE',
            "Eliminando la TRANSAZIONE essa non sarà più reperibile e ciò influirà nel calcolo del bilancio. Quest'azione è irreversibile!",
            'Procedi',
            () => {
                //TODO - Faccio richiesta eliminazione transazione
                setTransactions(
                    transactions.filter((transaction) => transaction.id !== id)
                );
                notify(
                    'success',
                    'La Transazione è stata eliminata correttamente!'
                );
            }
        );
    };

    // Funzione gestione creazione portafoglio
    const handlerInput = (value, setValue, setError) => {
        // Sanificazione input
        const sanitizedValue = Math.round(parseFloat(value) * 100) / 100;

        // Controllo value
        if (
            (sanitizedValue != 0 || !sanitizedValue) &&
            !isNaN(sanitizedValue)
        ) {
            const date = new Date().toISOString().slice(0, 10);

            // Gestione valore
            //TODO - Faccio richiesta aggiunta importo
            //TODO - Mancanza id alle nuove transazioni (dovrei ricevere id da backend)
            setTransactions(
                !recurrents
                    ? [
                          ...transactions,
                          {
                              amount: Math.abs(sanitizedValue),
                              walletId: 1,
                              tagId: null,
                              userId: 1,
                              date: date,
                              type: sanitizedValue >= 0 ? 'income' : 'expense',
                          },
                      ]
                    : [
                          ...transactions,
                          {
                              userId: 1,
                              walletId: 1,
                              tagId: null,
                              amount: Math.abs(sanitizedValue),
                              type: sanitizedValue >= 0 ? 'income' : 'expense',
                              recurrence: '1m',
                              last_date: new Date().toISOString(),
                          },
                      ]
            );
            // Cancello testo e errore
            setValue(0.0);
            setError(null);
        } else if (!sanitizedValue || isNaN(sanitizedValue)) {
            // Gestione errore
            setError("L'importo deve essere un numero positivo o negativo!");
        }
    };

    // Caricamento dati
    useEffect(() => {
        try {
            //TODO - Effettuo chiamata API
            setTimeout(() => {
                if (!recurrents) {
                    setTransactions([
                        {
                            id: 1,
                            amount: 100,
                            wallet_id: 1,
                            type: 'income',
                            tag_id: 1,
                            date: '2024-07-03',
                        },
                        {
                            id: 7,
                            amount: 100,
                            wallet_id: 1,
                            type: 'expense',
                            tag_id: 3,
                            date: '2025-06-17',
                        },
                        {
                            id: 8,
                            amount: 100,
                            wallet_id: 1,
                            type: 'expense',
                            tag_id: 2,
                            date: '2025-08-05',
                        },
                    ]);
                } else {
                    setTransactions([
                        {
                            id: 1,
                            amount: 100,
                            wallet_id: 1,
                            type: 'income',
                            tag_id: 1,
                            recurrence: '1m',
                            last_date: '2024-07-03T16:00:00.000Z',
                        },
                        {
                            id: 7,
                            amount: 100,
                            wallet_id: 1,
                            type: 'expense',
                            tag_id: 3,
                            recurrence: '2d',
                            last_date: '2025-06-17T11:11:11.111Z',
                        },
                        {
                            id: 8,
                            amount: 100,
                            wallet_id: 1,
                            type: 'expense',
                            tag_id: 2,
                            recurrence: '3y',
                            last_date: '2025-08-05T14:45:10.000Z',
                        },
                    ]);
                }
                setTags([
                    { id: 1, color: '#F44336' },
                    { id: 2, color: '#FFC107' },
                    { id: 3, color: '#3A7CD9' },
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
            console.log(error);
        }
    }, [error]);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <Input
                        placeHolder={"Inserisci l'Importo"}
                        addHandler={handlerInput}
                        icon={addImgBLK}
                        defValue={0.0}
                        type="number"
                        step="0.01"
                        className="mt-[5vh]"
                    />
                    <div
                        className={`${className} w-full gap-4 flex flex-col items-center`}
                    >
                        {transactions.map((transaction) => {
                            return (
                                <Transaction
                                    key={transaction.id}
                                    id={transaction.id}
                                    amount={transaction.amount}
                                    type={transaction.type}
                                    date={
                                        !recurrents
                                            ? transaction.date
                                            : transaction.recurrence
                                    }
                                    recurrent={recurrents ? true : false}
                                    tagColor={
                                        tags[
                                            tags.findIndex(
                                                (tag) =>
                                                    tag.id ===
                                                    transaction.tag_id
                                            )
                                        ]?.color || '#000000'
                                    }
                                    actionBtn={true}
                                    tagId={transaction.tag_id}
                                    walletId={transaction.wallet_id}
                                    handleDelete={handleDelete}
                                />
                            );
                        })}
                    </div>
                </>
            )}
        </>
    );
};

// Esportazione sezione
export default TransactionsSection;
