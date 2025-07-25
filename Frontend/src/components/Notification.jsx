// Importazione moduli
// Importazione componenti
// Importazione immagini
import closeImg from '../assets/icons/add-BLK.png';
// Importazione stile

// Creazione componente
const Notification = ({ type = 'success', title, desc, show, setShow }) => {
    return (
        <div
            className={`flex min-h-[15vh] gap-0.5 fixed bottom-0 left-0 w-screen justify-between items-center pr-10 pl-10 bg-secondary-bg border-[#000] border-t-[2px] transition-all duration-[300ms] ease z-50 ${
                show ? 'translate-y-0' : 'translate-y-[100%]'
            }`}
        >
            <div
                className={`h-[50px] rounded-[15px] ${
                    type == 'error'
                        ? 'bg-error'
                        : type == 'warning'
                        ? 'bg-warning'
                        : type == 'info'
                        ? 'bg-info'
                        : 'bg-success'
                } w-[5px]`}
            ></div>
            <div className="flex flex-col gap-1.5 mr-auto pl-3">
                <h3
                    className={`text-large ${
                        type == 'error'
                            ? 'text-error'
                            : type == 'warning'
                            ? 'text-warning'
                            : type == 'info'
                            ? 'text-info'
                            : 'text-success'
                    }`}
                >
                    {title
                        ? title
                        : type == 'error'
                        ? 'ERRORE'
                        : type == 'warning'
                        ? 'AVVISO'
                        : type == 'info'
                        ? 'INFORMAZIONE'
                        : 'SUCCESSO'}
                </h3>
                <p className="text-normal max-w-[300px]">{desc}</p>
            </div>
            <img
                role="button"
                src={closeImg}
                alt="X"
                className="rotate-45 aspect-square object-fill w-[23px] h-[23px] cursor-pointer"
                onClick={() => setShow(false)}
            />
        </div>
    );
};

// Esportazione componente
export default Notification;
