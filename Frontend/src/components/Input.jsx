// Importazione moduli
import { useState, useEffect } from 'react';

// Creazione componente
const Input = ({ placeHolder, icon, addHandler, errorHandler }) => {
    // Stato input
    const [input, setInput] = useState('Nuovo Portafoglio');
    // Stato errore
    const [error, setError] = useState(null);

    // Gestione errori
    useEffect(() => errorHandler(input, setError), [input]);

    // Controllo errore
    useEffect(() => {
        if (error) {
            console.log(error);
        }
    }, [error]);

    return (
        <>
            <div className="flex relative">
                <input
                    type="text"
                    placeholder={placeHolder}
                    className={`min-h-[38px] w-[282px] pr-10 pl-3 pt-1 pb-1 border-border border-[3px] rounded-2xl ${
                        error ? 'border-error' : 'border-border'
                    } focus:${
                        error ? 'border-error' : 'border-border'
                    } outline-none`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) =>
                        e.key == 'Enter' && addHandler(input, setInput)
                    }
                />
                {icon ? (
                    <img
                        src={icon}
                        alt="icon"
                        className={`absolute bottom-1/2 w-5 aspect-square object-cover right-3 translate-y-1/2 ${
                            error
                                ? 'opacity-50 cursor-not-allowed'
                                : 'cursor-pointer'
                        }`}
                        onClick={() => addHandler(input, setInput)}
                    />
                ) : (
                    ''
                )}
            </div>
        </>
    );
};

// Esportazione componente
export default Input;
