const express = require("express");
const { getImageUrls } = require("../controllers/imageController");


const router = express.Router();

router.get("/get-urls", getImageUrls);

module.exports = router;
