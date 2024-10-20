const router = require('express').Router();
const deviceServices = require('../services/deviceServices');

router.get('/profile', async (req, res) => {
    if (!res.user) {
        return res.redirect('/404');
    }
    try {
        const userId = res.user._id;

        const devices = await deviceServices.getAll().lean();
        const createdDevices = devices.filter(device => device.owner == userId);
        const preferDevices = devices.filter(device => device.preferredList.find(usersId => usersId == userId))

        res.render('profile/profile', { username: res.user.username, email: res.user.email, createdDevices, preferDevices })
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;