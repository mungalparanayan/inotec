const express = require('express');
const router = express.Router();
const Feeds = require('../models/Feeds');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');  

router.post('/feedback', [
    body("email").isEmail().withMessage('Invalid email format'),
    body("rating").isInt()
], async (req, res) => {
    let success = true;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, rating} = req.body;
    try {
        let user = await Feeds.findOne({email});
        if(user) {
            success = false;
            return res.status(409).json({ error: "You have already submitted a rating. Multiple ratings are not allowed." });
        }        

        const newFeedback = new Feeds({
            email: email,
            rating: rating
        });
        await newFeedback.save();

        res.json({success, email, rating});
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router
