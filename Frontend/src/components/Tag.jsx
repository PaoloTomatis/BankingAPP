// Importazione moduli
import { useEffect, useState } from 'react';
import { useNotification } from '../hooks/Notification.context';
import { usePopup } from '../hooks/Popup.context';
// Importazione immagini
import modifyImgBLK from '../assets/icons/pen-BLK.png';
import deleteImgBLK from '../assets/icons/delete-BLK.png';
import checkImgBLK from '../assets/icons/check-BLK.png';
import addImgBLK from '../assets/icons/add-BLK.png';

// Creazione componente
const Tag = ({ id, name, color = '#000' }) => {
    // Notificatore
    const notify = useNotification();
    // Poppuper
    const popup = usePopup();
    // Stato input
    const [input, setInput] = useState({ name: name, color: color });
    // Stato modifica
    const [modify, setModify] = useState(false);
    // Stato nome corrente
    const [currentTag, setCurrentTag] = useState({ name: name, color: color });
    // Stato errore
    const [error, setError] = useState(null);

    // Funzione gestione eliminazione portafoglio
    const handleDelete = () => {
        //TODO - Faccio richiesta eliminazione portafoglio
        popup(
            'Conferma ELIMINAZIONE',
            `Eliminando "${name.toUpperCase()}" non sarà più possibile utilizzarlo e tutte le sue transazioni saranno anch'esse irrecuperabili. Quest'azione è irreversibile!`,
            'Procedi',
            () => console.log('Eliminato portafoglio: ', id)
        );
    };

    // Funzione gestione modifica portafoglio
    const handleModify = () => {
        // Sanificazione nome
        const sanitizedInput = input.name?.trim();

        // Controllo nome portafoglio
        if (
            sanitizedInput?.length <= 30 &&
            sanitizedInput?.length >= 3 &&
            (currentTag.name !== input.name || currentTag.color !== input.color)
        ) {
            //TODO - Faccio richiesta modifica portafoglio
            notify(
                'success',
                'Il portafoglio è stato modificato correttamente!'
            );
            // Aggiornamento portafoglio
            setCurrentTag({ name: input.name, color: input.color });
        } else {
            setInput({ color: currentTag.color, name: currentTag.name });
            setError(
                'Errore! Il nome deve essere compreso tra i 3 e i 30 caratteri'
            );
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
        setInput({ color: currentTag.color, name: currentTag.name });
    };

    return (
        <>
            <div className="flex relative">
                <div className="min-h-[38px] w-[282px] pr-10 pl-3 pt-1 pb-1 border-[3px] border-border rounded-2xl bg-secondary-bg cursor-pointer flex gap-3 items-center">
                    {modify ? (
                        <>
                            <input
                                type="color"
                                value={input.color.toLowerCase()}
                                className="max-w-10 h-10 rounded-[50%] w-full border-none outline-none p-0 m-0 cursor-pointer bg-transparent"
                                onChange={(e) => {
                                    if (error) {
                                        setError(null);
                                    }
                                    setInput({
                                        ...input,
                                        color: e.target.value,
                                    });
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSwitch(false);
                                    if (e.key === 'Escape')
                                        handleSwitch(false, false);
                                }}
                            ></input>
                            <input
                                type="text"
                                className="bg-transparent border-none outline-none w-full"
                                value={input.name}
                                onChange={(e) => {
                                    if (error) {
                                        setError(null);
                                    }
                                    setInput({
                                        ...input,
                                        name: e.target.value,
                                    });
                                    if (error) setError(null);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSwitch(false);
                                    if (e.key === 'Escape')
                                        handleSwitch(false, false);
                                }}
                                autoFocus
                            />
                        </>
                    ) : (
                        <>
                            <div
                                className="w-10 h-10 rounded-[50%]"
                                style={{
                                    backgroundColor: currentTag.color,
                                }}
                            ></div>
                            <p className="text-normal">{currentTag.name}</p>
                        </>
                    )}
                </div>

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
export default Tag;
