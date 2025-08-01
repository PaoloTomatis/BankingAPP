// Importazione moduli
// Importazione componenti
// Importazione immagini
// Importazione stile

// Creazione componente
const Card = ({ className, title, children }) => {
    return (
        <div
            className={`${className} flex flex-col w-[95%] max-w-[400px] rounded-2xl border-border border-[3px] items-center`}
        >
            <h2 className="text-xlarge text-primary-txt p-3 font-bold">
                {title}
            </h2>
            <div className="bg-primary-txt w-full h-[3px]"></div>
            {children}
        </div>
    );
};

// Esportazione componente
export default Card;
