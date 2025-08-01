// npx tailwindcss -i ./src/input.css -o ./src/main.css --watch
// Importazione moduli
import { useParams } from 'react-router-dom';
// Importazione componenti
import Navbar from '../components/Navbar';
import DashboardSection1 from '../sections/DashboardSection1';
import DashboardSection2 from '../sections/DashboardSection2';

// Creazione pagina
const Dashboard = () => {
    // Parametri
    const { id } = useParams();

    return (
        <>
            {id ? (
                <>
                    <DashboardSection2 walletId={id} />
                    <Navbar />
                </>
            ) : (
                <>
                    <DashboardSection1 />
                    <Navbar />
                </>
            )}
        </>
    );
};

// Esportazione pagina
export default Dashboard;
