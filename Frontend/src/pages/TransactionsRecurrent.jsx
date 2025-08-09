// Importazione moduli
// Importazione componenti
import TransactionsSection from '../sections/TransactionsSection';
import Navbar from '../components/Navbar';

// Creazione pagina
const TransactionsRecurrent = () => {
    return (
        <>
            <TransactionsSection className="mt-[5vh]" recurrents={true} />
            <Navbar />
        </>
    );
};

// Esportazione pagina
export default TransactionsRecurrent;
