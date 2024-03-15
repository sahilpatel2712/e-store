const express = require("express");
const {
  getFeedback,
  deleteFeedback,
} = require("../../controllers/admin/feedbackController");

const router = express.Router();

router.get("/feedbacks", getFeedback);
router.get("/feedbacks/delete/:feedbackId", deleteFeedback);

module.exports = router;
