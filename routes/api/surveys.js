const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");

const Survey = require("../../models/Survey");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route    POST api/surveys
// @desc     Create a survey
// @access   Private
router.post("/", [auth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select("-password");

    const newSurvey = new Survey({
      text: req.body.text,
      coordinator: req.body.text,
      student: req.body.text,
      hostfamily: req.body.text,
      englishname: req.body.text,
      question1: req.body.text,
      question2: req.body.text,
      question3: req.body.text,
      name: user.name,
      user: req.user.id
    });

    const survey = await newSurvey.save();

    res.json(survey);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/surveys
// @desc     Get all surveys
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const surveys = await Survey.find().sort({ date: -1 });
    res.json(surveys);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/surveys/:id
// @desc     Get survey by ID
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);

    if (!survey) {
      return res.status(404).json({ msg: "Survey not found" });
    }

    res.json(survey);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Survey not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/surveys/:id
// @desc     Delete a survey
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);

    if (!survey) {
      return res.status(404).json({ msg: "Survey not found" });
    }

    // Check user
    if (survey.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await survey.remove();

    res.json({ msg: "Survey removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Survey not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
