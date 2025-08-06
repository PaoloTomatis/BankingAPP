// Importazione moduli
// Importazione componenti
import TransactionsSection from '../sections/TransactionsSection';
import Navbar from '../components/Navbar';
import Input from '../components/Input';
// Importazione immagini
import addImgBLK from '../assets/icons/add-BLK.png';

// Creazione pagina
const TransactionsHistory = () => {
    // Funzione gestione creazione portafoglio
    const handlerInput = (value, setValue, setError) => {
        // Sanificazione input
        const sanitizedValue = Math.round(parseFloat(value) * 100) / 100;

        // Controllo value
        if (
            (sanitizedValue != 0 || !sanitizedValue) &&
            !isNaN(sanitizedValue)
        ) {
            const date = new Date().toISOString();

            // Gestione valore
            //TODO - Faccio richiesta aggiunta importo
            console.log('Aggiunto: ', {
                amount: Math.abs(sanitizedValue),
                walletId: 1,
                tagId: null,
                userId: 1,
                date: date,
                type: sanitizedValue >= 0 ? 'income' : 'expense',
            });
            // Cancello testo e errore
            setValue(0.0);
            setError(null);
        } else if (!sanitizedValue || isNaN(sanitizedValue)) {
            // Gestione errore
            setError("L'importo deve essere un numero positivo o negativo!");
        }
    };

    return (
        <>
            <Input
                placeHolder={"Inserisci l'Importo"}
                addHandler={handlerInput}
                icon={addImgBLK}
                defValue={0.0}
                type="number"
                step="0.01"
                className="mt-[5vh]"
            />
            <TransactionsSection className="mt-[5vh]" recurrents={false} />
            <Navbar />
        </>
    );
};

// Esportazione pagina
export default TransactionsHistory;
