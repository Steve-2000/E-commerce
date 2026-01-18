const app = require('./app');
const dotenv = require('dotenv');
const path = require('path');

const connectdatabase = require('./config/database');

dotenv.config({ path: path.join(__dirname, 'config/config.env') });
const PORT = process.env.PORT || 8000;

connectdatabase();

const server = app.listen(PORT, () => {
    console.log(`Server is working on http://localhost:${PORT}`);
})

process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise Rejection');
    server.close(() => {
        process.exit(1);
    });
})
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to Uncaught Exception');
    server.close(() => {
        process.exit(1);
    });
});



