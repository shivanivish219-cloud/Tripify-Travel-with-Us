const express = require("express");
const router = express.Router();
const { search } = require("../controllers/searchController");

// GET /api/search?q=maanale&lang=hi&category=hill_station
router.get("/", search);

module.exports = router;

