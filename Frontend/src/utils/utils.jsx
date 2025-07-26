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

export { formatCurrency, formatCurrencyColor };
