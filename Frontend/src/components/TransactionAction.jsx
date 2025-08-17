// Importazione moduli
import { useEffect, useState } from 'react';
import { useNotification } from '../hooks/Notification.context';
import { useAuth } from '../hooks/Auth.context';
// Importazione componenti
import Button from '../components/Button';
import Spinner from '../components/Spinner';
// Importazione immagini
import closeImg from '../assets/icons/add-BLK.png';

// Creazione componente
const TransactionAction = ({
    transaction,
    setTransaction,
    setShow,
    recurrent,
}) => {
    const oggi = new Date();

    const originalTransaction = transaction;
    // Notificatore
    const notify = useNotification();
    // Stato portafogli
    const [wallets, setWallets] = useState([]);
    // Stato tags
    const [tags, setTags] = useState([]);
    // Stato errore
    const [error, setError] = useState(null);
    // Stato caricamento
    const [loading, setLoading] = useState(true);
    // Stato transazione locale
    const [localTransaction, setLocalTransaction] = useState(transaction);
    // Autenticazione
    const { accessToken } = useAuth();

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

    // Funzione gestione salvataggio
    const handleSave = async () => {
        const prevLocalTransaction = { ...localTransaction };
        try {
            const keys1 = Object.keys(localTransaction);
            let save = false;

            // Controllo uguaglianza transazione
            for (let key of keys1) {
                if (localTransaction[key] !== originalTransaction[key])
                    save = true;
            }

            // Esecuzione salvataggio
            if (save && !recurrent) {
                setTransaction({
                    ...localTransaction,
                    amount: parseFloat(localTransaction.amount),
                    walletId: Number(localTransaction.walletId),
                    tagId: Number(localTransaction.tagId),
                });

                // Effettuazione richiesta
                const req = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/transactions`,
                    {
                        credentials: 'include',
                        method: 'PATCH',
                        body: JSON.stringify({
                            data: {
                                ...localTransaction,
                                amount: parseFloat(localTransaction.amount),
                                walletId: Number(localTransaction.walletId),
                                tagId: Number(localTransaction.tagId),
                            },
                            where: { id: localTransaction.id },
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                // Conversione richiesta
                const data = await req.json();

                // Controllo richiesta
                if (!req.ok)
                    throw new Error(
                        data?.message || 'Errore interno del server!'
                    );

                notify(
                    'success',
                    'La transazione è stata modificata correttamente!'
                );
            } else if (save && recurrent) {
                // Lista possibili ricorrenze
                const possibleRecurrence = ['m', 'h', 'd', 'w', 'M', 'y'];
                if (
                    possibleRecurrence.includes(
                        localTransaction.date.slice(-1)
                    ) &&
                    !isNaN(localTransaction.date.slice(0, -1))
                ) {
                    setTransaction({
                        ...localTransaction,
                        amount: parseFloat(localTransaction.amount),
                        walletId: Number(localTransaction.walletId),
                        tagId: Number(localTransaction.tagId),
                    });
                    // Effettuazione richiesta
                    const req = await fetch(
                        `${
                            import.meta.env.VITE_API_URL
                        }/api/recurring-transactions`,
                        {
                            credentials: 'include',
                            method: 'PATCH',
                            body: JSON.stringify({
                                data: {
                                    ...localTransaction,
                                    amount: parseFloat(localTransaction.amount),
                                    walletId: Number(localTransaction.walletId),
                                    tagId: Number(localTransaction.tagId),
                                },
                                where: { id: localTransaction.id },
                            }),
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }
                    );

                    // Conversione richiesta
                    const data = await req.json();

                    // Controllo richiesta
                    if (!req.ok)
                        throw new Error(
                            data?.message || 'Errore interno del server!'
                        );
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
            notify('error', error.message);
            setLocalTransaction(prevLocalTransaction);
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
                                value={
                                    localTransaction.type == 'income'
                                        ? +localTransaction.amount
                                        : localTransaction.type == 'expense'
                                        ? -localTransaction.amount
                                        : 0
                                }
                                className="text-4xlarge border-none bg-transparent outline-none w-[95%] max-w-[100px] text-center [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                                onChange={(e) =>
                                    setLocalTransaction({
                                        ...localTransaction,
                                        amount: Math.abs(e.target.value),
                                        type:
                                            e.target.value >= 0
                                                ? 'income'
                                                : 'expense',
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
                                value={localTransaction.date}
                                className="text-large border-none bg-transparent outline-none w-[95%] max-w-[200px] text-center"
                                onChange={(e) =>
                                    setLocalTransaction({
                                        ...localTransaction,
                                        date: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <p className="text-large font-bold">Portafoglio:</p>
                            <select
                                value={localTransaction.walletId}
                                onChange={(e) =>
                                    setLocalTransaction({
                                        ...localTransaction,
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
                                value={localTransaction.tagId}
                                onChange={(e) => {
                                    setLocalTransaction({
                                        ...localTransaction,
                                        tagId: parseInt(e.target.value) || null,
                                        tagColor:
                                            tags.find(
                                                (tag) =>
                                                    tag.id ===
                                                    parseInt(e.target.value)
                                            )?.color || '#000',
                                    });
                                }}
                                className="text-large border-none bg-transparent outline-none w-[95%] max-w-[200px] text-center"
                            >
                                <option value={''}>- No Tag -</option>
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
