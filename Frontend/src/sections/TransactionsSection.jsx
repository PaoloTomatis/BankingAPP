// Importazione moduli
import { useEffect, useState } from 'react';
import { useNotification } from '../hooks/Notification.context';
// Importazione componenti
import Transaction from '../components/Transaction';
import Spinner from '../components/Spinner';
// Importazione immagini

// Creazione sezione
const TransactionsSection = ({ className, recurrents = false }) => {
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
                                                tag.id === transaction.tag_id
                                        )
                                    ]?.color || '#000000'
                                }
                                actionBtn={true}
                                tagId={transaction.tag_id}
                                walletId={transaction.wallet_id}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
};

// Esportazione sezione
export default TransactionsSection;
