const express = require("express");

const router = express.Router();

const QRCode = require("qrcode");


router.post("/generate-qr", async (req, res) => {

    try {

        const { studentName } = req.body;

        const qrData = JSON.stringify({

            studentName

        });

        const qrImage =
            await QRCode.toDataURL(qrData);

        res.json({

            message: "QR Generated",

            qrImage

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message: "QR Error"

        });

    }

});

module.exports = router;