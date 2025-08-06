// Importazione moduli
import { useContext, createContext, useState } from 'react';
// Importazione componenti
import TransactionAction from '../components/TransactionAction';

// Context avvisi
const TransactionActionContext = createContext(null);

const useTransactionAction = () => {
    return useContext(TransactionActionContext);
};

const TransactionActionProvider = ({ children }) => {
    // Stato notifica attuale
    const [transactionAction, setTransactionAction] = useState({});
    // Stato visibilità notifica
    const [transactionActionShow, setTransactionActionShow] = useState(false);

    // Funzione invio notifica
    const notify = (id, amount, type, date, walletId, tagId, recurrent) => {
        // Impostazione notifica
        setTransactionAction({
            id,
            amount,
            type,
            walletId,
            date,
            tagId,
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
                    id={transactionAction.id}
                    amount={transactionAction.amount}
                    type={transactionAction.type}
                    walletId={transactionAction.walletId}
                    date={transactionAction.date}
                    tagId={transactionAction.tagId}
                    recurrent={transactionAction.recurrent}
                    setShow={setTransactionActionShow}
                />
            ) : null}
        </TransactionActionContext.Provider>
    );
};

// Esportazione provider e hook
export { useTransactionAction, TransactionActionProvider };
