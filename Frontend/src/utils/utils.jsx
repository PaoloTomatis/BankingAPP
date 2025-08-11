// Formattazione bilancio
const formatCurrency = (value, type = null) => {
    const formattedValue = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR',
    }).format(Math.abs(value));

    if (type) {
        return type == 'income'
            ? `+${formattedValue}`
            : type == 'expense'
            ? `-${formattedValue}`
            : formattedValue;
    }

    return value > 0 || type == 'income'
        ? `+${formattedValue}`
        : value < 0 || type == 'expense'
        ? `-${formattedValue}`
        : formattedValue;
};

// Formattazione colore
const formatCurrencyColor = (value, type = null) => {
    if (type) {
        return type == 'income'
            ? 'text-success'
            : type == 'expense'
            ? 'text-error'
            : 'text-warning';
    }

    return value > 0 || type == 'income'
        ? 'text-success'
        : value < 0 || type == 'expense'
        ? 'text-error'
        : 'text-warning';
};

// Formattazione ricorrenza
const formatRecurrency = (intervalStr, type) => {
    const value = parseInt(intervalStr.slice(0, -1));
    const unit = intervalStr.slice(-1);

    if (type !== 'ui') {
        switch (unit) {
            case 'm':
                return value * 60 * 1000;
            case 'h':
                return value * 60 * 60 * 1000;
            case 'd':
                return value * 24 * 60 * 60 * 1000;
            case 'M':
                return { months: value };
            case 'y':
                return { years: value };
            default:
                throw new Error('Intervallo non valido: ' + intervalStr);
        }
    } else {
        switch (unit) {
            case 'm':
                return `${value} ${value !== 1 ? 'minuti' : 'minuto'}`;
            case 'h':
                return `${value} ${value !== 1 ? 'ore' : 'ora'}`;
            case 'd':
                return `${value} ${value !== 1 ? 'giorni' : 'giorno'}`;
            case 'M':
                return `${value} ${value !== 1 ? 'mesi' : 'mese'}`;
            case 'y':
                return `${value} ${value !== 1 ? 'anni' : 'anno'}`;
            default:
                throw new Error('Intervallo non valido: ' + intervalStr);
        }
    }
};

// Funzione generatrice di password
const pswGenerator = (length) => {
    const data =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?. ,-_@#';
    let psw = '';

    while (
        !/^(?=[A-Za-z0-9!?. ,\-_@#]{8,255}$)(?=.*[0-9])(?=.*[!?. ,\-_@#])(?!.*[\s()])/.test(
            psw
        )
    ) {
        psw = '';
        for (let i = 0; i < length; i++) {
            psw += data[Math.floor(Math.random() * data.length)];
        }
    }

    return psw;
};

export { formatCurrency, formatCurrencyColor, formatRecurrency, pswGenerator };
