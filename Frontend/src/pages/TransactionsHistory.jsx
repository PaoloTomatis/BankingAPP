// Importazione moduli
import { useParams } from 'react-router-dom';
// Importazione componenti
import TransactionsSection from '../sections/TransactionsSection';
import Navbar from '../components/Navbar';

// Creazione pagina
const TransactionsHistory = () => {
    // Parametro id
    const { id } = useParams();
    return (
        <>
            <TransactionsSection
                className="mt-[5vh]"
                recurrents={false}
                selectedId={id}
            />
            <Navbar />
        </>
    );
};

// Esportazione pagina
export default TransactionsHistory;
