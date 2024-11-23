const express = require('express')
const fs = require('fs')
const path = require('path')
const port = 5000;
const app = express()

// Middleware
app.use(express.json())

// endpoint
app.post('/save-memo', (req, res) => {
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

app.listen(port, ()=> {
    console.log(`Server berjalan di ${port}`)
})