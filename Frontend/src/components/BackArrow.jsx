// Importazione moduli
import { Link } from 'react-router-dom';
// Importazione componenti
// Importazione immagini
import arrowImg from '../assets/icons/arrow-BLK.png';
// Importazione stile

// Creazione componente
const BackArrow = ({ onClick, className }) => {
    return (
        <img
            className={`${className} w-7 aspect-square h-7 object-cover`}
            role="button"
            onClick={onClick}
            src={arrowImg}
            alt="<--"
        />
    );
};

// Esportazione componente
export default BackArrow;
