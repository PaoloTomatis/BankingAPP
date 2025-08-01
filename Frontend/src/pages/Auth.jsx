// Importazione moduli
import { useParams } from 'react-router-dom';
// Importazione componenti
import LoginSection from '../sections/LoginSection';
import SignupSection from '../sections/SignupSection';
import Navbar from '../components/Navbar';
// Importazione immagini
// Importazione stile

// Creazione pagina
const Auth = () => {
    // Tipo di pagina
    const { type } = useParams();

    return (
        <>
            {!type ? (
                <LoginSection />
            ) : type == 'login' ? (
                <LoginSection />
            ) : (
                <SignupSection />
            )}

            <Navbar />
        </>
    );
};

// Esportazione pagina
export default Auth;
