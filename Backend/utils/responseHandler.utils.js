// Funzione per gestione delle risposte
const responseHandler = (
    res,
    code = 200,
    success = true,
    message = null,
    data = null
) => {
    const response = {};
    if (success) response.success = success;
    if (message) response.message = message;
    if (data) response.data = data;
    return res.status(code).json(response);
};

// Esportazione funzione
export default responseHandler;
