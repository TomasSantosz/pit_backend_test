import app from './src/app.js'
import os from 'os';
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor escutando em htt
    /localhost:${port}`)
})

