const router = require('express').Router();
const deviceServices = require('../services/deviceServices');

router.get('/', async (req, res) => {

    try {
        //TODO: GET DEVICE FROM SERVICES!
        let devices = await deviceServices.getAll().lean();
        devices = devices.slice(devices.length - 3)

        res.render('home/home', { devices })
    } catch (err) {
        console.log(err);
    }

})

router.get('/about', (req, res) => {
    res.render('home/about');
})

router.get('/404', (req, res) => {
    res.render('404');
})

module.exports = router;