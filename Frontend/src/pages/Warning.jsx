// Importazione moduli
import { useNavigate, Link } from 'react-router-dom';
// Importazione componenti
import Button from '../components/Button';
// Importazione immagini

// Creazione pagina
const Warning = () => {
    // Navigatore
    const navigator = useNavigate();

    // Pagina
    const page = sessionStorage.getItem('bannerPage') || '/dashboard';

    // Funzione gestione conferma
    const handleAccept = () => {
        // Impostazione visualizzazione avviso
        sessionStorage.setItem('bannerShown', 'true');
        // Rimozione pagina di reindirizzamento
        sessionStorage.removeItem('bannerPage');
        navigator(page);
    };

    return (
        <>
            <p className="mt-[5vh] max-w-[95%] w-[400px] text-center text-error font-bold">
                In quanto questo sito web è stato creato al solo scopo personale
                è ASSOLUTAMENTE VIETATO entrarci senza autorizzazione dal
                proprietario. L'ingresso è a rischio e pericolo del visitatore!
                Continuando si accettano implicitamente i cookie (necessari per
                alcune funzioni) e che qualunque cosa accada sia a completa
                responsabilità del visitatore! Se non si accettano i seguenti
                termini si è pregati di chiudere la finestra e non premere sul
                pulsante. I loghi utilizzati in questo sito sono stati presi da
                FLATICON, ecco i{' '}
                <Link className="text-primary" to="/credits">
                    crediti
                </Link>
                : GRAZIE!
            </p>
            <Button onClick={handleAccept} type="warning">
                Accetta e Procedi
            </Button>
        </>
    );
};

// Esportazione pagina
export default Warning;
