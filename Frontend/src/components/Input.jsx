// Importazione moduli
import { useState, useEffect } from 'react';

// Creazione componente
const Input = ({
    type = 'text',
    placeHolder,
    icon,
    addHandler,
    errorHandler,
    className = '',
    disableOnError = true,
    defValue = '',
    value,
    setValue,
    inputError,
    setInputError,
    step,
}) => {
    // Stato input
    const [internalInput, setInternalInput] = useState(defValue || '');
    const input =
        value !== undefined && setValue !== undefined ? value : internalInput;
    const setInput =
        value !== undefined && setValue !== undefined
            ? setValue
            : setInternalInput;
    // Stato errore
    const [internalInputError, setInternalInputError] = useState(null);
    const error =
        inputError !== undefined && setInputError !== undefined
            ? inputError
            : internalInputError;
    const setError =
        inputError !== undefined && setInputError !== undefined
            ? setInputError
            : setInternalInputError;

    // Gestione errori
    useEffect(() => {
        if (errorHandler) {
            errorHandler(input, setError);
        }
    }, [input, errorHandler, setError]);

    return (
        <>
            <div
                className={`${className} flex relative flex-col items-center mb-3`}
            >
                <input
                    type={type}
                    step={step || null}
                    placeholder={placeHolder}
                    className={`min-h-[38px] w-[282px] pr-10 pl-3 pt-1 pb-1 border-border border-[3px] rounded-2xl ${
                        error ? 'border-error' : 'border-border'
                    } focus:${
                        error ? 'border-error' : 'border-border'
                    } outline-none`}
                    value={input}
                    onChange={(e) => {
                        if (error) {
                            setError(null);
                        }
                        setInput(e.target.value);
                    }}
                    onKeyDown={(e) =>
                        e.key == 'Enter' && addHandler
                            ? addHandler(input, setInput, setError)
                            : null
                    }
                />
                {icon ? (
                    <img
                        src={icon}
                        alt="icon"
                        className={`absolute bottom-1/2 w-5 aspect-square object-cover right-3 translate-y-1/2 ${
                            error && disableOnError
                                ? 'opacity-50 cursor-not-allowed'
                                : 'cursor-pointer'
                        }`}
                        onClick={() =>
                            addHandler
                                ? addHandler(input, setInput, setError)
                                : null
                        }
                    />
                ) : null}
                {error ? (
                    <p className="absolute bottom-[-15px] text-xsmall text-error">
                        {error}
                    </p>
                ) : null}
            </div>
        </>
    );
};

// Esportazione componente
export default Input;
