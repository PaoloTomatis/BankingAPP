// Importazione moduli
// Importazione componenti
import Navbar from '../components/Navbar';
import Button from '../components/Button';
// Importazione immagini
// Importazione stile

// Creazione pagina
const Transactions = () => {
    return (
        <>
            <Button url={'/transactions-history'} className="mt-[5vh]">
                Storico ⌚
            </Button>
            <Button url={'/transactions-recurrent'}>Ricorrenti 🔁</Button>
            <Navbar />
        </>
    );
};

// Esportazione pagina
export default Transactions;
