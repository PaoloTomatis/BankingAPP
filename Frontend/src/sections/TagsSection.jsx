// Importazione moduli
import { useState, useEffect } from 'react';
import { useNotification } from '../hooks/Notification.context';
import { usePopup } from '../hooks/Popup.context';
// Importazione componenti
import Tag from '../components/Tag';
import Spinner from '../components/Spinner';
import Input from '../components/Input';
// Importazione immagini
import addImgBLK from '../assets/icons/add-BLK.png';

// Creazione pagina
const TagsSection = () => {
    // Notificatore
    const notify = useNotification();
    // Poppuper
    const popup = usePopup();
    // Stato portafogli
    const [tags, setTags] = useState([]);
    // Stato caricamento
    const [loading, setLoading] = useState(true);
    // Stato errore
    const [error, setError] = useState(null);

    // Caricamento dati
    useEffect(() => {
        try {
            //TODO - Effettuo chiamata API
            setTimeout(() => {
                setTags([
                    { id: 1, name: 'Tag 1', color: '#F44336' },
                    { id: 2, name: 'Tag 2', color: '#FFC107' },
                    { id: 3, name: 'Tag 3', color: '#3A7CD9' },
                ]);
                setLoading(false);
            }, 1000);
        } catch (error) {
            setError(error.message);
        } finally {
            // setLoading(false);
        }
    }, []);

    // Funzione gestione eliminazione portafoglio
    const handleDelete = (id, name) => {
        popup(
            'Conferma ELIMINAZIONE',
            `Eliminando il tag "${name.toUpperCase()}" non sarà più possibile utilizzarlo e tutte le transazioni che lo utilizzano rimarranno senza il medesimo. Quest'azione è irreversibile!`,
            'Procedi',
            () => {
                //TODO - Faccio richiesta eliminazione tag
                setTags(tags.filter((tag) => tag.id !== id));
                notify('success', 'Il Tag è stato eliminato correttamente!');
            }
        );
    };

    // Controllo errore
    useEffect(() => {
        if (error) {
            notify('error', error);
            setError(null);
        }
    }, [error]);

    // Funzione gestione creazione tag
    const handlerInput = (value, setValue, setError) => {
        const sanitizedValue = value.replace(/\s+/g, '');

        // Controllo value
        if (
            sanitizedValue &&
            sanitizedValue?.length >= 3 &&
            sanitizedValue?.length <= 30
        ) {
            // Gestione valore
            //TODO - Faccio richiesta aggiunta tag
            //TODO - Mancanza id alle nuove transazioni (dovrei ricevere id da backend)
            setTags([...tags, { name: value, color: '#FFFFFF' }]);
            // Cancello testo e errore
            setValue('Nuovo Tag');
            setError(null);
        } else if (sanitizedValue?.length < 3 || sanitizedValue?.length > 30) {
            // Gestione errore
            setError('Il nome deve essere compreso tra i 3 e i 30 caratteri');
        }
    };

    return (
        <>
            <div className="flex flex-col gap-2.5">
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        {' '}
                        <Input
                            className={'mt-[5vh]'}
                            placeHolder={'Inserisci nome del Tag'}
                            icon={addImgBLK}
                            addHandler={handlerInput}
                            errorHandler={null}
                            defValue="Nuovo Tag"
                        />
                        {tags.map((tag) => {
                            return (
                                <Tag
                                    key={tag.id}
                                    id={tag.id}
                                    name={tag.name}
                                    color={tag.color}
                                    handleDelete={handleDelete}
                                />
                            );
                        })}
                    </>
                )}
            </div>
        </>
    );
};

// Esportazione pagina
export default TagsSection;
