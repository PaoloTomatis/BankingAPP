// Importazione moduli
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../hooks/Notification.context';
import { usePopup } from '../hooks/Popup.context';
// Importazione immagini
import modifyImgBLK from '../assets/icons/pen-BLK.png';
import deleteImgBLK from '../assets/icons/delete-BLK.png';
import checkImgBLK from '../assets/icons/check-BLK.png';
import addImgBLK from '../assets/icons/add-BLK.png';

// Creazione componente
const Wallet = ({ id, name }) => {
    // Notificatore
    const notify = useNotification();
    // Poppuper
    const popup = usePopup();
    // Navigatore
    const navigator = useNavigate();
    // Stato input
    const [input, setInput] = useState(name);
    // Stato modifica
    const [modify, setModify] = useState(false);
    // Stato nome corrente
    const [currentWallet, setCurrentWallet] = useState({ name });
    // Stato errore
    const [error, setError] = useState(null);

    // Gestione errori
    useEffect(() => {
        // Sanificazione input
        const sanitizedInput = input.trim();

        // Controllo input
        if (sanitizedInput?.length > 30 || sanitizedInput?.length < 3) {
            // Impostazione errore
            setError(
                'Errore! Il nome deve essere compreso tra i 3 e i 30 caratteri'
            );
        } else {
            // Eliminazione errore
            setError(null);
        }
    }, [input]);

    // Controllo errore
    useEffect(() => {
        if (error) {
            console.log(error);
        }
    }, [error]);

    // Funzione gestione eliminazione portafoglio
    const handleDelete = () => {
        popup(
            'Conferma ELIMINAZIONE',
            `Eliminando "${name.toUpperCase()}" non sarà più possibile utilizzarlo e tutte le sue transazioni saranno anch'esse irrecuperabili. Quest'azione è irreversibile!`,
            'Procedi',
            //TODO - Faccio richiesta eliminazione portafoglio
            () => console.log('Eliminato portafoglio: ', id)
        );
    };

    // Funzione gestione modifica portafoglio
    const handleModify = () => {
        // Controllo nome portafoglio
        if (!error && currentWallet.name !== input) {
            //TODO - Faccio richiesta modifica portafoglio
            notify(
                'success',
                'Il portafoglio è stato modificato correttamente!'
            );
            // Aggiornamento portafoglio
            setCurrentWallet({ ...currentWallet, name: input });
        } else {
            setInput(currentWallet.name);
        }
    };

    // Funzione gestione modifica modalità
    const handleSwitch = (activate, save = true) => {
        if (!activate && save) {
            // Gestione modifica portafoglio
            handleModify();
        }
        // Modifica modalità
        setModify(activate);
        // Disattivazione errore
        setError(null);
        // Impostazione input
        setInput(currentWallet.name);
    };

    return (
        <>
            <div className="flex relative">
                {modify ? (
                    <input
                        type="text"
                        className={`min-h-[38px] w-[282px] pr-15 pl-3 pt-1 pb-1 border-[3px] rounded-2xl bg-secondary-bg ${
                            error ? 'border-error' : 'border-border'
                        } focus:${
                            error ? 'border-error' : 'border-border'
                        } outline-none`}
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            if (error) setError(null);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSwitch(false);
                            if (e.key === 'Escape') handleSwitch(false, false);
                        }}
                        onBlur={() => {
                            if (!error) handleSwitch(false);
                        }}
                        autoFocus
                    />
                ) : (
                    <div
                        className="min-h-[38px] w-[282px] pr-10 pl-3 pt-1 pb-1 border-[3px] border-border rounded-2xl bg-secondary-bg cursor-pointer"
                        onClick={() => navigator(`/dashboard/${id}`)}
                    >
                        {currentWallet.name}
                    </div>
                )}

                <img
                    src={modify ? checkImgBLK : modifyImgBLK}
                    alt="icon"
                    className={`absolute bottom-1/2 w-5 aspect-square object-cover right-11 translate-y-1/2 ${
                        error
                            ? 'opacity-50 cursor-not-allowed'
                            : 'cursor-pointer'
                    }`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={error ? null : () => handleSwitch(!modify, true)}
                />
                <img
                    src={modify ? addImgBLK : deleteImgBLK}
                    alt="icon"
                    className={
                        modify
                            ? 'absolute bottom-1/2 w-5 aspect-square object-cover right-3 translate-y-1/2 cursor-pointer rotate-[45deg]'
                            : 'absolute bottom-1/2 w-5 aspect-square object-cover right-3 translate-y-1/2 cursor-pointer'
                    }
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={
                        modify
                            ? () => handleSwitch(false, false)
                            : () => handleDelete()
                    }
                />
            </div>
        </>
    );
};

// Esportazione componente
export default Wallet;
