// Importazione moduli
import { Link } from 'react-router-dom';
// Importazione componenti
import Navbar from '../components/Navbar';
// Importazione immagini
// Importazione stile

// Creazione pagina
const Page404 = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col w-screen min-h-full items-center">
                <h1 className="text-3xlarge text-primary-txt font-bold">
                    PAGINA NON TROVATA!😕
                </h1>
                <p className="text-normal text-primary-txt max-w-[400px] text-center">
                    Abbiamo cercato di lungo in largo, ma non abbiamo trovato
                    niente, prova ad andare alla{' '}
                    <Link to={'/dashboard'} className="text-link">
                        Dashboard
                    </Link>
                </p>
            </div>
        </>
    );
};

// Esportazione pagina
export default Page404;
