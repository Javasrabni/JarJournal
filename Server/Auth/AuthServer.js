const express = require('express');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors())
app.use(express.json());

// Secret key untuk JWT
const JWT_SECRET = 'your-secret-key';

// Tempat menyimpan user dan memo
const USERS_FILE_PATH = path.join(__dirname, 'users.json');

// Fungsi untuk membaca data dari file
const readUsersFile = () => {
    if (fs.existsSync(USERS_FILE_PATH)) {
        const data = fs.readFileSync(USERS_FILE_PATH);
        return JSON.parse(data);
    }
    return [];
};

// Fungsi untuk menulis ke file
const writeUsersFile = (users) => {
    fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2));
};

// Endpoint login untuk mendapatkan token
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = readUsersFile();
    const user = users.find(user => user.email === email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ token });
});

// Endpoint register untuk mendaftar user baru
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    const users = readUsersFile();
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
        id: Date.now(),
        email,
        password: hashedPassword,
        memos: []
    };
    users.push(newUser);
    writeUsersFile(users);

    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ token });
});

// Middleware untuk memeriksa token JWT
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log("Received Token:", token); // Debug
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        console.log("Verified User:", verified); // Debug
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};


// Endpoint untuk menyimpan memo
app.post('/save-memo', verifyToken, (req, res) => {
    const { memos } = req.body; // Ambil memos dari request body
    const users = readUsersFile();
    const userIndex = users.findIndex(user => user.id === req.user.userId);

    if (userIndex === -1) {
        console.error("User Not Found for Save:", req.user.userId); // Debug
        return res.status(400).json({ message: 'User not found' });
    }

    users[userIndex].memos = memos; // Update memos user
    writeUsersFile(users); // Simpan kembali ke file

    console.log("Updated Memos for User:", users[userIndex]); // Debug
    res.status(200).json({ message: 'Memo saved successfully' });
});



// Endpoint untuk mengambil memo berdasarkan user
app.get('/get-memos', verifyToken, (req, res) => {
    const users = readUsersFile();
    console.log("Users in File:", users); // Debug
    const user = users.find(user => user.id === req.user.userId);
    console.log("Requested User:", user); // Debug

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    res.status(200).json({ memos: user.memos });
});

// Mengambil info user
app.get('/user-info', verifyToken, (req, res) => {
    const users = readUsersFile();
    const user = users.find(user => user.id === req.user.userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ email: user.email });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
