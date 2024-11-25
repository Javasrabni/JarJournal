const express = require('express')
const fs = require('fs')
const path = require('path')
const port = 5000;
const app = express()
const cors = require('cors')

// Middleware
app.use(express.json())
app.use(cors())

// endpoint
app.post('/save-tes', (req, res) => {
    const { array } = req.body

    // save array into file system
    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(array, null, 2), (err) => {
        if (err) {
            console.error('Error writing file', err)
            return res.status(500).json({ message: 'Failed to save data' })
        }

        res.status(200).json({message: 'Sukses menyimpan.'})
    })
})

app.get('/save-tes', (req, res) => {
    const filePath = path.join(__dirname, 'data.json'); // Menentukan path file data.json
    // Membaca isi file data.json
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err); // Jika terjadi error saat membaca file
            res.status(500).send('Error reading file');
            return;
        }

        // Mengirimkan isi file sebagai teks
        res.send(data);
    });
});

app.listen(port, ()=> {
    console.log(`Server berjalan di ${port}`)
})