// Importazione moduli
import { useState, useEffect } from 'react';
import { useNotification } from '../hooks/Notification.context';
import { usePopup } from '../hooks/Popup.context';
import { useAuth } from '../hooks/Auth.context';
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
    // Autenticazione
    const { accessToken } = useAuth();

    // Caricamento dati
    useEffect(() => {
        try {
            const getTags = async () => {
                // Effettuazione richiesta
                const req = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/tags`,
                    {
                        credentials: 'include',
                        method: 'GET',
                        headers: { Authorization: `Bearer ${accessToken}` },
                    }
                );

                // Conversione richiesta
                const data = await req.json();

                // Controllo richiesta
                if (!req.ok)
                    throw new Error(
                        data?.message || 'Errore interno del server'
                    );

                // Impostazione tags
                setTags(data.data);
            };

            getTags();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Funzione gestione eliminazione portafoglio
    const handleDelete = (id, name) => {
        popup(
            'Conferma ELIMINAZIONE',
            `Eliminando il tag "${name.toUpperCase()}" non sarà più possibile utilizzarlo e tutte le transazioni che lo utilizzano rimarranno senza il medesimo. Quest'azione è irreversibile!`,
            'Procedi',
            async () => {
                const prevTags = [...tags];
                try {
                    setTags(tags.filter((tag) => tag.id !== id));

                    // Effettuazione richiesta
                    const req = await fetch(
                        `${import.meta.env.VITE_API_URL}/api/tags/${id}`,
                        {
                            credentials: 'include',
                            method: 'DELETE',
                            headers: { Authorization: `Bearer ${accessToken}` },
                        }
                    );

                    // Conversione richiesta
                    const data = await req.json();

                    // Controllo richiesta
                    if (!req.ok)
                        throw new Error(
                            data?.message || 'Errore interno del server'
                        );

                    notify(
                        'success',
                        'Il Tag è stato eliminato correttamente!'
                    );
                } catch (error) {
                    setError(error.message);
                    setTags(prevTags);
                }
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
    const handlerInput = async (value, setValue, setError) => {
        const sanitizedValue = value.replace(/\s+/g, '');

        const result = tags.find((tag) => tag.id === 'waiting');

        // Controllo value
        if (
            !result &&
            sanitizedValue &&
            sanitizedValue?.length >= 3 &&
            sanitizedValue?.length <= 30
        ) {
            // Gestione valore
            const prevTags = [...tags];
            try {
                setTags([
                    ...tags,
                    { id: 'waiting', name: value, color: '#FFFFFF' },
                ]);

                // Effettuazione richiesta
                const req = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/tags`,
                    {
                        credentials: 'include',
                        method: 'POST',
                        body: JSON.stringify({
                            data: { name: value, color: '#FFFFFF' },
                        }),
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                // Conversione richiesta
                const data = await req.json();

                // Controllo richiesta
                if (!req.ok)
                    throw new Error(
                        data?.message || 'Errore interno del server!'
                    );

                setTags((prevTags) => {
                    return prevTags.map((tag) =>
                        tag.id === 'waiting'
                            ? { ...tag, id: data.data.id }
                            : tag
                    );
                });
            } catch (error) {
                notify('error', error.message);
                setTags(prevTags);
            }
            // Cancello testo e errore
            setValue('Nuovo Tag');
            setError(null);
        } else if (sanitizedValue?.length < 3 || sanitizedValue?.length > 30) {
            // Gestione errore
            setError('Il nome deve essere compreso tra i 3 e i 30 caratteri');
        } else if (result) {
            // Gestione errore
            notify(
                'error',
                'Un tag deve ancora essere caricato in rete, attendi'
            );
        }
    };

    return (
        <>
            <div className="flex flex-col gap-2.5">
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <Input
                            className={'mt-[5vh]'}
                            placeHolder={'Inserisci nome del Tag'}
                            icon={addImgBLK}
                            addHandler={handlerInput}
                            errorHandler={null}
                            defValue="Nuovo Tag"
                        />
                        {tags?.length <= 0 ? (
                            <p className="text-center">
                                Non sono presenti tags
                            </p>
                        ) : (
                            tags.map((tag) => {
                                return (
                                    <Tag
                                        key={tag.id}
                                        id={tag.id}
                                        name={tag.name}
                                        color={tag.color}
                                        handleDelete={handleDelete}
                                    />
                                );
                            })
                        )}
                    </>
                )}
            </div>
        </>
    );
};

// Esportazione pagina
export default TagsSection;
