const express = require("express");
const router = express.Router();
const { getHomepageStories, getStories, getStory, updateLikes, addStory } = require("../controllers/storyController.js")

router.get("/", getHomepageStories);
router.get("/stories", getStories);
router
    .get("/stories/:id", getStory)
    .post("/stories/:id", addStory);

router.post("/stories/:id/likeDislike", updateLikes);

module.exports = router;