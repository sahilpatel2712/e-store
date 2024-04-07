const express = require("express");
const {
  getFeedback,
  getFeedbackById,
  addFeedback,
  updateFeedback,
  deleteFeedback,
} = require("../../controllers/feedbackController");

const router = express.Router();

router.get("/feedback", getFeedback);
router.get("/feedback/:productId", getFeedbackById);
router.post("/feedback/add", addFeedback);
router.post("/feedback/update/:feedbackId", updateFeedback);
router.post("/feedback/delete/:feedbackId", deleteFeedback);

module.exports = router;
