// Importazione moduli
import { Link } from 'react-router-dom';
// Importazione componenti
// Importazione immagini
// Importazione stile

// Creazione componente
const Button = ({ children, onClick, url, type, className = '' }) => {
    if (url) {
        return (
            <Link
                to={url}
                className={`${className} rounded-2xl border-2 border-black w-fit pl-2 pr-2 pb-1 pt-1 text-white ${
                    type == 'warning' ? 'bg-error' : 'bg-primary-btn'
                }`}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            className={`${className} rounded-2xl border-2 border-black w-fit pl-2 pr-2 pb-1 pt-1 text-white ${
                type == 'warning' ? 'bg-error' : 'bg-primary-btn'
            }`}
        >
            {children}
        </button>
    );
};

// Esportazione componente
export default Button;
