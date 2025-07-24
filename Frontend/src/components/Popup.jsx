// Importazione moduli
// Importazione componenti
import Button from './Button';
// Importazione immagini
import closeImg from '../assets/icons/add-BLK.png';

// Creazione componente
const Popup = ({ title, desc, action, btnTxt, setShow }) => {
    return (
        <div className="flex w-screen h-screen bg-black/60 items-center justify-center fixed top-0 left-0 z-40">
            <div className="flex flex-col w-[95%] max-w-[500px] rounded-2xl gap-3 relative bg-primary-bg z-40 border-border border-[3px] p-3">
                <h3 className="text-error text-xlarge">{title}</h3>
                <p className="text-primary-txt text-normal">{desc}</p>
                <Button
                    type={'warning'}
                    action={() => {
                        action();
                        setShow(false);
                    }}
                >
                    {btnTxt}
                </Button>
                <img
                    src={closeImg}
                    alt="X"
                    role="button"
                    onClick={() => setShow(false)}
                    className="object-cover aspect-square w-6 rotate-45 top-4 right-4 absolute"
                />
            </div>
        </div>
    );
};

// Esportazione componente
export default Popup;
