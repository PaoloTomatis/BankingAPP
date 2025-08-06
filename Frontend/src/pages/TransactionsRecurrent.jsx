// Importazione moduli
// Importazione componenti
import TransactionsSection from '../sections/TransactionsSection';
import Navbar from '../components/Navbar';
import Input from '../components/Input';
// Importazione immagini
import addImgBLK from '../assets/icons/add-BLK.png';

// Creazione pagina
const TransactionsRecurrent = () => {
    // Funzione gestione creazione portafoglio
    const handlerInput = (value, setValue, setError) => {
        // Sanificazione input
        const sanitizedValue = Math.round(parseFloat(value) * 100) / 100;

        // Controllo value
        if (
            (sanitizedValue != 0 || !sanitizedValue) &&
            !isNaN(sanitizedValue)
        ) {
            // Gestione valore
            //TODO - Faccio richiesta aggiunta transazione
            console.log('Aggiunto: ', {
                userId: 1,
                walletId: 1,
                tagId: null,
                amount: Math.abs(sanitizedValue),
                type: sanitizedValue >= 0 ? 'income' : 'expense',
                recurrence: '1m',
                last_date: new Date().toISOString(),
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
            <TransactionsSection className="mt-[5vh]" recurrents={true} />
            <Navbar />
        </>
    );
};

// Esportazione pagina
export default TransactionsRecurrent;
