const FeedbackModel = require("../models/feedback");

module.exports = {
  addFeedback: async (req, res, next) => {
    try {
      const { userId, productId, ratings, reviews } = req.body;

      const newFeedback = await FeedbackModel.create({
        userId,
        productId,
        ratings,
        reviews,
      });
      res.status(201).json(newFeedback);
    } catch (error) {
      console.error("Error adding feedback:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getFeedback: async (req, res, next) => {
    try {
      const feedback = await FeedbackModel.findAll();
      res.status(200).json(feedback);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getFeedbackById: async (req, res, next) => {
    try {
      const { feedbackId } = req.params;
      const feedback = await FeedbackModel.findByPk(feedbackId);
      if (!feedback) {
        res.status(404).json({ error: "Feedback not found" });
        return;
      }
      res.status(200).json(feedback);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateFeedback: async (req, res, next) => {
    try {
      const { feedbackId } = req.params;
      const { ratings, reviews } = req.body;

      const feedback = await FeedbackModel.findByPk(feedbackId);
      if (!feedback) {
        res.status(404).json({ error: "Feedback not found" });
        return;
      }

      feedback.ratings = ratings;
      feedback.reviews = reviews;
      await feedback.save();

      res.status(200).json(feedback);
    } catch (error) {
      console.error("Error updating feedback:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteFeedback: async (req, res, next) => {
    try {
      const { feedbackId } = req.params;
      const feedback = await FeedbackModel.findByPk(feedbackId);
      if (!feedback) {
        res.status(404).json({ error: "Feedback not found" });
        return;
      }
      await feedback.destroy();
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting feedback:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
