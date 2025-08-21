// Importazione moduli
import pool from '../database/database.js';

// Funzione azione ricorrente
const recurrentAction = async () => {
    // Richiesta transazioni ricorrenti
    const [transactions] = await pool.query(
        'SELECT * FROM recurring_transactions'
    );

    // Controllo data
    for (const transaction of transactions) {
        const value = parseInt(transaction.recurrence.slice(0, -1));
        const unit = transaction.recurrence.slice(-1);

        let nextDate = new Date(transaction.last_date);
        const now = new Date();

        while (true) {
            // Calcolo la prossima ricorrenza
            switch (unit) {
                case 'm':
                    nextDate.setMinutes(nextDate.getMinutes() + value);
                    break;
                case 'h':
                    nextDate.setHours(nextDate.getHours() + value);
                    break;
                case 'd':
                    nextDate.setDate(nextDate.getDate() + value);
                    break;
                case 'w':
                    nextDate.setDate(nextDate.getDate() + 7 * value);
                    break;
                case 'M':
                    nextDate.setMonth(nextDate.getMonth() + value);
                    break;
                case 'y':
                    nextDate.setFullYear(nextDate.getFullYear() + value);
                    break;
            }

            // Controllo data
            if (nextDate <= now) {
                await pool.query(
                    'INSERT INTO transactions (user_id, wallet_id, amount, type, tag_id, date) VALUES (?, ?, ?, ?, ?, ?)',
                    [
                        transaction.user_id,
                        transaction.wallet_id,
                        transaction.amount,
                        transaction.type,
                        transaction.tag_id,
                        nextDate.toISOString().split('T')[0],
                    ]
                );

                await pool.query(
                    'UPDATE recurring_transactions SET last_date = ? WHERE id = ?',
                    [nextDate.toISOString(), transaction.id]
                );
            } else {
                break;
            }
        }
    }
};

// Esportazione funzione
export default recurrentAction;
