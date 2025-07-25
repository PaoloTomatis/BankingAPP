// Importazione moduli
import { useContext, createContext, useState, useEffect } from 'react';
// Importazione componenti
import Notification from '../components/Notification';

// Context avvisi
const NotificationContext = createContext(null);

const useNotification = () => {
    return useContext(NotificationContext);
};

const NotificationProvider = ({ children }) => {
    // Stato notifica attuale
    const [notification, setNotification] = useState({});
    // Stato visibilità notifica
    const [notificationShow, setNotificationShow] = useState(false);

    useEffect(() => {
        if (notificationShow) {
            const idTimeout = setTimeout(() => {
                setNotificationShow(false);
            }, 4000);
            return () => clearTimeout(idTimeout);
        }
    }, [notificationShow]);

    // Funzione invio notifica
    const notify = (type, desc, title) => {
        // Impostazione notifica
        setNotification({ type, title, desc });
        // Impostazione visibilità notifica
        setNotificationShow(true);
    };

    return (
        <NotificationContext.Provider value={notify}>
            {children}
            <Notification
                type={notification.type}
                title={notification.title}
                desc={notification.desc}
                show={notificationShow}
                setShow={setNotificationShow}
            />
        </NotificationContext.Provider>
    );
};

// Esportazione provider e hook
export { useNotification, NotificationProvider };
