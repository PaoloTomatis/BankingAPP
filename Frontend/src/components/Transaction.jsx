// Importazione moduli
import {
    formatCurrency,
    formatCurrencyColor,
    formatRecurrency,
} from '../utils/utils';
import { useTransactionAction } from '../hooks/TransactionAction.context';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Importazione componenti
// Importazione immagini
import modifyImg from '../assets/icons/pen-BLK.png';
import deleteImg from '../assets/icons/delete-BLK.png';

// Creazione componente
const Transaction = ({
    id,
    amount,
    tagId,
    walletId,
    type,
    date,
    recurrent = false,
    actionBtn = false,
    handleDelete,
    tags,
    redirect,
}) => {
    // Navigatore
    const navigator = useNavigate();
    // Azionatore Transazione
    const modify = useTransactionAction();
    // Stato transazione corrente
    const [currentTransaction, setCurrentTransaction] = useState({
        id,
        amount,
        tagId,
        walletId,
        type,
        date,
    });

    return (
        <div
            onClick={
                redirect
                    ? () =>
                          navigator(
                              `/transactions-history/${currentTransaction.id}`
                          )
                    : null
            }
            id={currentTransaction.id}
            className="flex items-center border-border border-[3px] rounded-2xl justify-between p-2 max-w-[400px] w-[95%] bg-components-bg cursor-pointer"
        >
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
                style={{
                    backgroundColor: tags
                        ? tags[
                              tags?.findIndex(
                                  (tag) => tag.id === currentTransaction.tagId
                              )
                          ]?.color || '#000000'
                        : '#000000',
                }}
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
