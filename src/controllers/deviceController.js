const router = require('express').Router();
const deviceServices = require('../services/deviceServices');

router.get('/device/catalog', async (req, res) => {
    try {
        const devices = await deviceServices.getAll().lean();

        res.render('device/catalog', { devices });
    } catch (err) {
        console.log(err);
    }
})

router.route('/device/create')
    .get((req, res) => {
        if (!res.user) {
            return res.redirect('/404');
        }
        res.render('device/create');
    })
    .post(async (req, res) => {
        const deviceData = req.body;
        try {
            deviceData.owner = res.user._id;
            await deviceServices.create(deviceData)
            res.redirect('/device/catalog')
            res.end()
        } catch (err) {
            const errorMessage = Object.values(err.errors)[0]?.message;
            res.render('device/create', { error: errorMessage, deviceData });
        }
    })

router.get('/device/details/:deviceId', async (req, res) => {
    const deviceId = req.params.deviceId;
    const userId = res.user?._id;
    try {
        const device = await deviceServices.getById(deviceId).lean();
        const isOwner = device.owner == userId;
        const isPrefer = device.preferredList.find(usersId => usersId == userId);

        res.render('device/details', { device, isOwner, isPrefer })
    } catch (err) {
        console.log(err);
    }
})

router.get('/device/prefer/:deviceId', async (req, res) => {
    if (!res.user) {
        return res.redirect('/404');
    }
    const deviceId = req.params.deviceId;
    const userId = res.user._id;
    try {
        const device = await deviceServices.getById(deviceId);
        if (device.owner == userId) {
            return res.redirect('/404');
        }

        device.preferredList.push(userId);
        await deviceServices.updateById(deviceId, device);
        res.redirect(`/device/details/${deviceId}`);
    } catch (err) {
        console.log(err);
    }
})

router.get('/device/delete/:deviceId', async (req, res) => {
    const deviceId = req.params.deviceId;

    try {
        const device = await deviceServices.getById(deviceId);
        if (device.owner != res.user?._id) {
            return res.redirect('/404');
        }

        await deviceServices.deleteById(deviceId);
        res.redirect('/device/catalog');
    } catch (err) {
        console.log(err);
    }
})

router.route('/device/edit/:deviceId')
    .get(async (req, res) => {
        try {
            const deviceData = await deviceServices.getById(req.params.deviceId).lean();
            if (res.user?._id != deviceData.owner) {
                return res.redirect('/404');
            }
            res.render('device/edit', { deviceData })
        } catch (err) {
            console.log(err);
        }
    })
    .post(async (req, res) => {
        const deviceId = req.params.deviceId;
        const deviceData = req.body;
        try {
            await deviceServices.updateById(deviceId, deviceData);
            res.redirect(`/device/details/${deviceId}`);
        } catch (err) {
            const errorMessage = Object.values(err.errors)[0]?.message;
            res.render('device/edit', { error: errorMessage, deviceData })
        }
    })

module.exports = router;