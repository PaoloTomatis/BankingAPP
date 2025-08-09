// Importazione moduli
import { useContext, createContext, useState } from 'react';
// Importazione componenti
import TransactionAction from '../components/TransactionAction';

// Context avvisi
const TransactionActionContext = createContext(null);

// Hook
const useTransactionAction = () => {
    return useContext(TransactionActionContext);
};

const TransactionActionProvider = ({ children }) => {
    // Stato notifica attuale
    const [transactionAction, setTransactionAction] = useState({});
    // Stato visibilità notifica
    const [transactionActionShow, setTransactionActionShow] = useState(false);

    // Funzione invio notifica
    const notify = (transaction, setTransaction, recurrent) => {
        // Impostazione notifica
        setTransactionAction({
            transaction,
            setTransaction,
            recurrent,
        });
        // Impostazione visibilità notifica
        setTransactionActionShow(true);
    };

    return (
        <TransactionActionContext.Provider value={notify}>
            {children}
            {transactionActionShow ? (
                <TransactionAction
                    transaction={transactionAction.transaction}
                    setTransaction={transactionAction.setTransaction}
                    recurrent={transactionAction.recurrent}
                    setShow={setTransactionActionShow}
                />
            ) : null}
        </TransactionActionContext.Provider>
    );
};

// Esportazione provider e hook
export { useTransactionAction, TransactionActionProvider };
