// Importazione moduli
// Importazione componenti
import Button from '../components/Button';
// Importazione immagini

// Creazione pagina
const Warning = () => {
    sessionStorage.setItem('bannerShown', 'true');

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
export default Warning;
