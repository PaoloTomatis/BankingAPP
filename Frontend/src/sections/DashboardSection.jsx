// Importazione moduli
import { useState, useEffect, useRef } from 'react';
import { useNotification } from '../hooks/Notification.context';
// Importazione componenti
import Card from '../components/Card';
import Spinner from '../components/Spinner';

// Creazione pagina
const DashboardSection = () => {
    // Notificatore
    const notify = useNotification();
    // Stato bilancio
    const [balance, setBalance] = useState(null);
    // Stato bilancio mensile
    const [monthBalance, setMonthBalance] = useState(null);
    // Stato transazioni mensili
    const monthTransactions = useRef([]);
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
                    // { id: 9, amount: 100, type: 'expense' },
                    // { id: 10, amount: 100, type: 'expense' },
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
                setLoading(false);
            }, 1000);
        } catch (error) {
            setError(error.message);
        } finally {
            // setLoading(false);
        }
    }, []);

    // Formattazione bilancio
    const formatCurrency = (value) => {
        const formattedValue = new Intl.NumberFormat('it-IT', {
            style: 'currency',
            currency: 'EUR',
        }).format(Math.abs(value));

        return value > 0
            ? `+${formattedValue}`
            : value < 0
            ? `-${formattedValue}`
            : formattedValue;
    };

    // Formattazione colore
    const formatCurrencyColor = (value) => {
        return value > 0
            ? 'text-success'
            : value < 0
            ? 'text-error'
            : 'text-warning';
    };

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
                    </>
                )}
            </div>
        </>
    );
};

// Esportazione pagina
export default DashboardSection;
