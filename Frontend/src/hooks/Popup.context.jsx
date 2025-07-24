// Importazione moduli
import { useContext, createContext, useState } from 'react';
// Importazione componenti
import Popup from '../components/Popup';

// Context avvisi
const PopupContext = createContext(null);

const usePopup = () => {
    return useContext(PopupContext);
};

const PopupProvider = ({ children }) => {
    // Stato notifica attuale
    const [popup, setPopup] = useState({});
    // Stato visibilità notifica
    const [popupShow, setPopupShow] = useState(false);

    // Funzione invio notifica
    const notify = (title, desc, btnTxt, action) => {
        // Impostazione notifica
        setPopup({ title, desc, action, btnTxt });
        // Impostazione visibilità notifica
        setPopupShow(true);
    };

    return (
        <PopupContext.Provider value={notify}>
            {children}
            {popupShow ? (
                <Popup
                    title={popup.title}
                    desc={popup.desc}
                    action={popup.action}
                    btnTxt={popup.btnTxt}
                    show={popupShow}
                    setShow={setPopupShow}
                />
            ) : null}
        </PopupContext.Provider>
    );
};

// Esportazione provider e hook
export { usePopup, PopupProvider };
