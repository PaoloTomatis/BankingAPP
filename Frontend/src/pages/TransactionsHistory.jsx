// Importazione moduli
// Importazione componenti
import TransactionsSection from '../sections/TransactionsSection';
import Navbar from '../components/Navbar';

// Creazione pagina
const TransactionsHistory = () => {
    return (
        <>
            <TransactionsSection className="mt-[5vh]" recurrents={false} />
            <Navbar />
        </>
    );
};

// Esportazione pagina
export default TransactionsHistory;
