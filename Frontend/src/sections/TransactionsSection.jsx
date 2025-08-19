// Importazione moduli
import { useEffect, useState } from 'react';
import { useNotification } from '../hooks/Notification.context';
import { usePopup } from '../hooks/Popup.context';
import { useAuth } from '../hooks/Auth.context';
// Importazione componenti
import Transaction from '../components/Transaction';
import Spinner from '../components/Spinner';
import Input from '../components/Input';
// Importazione immagini
import addImgBLK from '../assets/icons/add-BLK.png';

// Creazione sezione
const TransactionsSection = ({
    className,
    recurrents = false,
    selectedId = null,
}) => {
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
    // Autenticazione
    const { accessToken } = useAuth();

    // Scroll
    useEffect(() => {
        if (document.getElementById(selectedId) && selectedId) {
            document
                .getElementById(selectedId)
                .scrollIntoView({ behavior: 'smooth' });
        }
    }, [transactions, selectedId]);

    // Funzione gestione eliminazione transazione
    const handleDelete = (id) => {
        popup(
            'Conferma ELIMINAZIONE',
            "Eliminando la TRANSAZIONE essa non sarà più reperibile e ciò influirà nel calcolo del bilancio. Quest'azione è irreversibile!",
            'Procedi',
            async () => {
                const prevTransactions = [...transactions];
                try {
                    setTransactions(
                        transactions.filter(
                            (transaction) => transaction.id !== id
                        )
                    );

                    if (!recurrents) {
                        // Effettuazione richiesta
                        const req = await fetch(
                            `${
                                import.meta.env.VITE_API_URL
                            }/api/transactions/${id}`,
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

                        // Controllo richiesa
                        if (!req.ok)
                            throw new Error(
                                data?.message || 'Errore interno del server!'
                            );
                    } else {
                        // Effettuazione richiesta
                        const req = await fetch(
                            `${
                                import.meta.env.VITE_API_URL
                            }/api/recurring-transactions/${id}`,
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

                        // Controllo richiesa
                        if (!req.ok)
                            throw new Error(
                                data?.message || 'Errore interno del server!'
                            );
                    }

                    notify(
                        'success',
                        'La Transazione è stata eliminata correttamente!'
                    );
                } catch (error) {
                    notify('error', error.message);
                    setTransactions(prevTransactions);
                }
            }
        );
    };

    // Funzione gestione creazione portafoglio
    const handlerInput = async (value, setValue, setError) => {
        // Backup transazioni
        const prevTransactions = [...transactions];

        try {
            // Sanificazione input
            const sanitizedValue = Math.round(parseFloat(value) * 100) / 100;

            const result = transactions.find(
                (transaction) => transaction.id === 'waiting'
            );

            // Controllo value
            if (
                !result &&
                (sanitizedValue != 0 || !sanitizedValue) &&
                !isNaN(sanitizedValue)
            ) {
                if (!recurrents) {
                    const date = new Date().toISOString().slice(0, 10);

                    // Impostazione transazione
                    setTransactions([
                        {
                            id: 'waiting',
                            amount: Math.abs(sanitizedValue),
                            wallet_id: null,
                            tag_id: null,
                            date: date,
                            type: sanitizedValue >= 0 ? 'income' : 'expense',
                        },
                        ...transactions,
                    ]);

                    // Effettuazione richiesta
                    const req = await fetch(
                        `${import.meta.env.VITE_API_URL}/api/transactions`,
                        {
                            credentials: 'include',
                            method: 'POST',
                            body: JSON.stringify({
                                data: {
                                    amount: Math.abs(sanitizedValue),
                                    wallet_id: null,
                                    tag_id: null,
                                    date: date,
                                    type:
                                        sanitizedValue >= 0
                                            ? 'income'
                                            : 'expense',
                                },
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

                    // Aggiornamento con id
                    setTransactions((prevTransactions) => {
                        return prevTransactions.map((transaction) =>
                            transaction.id === 'waiting'
                                ? {
                                      ...transaction,
                                      id: data.data.id,
                                      wallet_id: data.data.walletId,
                                  }
                                : transaction
                        );
                    });
                } else {
                    // Impostazione transazione
                    setTransactions([
                        {
                            id: 'waiting',
                            amount: Math.abs(sanitizedValue),
                            wallet_id: null,
                            tag_id: null,
                            recurrence: '1m',
                            last_date: new Date().toISOString(),
                            type: sanitizedValue >= 0 ? 'income' : 'expense',
                        },
                        ...transactions,
                    ]);

                    // Effettuazione richiesta
                    const req = await fetch(
                        `${
                            import.meta.env.VITE_API_URL
                        }/api/recurring-transactions`,
                        {
                            credentials: 'include',
                            method: 'POST',
                            body: JSON.stringify({
                                data: {
                                    amount: Math.abs(sanitizedValue),
                                    walletId: null,
                                    tagId: null,
                                    recurrence: '1m',
                                    lastDate: new Date().toISOString(),
                                    type:
                                        sanitizedValue >= 0
                                            ? 'income'
                                            : 'expense',
                                },
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

                    // Aggiornamento con id
                    setTransactions((prevTransactions) => {
                        return prevTransactions.map((transaction) =>
                            transaction.id === 'waiting'
                                ? {
                                      ...transaction,
                                      id: data.data.id,
                                      wallet_id: data.data.walletId,
                                  }
                                : transaction
                        );
                    });
                }

                // Cancello testo e errore
                setValue(0.0);
                setError(null);
            } else if (!sanitizedValue || isNaN(sanitizedValue)) {
                // Gestione errore
                setError(
                    "L'importo deve essere un numero positivo o negativo!"
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
            setTransactions(prevTransactions);
        }
    };

    // Caricamento dati
    useEffect(() => {
        try {
            const getTags = async () => {
                // Effettuazione richiesta
                const req = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/tags`,
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

                // Impostazione tags
                setTags(data.data);
            };

            getTags();

            if (!recurrents) {
                const getTransactions = async () => {
                    // Effettuazione richiesta
                    const req = await fetch(
                        `${import.meta.env.VITE_API_URL}/api/transactions`,
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

                    // Impostazione transazioni
                    setTransactions(
                        data.data.sort(
                            (a, b) => new Date(b.date) - new Date(a.date)
                        )
                    );
                };

                getTransactions();
            } else {
                const getRecurrentTransactions = async () => {
                    // Effettuazione richiesta
                    const req = await fetch(
                        `${
                            import.meta.env.VITE_API_URL
                        }/api/recurring-transactions`,
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

                    // Impostazione transazioni
                    setTransactions(data.data);
                };

                getRecurrentTransactions();
            }
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
                        {transactions?.length <= 0 || !transactions ? (
                            <p className="text-center">
                                Non sono presenti transazioni
                            </p>
                        ) : (
                            transactions.map((transaction) => {
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
                                        tags={tags}
                                        actionBtn={true}
                                        tagId={transaction.tag_id}
                                        walletId={transaction.wallet_id}
                                        handleDelete={handleDelete}
                                    />
                                );
                            })
                        )}
                    </div>
                </>
            )}
        </>
    );
};

// Esportazione sezione
export default TransactionsSection;
