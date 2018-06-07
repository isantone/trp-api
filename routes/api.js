const express = require('express');

const router = express.Router();

router.post('/resiter', (req, res) => {
    const { userLogin, userPassword } = req.body;

    console.log(`Login: ${userLogin} | Password: ${userPassword}`);
    // Store credentials in DB
});
