// Importazione moduli
import {
    formatCurrency,
    formatCurrencyColor,
    formatRecurrency,
} from '../utils/utils';
import { useTransactionAction } from '../hooks/TransactionAction.context';
import { useState } from 'react';
// Importazione componenti
// Importazione immagini
import modifyImg from '../assets/icons/pen-BLK.png';
import deleteImg from '../assets/icons/delete-BLK.png';

// Creazione componente
const Transaction = ({
    id,
    amount,
    tagColor,
    tagId,
    walletId,
    type,
    date,
    recurrent = false,
    actionBtn = false,
    handleDelete,
}) => {
    // Azionatore Transazione
    const modify = useTransactionAction();
    // Stato transazione corrente
    const [currentTransaction, setCurrentTransaction] = useState({
        id,
        amount,
        tagColor,
        tagId,
        walletId,
        type,
        date,
    });

    return (
        <div className="flex items-center w-full border-border border-[3px] rounded-2xl justify-between p-2 max-w-[400px] bg-components-bg">
            <p
                className={`text-normal ${formatCurrencyColor(
                    currentTransaction.amount,
                    currentTransaction.type
                )}`}
            >
                {formatCurrency(
                    currentTransaction.amount,
                    currentTransaction.type
                )}
            </p>
            <p className="text-normal text-primary-txt">
                {!recurrent
                    ? currentTransaction.date
                    : formatRecurrency(currentTransaction.date, 'ui')}
            </p>
            <div
                className="w-10 h-10 rounded-[50%]"
                style={{ backgroundColor: currentTransaction.tagColor }}
            ></div>
            {actionBtn ? (
                <div className="flex gap-2">
                    <img
                        src={modifyImg}
                        alt="modifica"
                        role="button"
                        className="aspect-square w-6 h-6 object-cover"
                        onClick={() =>
                            modify(
                                currentTransaction,
                                setCurrentTransaction,
                                recurrent || false
                            )
                        }
                    />
                    <img
                        src={deleteImg}
                        alt="elimina"
                        role="button"
                        className="aspect-square w-6 h-6 object-cover"
                        onClick={() => handleDelete(currentTransaction.id)}
                    />
                </div>
            ) : null}
        </div>
    );
};

// Esportazione componente
export default Transaction;
