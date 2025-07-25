// Importazione moduli
import { Link } from 'react-router-dom';
// Importazione componenti
// Importazione immagini
// Importazione stile

// Creazione componente
const Button = ({ children, action, url, type }) => {
    if (url) {
        return (
            <Link
                to={url}
                className={`rounded-2xl border-2 border-black w-fit pl-2 pr-2 pb-1 pt-1 ${
                    type == 'warning'
                        ? 'text-white bg-error'
                        : 'text-primary-txt bg-primary-btn'
                }`}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            onClick={action}
            className={`rounded-2xl border-2 border-black w-fit pl-2 pr-2 pb-1 pt-1 ${
                type == 'warning'
                    ? 'text-white bg-error'
                    : 'text-primary-txt bg-primary-btn'
            }`}
        >
            {children}
        </button>
    );
};

// Esportazione componente
export default Button;
