// Importazione moduli
// Importazione componenti
import Input from '../components/Input';
// Importazione immagini
// Importazione stile

// Creazione sezione
const TransactionsSection = () => {
    // Funzione gestione creazione portafoglio
    const handlerInput = (value, setValue, setError) => {
        // Sanificazione input
        const sanitizedValue = Math.round(parseFloat(value) * 100) / 100;

        console.log(sanitizedValue);
        console.log(typeof sanitizedValue);

        // Controllo value
        if (
            (sanitizedValue != 0 || !sanitizedValue) &&
            typeof sanitizedValue == 'number'
        ) {
            const oggi = new Date();
            const giorno = String(oggi.getDate()).padStart(2, '0');
            const mese = String(oggi.getMonth() + 1).padStart(2, '0');
            const anno = oggi.getFullYear();

            // Gestione valore
            //TODO - Faccio richiesta aggiunta importo
            console.log('Aggiunto: ', {
                amount: Math.abs(sanitizedValue),
                walletId: 1,
                tagId: null,
                userId: 1,
                date: `${anno}-${mese}-${giorno}`,
                type: sanitizedValue >= 0 ? 'income' : 'expense',
            });
            // Cancello testo e errore
            setValue(0.0);
            setError(null);
        } else if (!sanitizedValue || typeof sanitizedValue != 'number') {
            // Gestione errore
            setError("L'importo deve essere un numero positivo o negativo!");
        }
    };

    return (
        <>
            <Input
                placeHolder={"Inserisci l'Importo"}
                addHandler={handlerInput}
                defValue={0.0}
                type="number"
                step="0.01"
            />
        </>
    );
};

// Esportazione sezione
export default TransactionsSection;
