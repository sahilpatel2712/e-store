const FeedbackModel = require("../../models/feedback");
const ProductModel = require("../../models/product");

module.exports = {
  getFeedback: async (req, res, next) => {
    try {
      let feedbacks = await FeedbackModel.findAll({
        include: [
          {
            model: ProductModel,
            attributes: ["productName"],
            required: true,
          },
        ],
      });
      feedbacks = feedbacks.map((feedback) => feedback.toJSON());
      res.render("layout/app", {
        title: "Feedback",
        filename: "../feedbacks/index",
        items: feedbacks,
        route: "feedback",
        admin:req.admins.admin,
      });
    } catch (error) {
      console.error("Error fetching feedback:", error);
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
      res.redirect("/admin/categories");
    } catch (error) {
      console.error("Error deleting feedback:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
