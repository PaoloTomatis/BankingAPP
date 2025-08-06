// Importazione moduli
import { Link, useLocation } from 'react-router-dom';
// Importazione componenti
// Importazione immagini
import logoImg from '../assets/FinanceLogo.png';
import homeImgBLK from '../assets/icons/home-BLK.png';
import homeImgWHT from '../assets/icons/home-WHT.png';
import transactionsImgBLK from '../assets/icons/transaction-BLK.png';
import transactionsImgWHT from '../assets/icons/transaction-WHT.png';
import tagsImgBLK from '../assets/icons/tag-BLK.png';
import tagsImgWHT from '../assets/icons/tag-WHT.png';
import profileImgBLK from '../assets/icons/user-BLK.png';
import profileImgWHT from '../assets/icons/user-WHT.png';

// Creazione componente
const Navbar = () => {
    // Pagina corrente
    const currentPage = useLocation().pathname;
    // Pagine
    const pages = [
        {
            condition: currentPage == '/' || currentPage.includes('/dashboard'),
            url: '/dashboard',
            imgBLK: homeImgBLK,
            imgWHT: homeImgWHT,
            name: 'Home',
        },
        {
            condition:
                currentPage == '/transactions' ||
                currentPage == '/transactions-history' ||
                currentPage == '/transactions-recurrent',
            url: '/transactions',
            imgBLK: transactionsImgBLK,
            imgWHT: transactionsImgWHT,
            name: 'Azioni',
        },
        {
            condition: true,
            url: '/dashboard',
            imgBLK: logoImg,
            imgWHT: logoImg,
            big: true,
        },
        {
            condition: currentPage == '/tags',
            url: '/tags',
            imgBLK: tagsImgBLK,
            imgWHT: tagsImgWHT,
            name: 'Tags',
        },
        {
            condition: currentPage == '/account',
            url: '/account',
            imgBLK: profileImgBLK,
            imgWHT: profileImgWHT,
            name: 'Profilo',
        },
    ];

    return (
        <div className="flex pt-2 pb-2 fixed bottom-0 left-0 w-screen z-40 border-t-[3px] border-[#000] items-center justify-center bg-white">
            <div className="flex justify-between w-[95%] h-full max-w-[400px] items-center">
                {pages.map((page, index) => {
                    return (
                        <Link
                            key={index}
                            to={page.url}
                            className="flex flex-col items-center justify-center"
                        >
                            <img
                                className={`aspect-square object-cover ${
                                    page.big ? 'w-[60px]' : 'w-[35px]'
                                }`}
                                src={page.condition ? page.imgBLK : page.imgWHT}
                                alt={page.name ? page.name.toLowerCase() : null}
                                fetchPriority="high"
                            />
                            <p className="text-small text-primary-txt">
                                {page.name}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

// Esportazione componente
export default Navbar;
