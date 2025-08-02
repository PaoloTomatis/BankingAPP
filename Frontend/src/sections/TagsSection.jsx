// Importazione moduli
import { useState, useEffect } from 'react';
import { useNotification } from '../hooks/Notification.context';
// Importazione componenti
import Tag from '../components/Tag';
import Spinner from '../components/Spinner';

// Creazione pagina
const TagsSection = () => {
    // Notificatore
    const notify = useNotification();
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

    // Controllo errore
    useEffect(() => {
        if (error) {
            notify('error', error);
        }
    }, [error]);

    return (
        <>
            <div className="flex flex-col gap-2.5">
                {loading ? (
                    <Spinner />
                ) : (
                    tags.map((tag) => {
                        return (
                            <Tag
                                key={tag.id}
                                id={tag.id}
                                name={tag.name}
                                color={tag.color}
                            />
                        );
                    })
                )}
            </div>
        </>
    );
};

// Esportazione pagina
export default TagsSection;
