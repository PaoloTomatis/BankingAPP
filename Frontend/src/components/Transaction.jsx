// Importazione moduli
import { Link } from 'react-router-dom';
import { formatCurrency, formatCurrencyColor } from '../utils/utils';
// Importazione componenti
// Importazione immagini
import modifyImg from '../assets/icons/pen-BLK.png';
import deleteImg from '../assets/icons/delete-BLK.png';
// Importazione stile

// Creazione componente
const Transaction = ({
    id,
    amount,
    tagColor,
    type,
    date,
    actionBtn = false,
}) => {
    return (
        <Link
            to={`/transactions/${id}`}
            className="flex items-center w-full border-border border-[3px] rounded-2xl justify-between p-2"
        >
            <p className={`text-normal ${formatCurrencyColor(amount, type)}`}>
                {formatCurrency(amount, type)}
            </p>
            <p className="text-normal text-primary-txt">{date}</p>
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
                    />
                    <img
                        src={deleteImg}
                        alt="elimina"
                        role="button"
                        className="aspect-square w-6 h-6 object-cover"
                    />
                </div>
            ) : null}
        </Link>
    );
};

// Esportazione componente
export default Transaction;
