// Importazione moduli
import { useState, useEffect, useRef } from 'react';
import { useNotification } from '../hooks/Notification.context';
import { formatCurrency, formatCurrencyColor } from '../utils/utils';
// Importazione componenti
import Card from '../components/Card';
import Spinner from '../components/Spinner';
import Transaction from '../components/Transaction';

// Creazione pagina
const DashboardSection = () => {
    // Notificatore
    const notify = useNotification();
    // Stato bilancio
    const [balance, setBalance] = useState(null);
    // Stato bilancio mensile
    const [monthBalance, setMonthBalance] = useState(null);
    // Variabile transazioni mensili
    const monthTransactions = useRef([]);
    // Stato ultime transazioni
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
                setBalance(2630.0);
                monthTransactions.current = [
                    { id: 1, amount: 100, type: 'income' },
                    { id: 2, amount: 100, type: 'income' },
                    { id: 3, amount: 100, type: 'income' },
                    { id: 4, amount: 100, type: 'income' },
                    { id: 5, amount: 100, type: 'income' },
                    { id: 6, amount: 100, type: 'expense' },
                    { id: 7, amount: 100, type: 'expense' },
                    { id: 8, amount: 100, type: 'expense' },
                ];
                let currentMonthBalance = 0;
                let currentMonthIncome = 0;
                let currentMonthExpense = 0;
                monthTransactions.current.forEach((transaction) => {
                    if (transaction.type == 'income') {
                        currentMonthBalance += transaction.amount;
                        currentMonthIncome += transaction.amount;
                    } else {
                        currentMonthBalance -= transaction.amount;
                        currentMonthExpense -= transaction.amount;
                    }
                });
                setMonthBalance({
                    balance: currentMonthBalance,
                    income: currentMonthIncome,
                    expense: currentMonthExpense,
                });
                setTransactions([
                    {
                        id: 1,
                        amount: 100,
                        type: 'income',
                        tag_id: 1,
                        date: '24/07/2025',
                    },
                    {
                        id: 7,
                        amount: 100,
                        type: 'expense',
                        tag_id: 3,
                        date: '25/07/2025',
                    },
                    {
                        id: 8,
                        amount: 100,
                        type: 'expense',
                        tag_id: 2,
                        date: '26/07/2025',
                    },
                ]);
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
            <div className="flex flex-col gap-2.5 w-full min-h-screen items-center">
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <Card title={'Bilancio Attuale💵'}>
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
                            title={`Riepilogo Mensile${
                                monthBalance.income > 0 ? '📈' : '📉'
                            }`}
                        >
                            <div className="flex flex-col items-center p-3 w-full">
                                <div className="flex w-full items-center justify-between">
                                    <p
                                        className={`text-xlarge ${formatCurrencyColor(
                                            monthBalance.income
                                        )}`}
                                    >
                                        {formatCurrency(monthBalance.income)}
                                    </p>

                                    <p
                                        className={`text-xlarge ${formatCurrencyColor(
                                            monthBalance.expense
                                        )}`}
                                    >
                                        {formatCurrency(monthBalance.expense)}
                                    </p>
                                </div>
                                <p
                                    className={`text-4xlarge ${formatCurrencyColor(
                                        monthBalance.balance
                                    )}`}
                                >
                                    {formatCurrency(monthBalance.balance)}
                                </p>
                            </div>
                        </Card>
                        <Card title={'Ultime Transazioni🔁'}>
                            <div className="flex flex-col items-center gap-5 w-full p-4">
                                {transactions.map((transaction) => {
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
                                            actionBtn={true}
                                        />
                                    );
                                })}
                            </div>
                        </Card>
                    </>
                )}
            </div>
        </>
    );
};

// Esportazione pagina
export default DashboardSection;
