// Importazione moduli
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../hooks/Notification.context';
import { formatCurrency, formatCurrencyColor } from '../utils/utils';
import { useAuth } from '../hooks/Auth.context';
// Importazione componenti
import Card from '../components/Card';
import Spinner from '../components/Spinner';
import Transaction from '../components/Transaction';
import BackArrow from '../components/BackArrow';

// Creazione pagina
const DashboardSection2 = ({ walletId }) => {
    // Navigatore
    const navigator = useNavigate();
    // Notificatore
    const notify = useNotification();
    // Stato portafoglio
    const [wallet, setWallet] = useState(null);
    // Stato bilancio
    const [balance, setBalance] = useState(null);
    // Stato bilancio mensile
    const [monthBalance, setMonthBalance] = useState(null);
    // Stato ultime transazioni
    const [transactions, setTransactions] = useState([]);
    // Stato tag
    const [tags, setTags] = useState([]);
    // Stato caricamento
    const [loading, setLoading] = useState(true);
    // Stato errore
    const [error, setError] = useState(null);
    // Autenticazione
    const { accessToken } = useAuth();

    // Caricamento dati
    useEffect(() => {
        try {
            const getWallet = async () => {
                // Effettuazione richiesta
                const req = await fetch(
                    `${
                        import.meta.env.VITE_API_URL
                    }/api/wallets?field=id&identificative=${walletId}`,
                    {
                        credentials: 'include',
                        method: 'GET',
                        headers: { Authorization: `Bearer ${accessToken}` },
                    }
                );

                // Conversione richiesta
                const data = await req.json();

                // Controllo richiesta
                if (!req.ok) throw new Error(data.message);

                // Impostazione portafogli
                setWallet({ name: data.data[0].name });
            };

            const getBalanceTransactions = async () => {
                // Effettuazione richiesta
                const req = await fetch(
                    `${
                        import.meta.env.VITE_API_URL
                    }/api/transactions?field=wallet_id&identificative=${walletId}`,
                    {
                        credentials: 'include',
                        method: 'GET',
                        headers: { Authorization: `Bearer ${accessToken}` },
                    }
                );

                // Conversione richiesta
                const data = await req.json();

                // Controllo richiesta
                if (!req.ok) throw new Error(data.message);

                let currentBalance = 0;

                try {
                    // Calcolo bilancio
                    data.data.forEach((transaction) => {
                        transaction.type == 'income'
                            ? (currentBalance += parseFloat(transaction.amount))
                            : transaction.type == 'expense'
                            ? (currentBalance -= parseFloat(transaction.amount))
                            : (currentBalance += 0);
                    });
                } catch (error) {
                    currentBalance = 0;
                }

                // Impostazione bilancio e transazioni
                setBalance(currentBalance);
                setTransactions(
                    data.data.length >= 3 ? data.data[-3] : data.data
                );
            };

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
                if (!req.ok) throw new Error(data.message);

                // Impostazione bilancio e transazion
                setTags(data.data);
            };

            getBalanceTransactions();
            getWallet();
            getTags();
            // const monthTransactions = [
            //     { id: 1, amount: 100, type: 'income' },
            //     { id: 2, amount: 100, type: 'income' },
            //     { id: 3, amount: 100, type: 'income' },
            //     { id: 4, amount: 100, type: 'income' },
            //     { id: 5, amount: 100, type: 'income' },
            //     { id: 6, amount: 100, type: 'expense' },
            //     { id: 7, amount: 100, type: 'expense' },
            //     { id: 8, amount: 100, type: 'expense' },
            // ];
            // let currentMonthBalance = 0;
            // let currentMonthIncome = 0;
            // let currentMonthExpense = 0;
            // monthTransactions.forEach((transaction) => {
            //     if (transaction.type == 'income') {
            //         currentMonthBalance += transaction.amount;
            //         currentMonthIncome += transaction.amount;
            //     } else {
            //         currentMonthBalance -= transaction.amount;
            //         currentMonthExpense -= transaction.amount;
            //     }
            // });
            // setMonthBalance({
            //     balance: currentMonthBalance,
            //     income: currentMonthIncome,
            //     expense: currentMonthExpense,
            // });
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
            <div className="flex flex-col gap-2.5 w-full min-h-full items-center">
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <div className="flex justify-center items-center bg-secondary-bg w-full pt-2 pb-2 pl-3 pr-3">
                            <h1 className="text-2xlarge font-extrabold text-primary-txt">
                                {wallet?.name || 'Portafoglio??'}
                            </h1>
                            <BackArrow
                                onClick={() => navigator('/dashboard')}
                                className={'ml-auto'}
                            />
                        </div>
                        <div className="flex flex-col items-center lg:flex-row justify-center gap-4 w-full p-4">
                            <Card
                                className="lg:h-full"
                                title={'Bilancio Attuale💵'}
                            >
                                <div className="flex items-center justify-center w-full">
                                    <p
                                        className={`text-4xlarge ${formatCurrencyColor(
                                            balance
                                        )}`}
                                    >
                                        {formatCurrency(balance)}
                                    </p>
                                </div>
                            </Card>
                            <Card
                                className="lg:h-full"
                                title={`Riepilogo Mensile${
                                    monthBalance?.income > 0 ? '📈' : '📉'
                                }`}
                            >
                                <div className="flex flex-col items-center p-3 w-full">
                                    {monthBalance ? (
                                        <>
                                            <div className="flex w-full items-center justify-between">
                                                <p
                                                    className={`text-xlarge ${formatCurrencyColor(
                                                        monthBalance.income
                                                    )}`}
                                                >
                                                    {formatCurrency(
                                                        monthBalance.income
                                                    )}
                                                </p>

                                                <p
                                                    className={`text-xlarge ${formatCurrencyColor(
                                                        monthBalance.expense
                                                    )}`}
                                                >
                                                    {formatCurrency(
                                                        monthBalance.expense
                                                    )}
                                                </p>
                                            </div>
                                            <p
                                                className={`text-4xlarge ${formatCurrencyColor(
                                                    monthBalance.balance
                                                )}`}
                                            >
                                                {formatCurrency(
                                                    monthBalance.balance
                                                )}
                                            </p>
                                        </>
                                    ) : (
                                        <p className="text-center">
                                            Non sono presenti transazioni questo
                                            mese
                                        </p>
                                    )}
                                </div>
                            </Card>
                            <Card title={'Ultime Transazioni🔁'}>
                                <div className="flex flex-col items-center gap-5 w-full p-4">
                                    {transactions.length <= 0 ? (
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
                                                    date={transaction.date}
                                                    tagColor={
                                                        tags[
                                                            tags.findIndex(
                                                                (tag) =>
                                                                    tag.id ===
                                                                    transaction.tag_id
                                                            )
                                                        ]?.color || '#000000'
                                                    }
                                                    actionBtn={false}
                                                />
                                            );
                                        })
                                    )}
                                </div>
                            </Card>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

// Esportazione pagina
export default DashboardSection2;
