// Importazione moduli
import { useState } from 'react';

// Creazione componente
const Input = ({ placeHolder, icon, action }) => {
    // Stato input
    const [input, setInput] = useState('');

    return (
        <>
            <div className="flex relative">
                <input
                    type="text"
                    placeholder={placeHolder}
                    className="pr-10 pl-3 pt-1 pb-1 border-border border-[3px] rounded-2xl focus:border-border outline-none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) =>
                        e.key == 'Enter' && action(input, setInput)
                    }
                />
                {icon ? (
                    <img
                        src={icon}
                        alt="icon"
                        className="absolute bottom-1/2 w-5 aspect-square object-cover right-3 translate-y-1/2 cursor-pointer"
                        onClick={() => action(input, setInput)}
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
