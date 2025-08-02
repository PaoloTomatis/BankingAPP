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
            <Button className="mt-[5vh]">Storico ⌚</Button>
            <Button>Ricorrenti 🔁</Button>
            <Navbar />
        </>
    );
};

// Esportazione pagina
export default Transactions;
