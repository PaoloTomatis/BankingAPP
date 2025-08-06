// Importazione moduli
import {
    formatCurrency,
    formatCurrencyColor,
    formatRecurrency,
} from '../utils/utils';
import { usePopup } from '../hooks/Popup.context';
import { useTransactionAction } from '../hooks/TransactionAction.context';
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
}) => {
    // Poppuper
    const popup = usePopup();
    // Azionatore Transazionme
    const modify = useTransactionAction();

    // Funzione gestione eliminazione transazione
    const handleDelete = () => {
        //TODO - Faccio richiesta eliminazione transazione
        popup(
            'Conferma ELIMINAZIONE',
            "Eliminando la TRANSAZIONE essa non sarà più reperibile e ciò influirà nel calcolo del bilancio. Quest'azione è irreversibile!",
            'Procedi',
            () =>
                notify(
                    'success',
                    'La Transazione è stata eliminata correttamente!'
                )
        );
    };

    return (
        <div className="flex items-center w-full border-border border-[3px] rounded-2xl justify-between p-2 max-w-[400px] bg-components-bg">
            <p className={`text-normal ${formatCurrencyColor(amount, type)}`}>
                {formatCurrency(amount, type)}
            </p>
            <p className="text-normal text-primary-txt">
                {!recurrent ? date : formatRecurrency(date, 'ui')}
            </p>
            <div
                className="w-10 h-10 rounded-[50%]"
                style={{ backgroundColor: tagColor }}
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
                                id,
                                amount,
                                type,
                                date,
                                walletId,
                                tagId,
                                recurrent || false
                            )
                        }
                    />
                    <img
                        src={deleteImg}
                        alt="elimina"
                        role="button"
                        className="aspect-square w-6 h-6 object-cover"
                        onClick={handleDelete}
                    />
                </div>
            ) : null}
        </div>
    );
};

// Esportazione componente
export default Transaction;
