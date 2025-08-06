// Importazione moduli
import { usePopup } from '../hooks/Popup.context';
import { useNotification } from '../hooks/Notification.context';
import { useNavigate } from 'react-router-dom';
// Importazione componenti
import Navbar from '../components/Navbar';
import Button from '../components/Button';
// Importazione immagini
import profileImg from '../assets/icons/user-BLK.png';

// Creazione pagina
const Account = () => {
    //TODO - Ricavo dati da useAuth
    // Stato account
    const account = { id: 1, username: 'Pollito0o0', email: 'pol@gmail.com' };
    // Popupper
    const popup = usePopup();
    // Notificatore
    const notify = useNotification();
    // Navigatore
    const navigator = useNavigate();

    // Funzione gestione logout
    const handleLogout = () => {
        popup(
            'Conferma LOGOUT',
            'Continuando uscirai dal tuo account e sarà necessaria la riautenticazione per la visualizzazione dei tuoi dati!',
            'Procedi',
            () => {
                notify(
                    'success',
                    'Il Logout è stato effettuato correttamente!'
                );
                navigator('/auth/login');
            }
        );
        //TODO - Richiesta logout da useAuth
    };

    // Funzione gestione eliminazione
    const handleDelete = () => {
        popup(
            'Conferma ELIMINAZIONE',
            "Eliminando il tuo ACCOUNT non sarà più possibile utilizzarlo e tutti i suoi dati verranno eliminati. Quest'azione è irreversibile!",
            'Procedi',
            () => {
                notify('success', "L'Account è stato eliminato correttamente!"),
                    navigator('/auth/signup');
            }
        );
        //TODO - Richiesta eliminazione da useAuth
    };

    return (
        <>
            <div className="flex flex-col w-full max-h-screen overflow-hidden">
                <div className="w-full flex flex-col items-center justify-center gap-2 mt-[5vh]">
                    <img
                        src={profileImg}
                        alt="immagine profilo"
                        className="w-[65px] h-[65px] rounded-full object-cover bg-white p-1"
                    />
                    <p className="text-normal">
                        Username: <strong>{account.username}</strong>
                    </p>
                    <p className="text-normal">
                        Email: <strong>{account.email}</strong>
                    </p>
                </div>
                <div className="h-[3px] bg-black w-full mt-3 mb-3"></div>
                <div className="h-[50vh] w-full flex flex-col items-center justify-center gap-3">
                    <Button onClick={handleLogout} type={'warning'}>
                        Logout ACCOUNT
                    </Button>
                    <Button onClick={handleDelete} type={'warning'}>
                        Elimina ACCOUNT
                    </Button>
                </div>
            </div>
            <Navbar />
        </>
    );
};

// Esportazione pagina
export default Account;
