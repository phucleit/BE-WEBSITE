const ActionLogs = require('../models/action-logs/model');

const actionLogsController = {
  getActionLogs: async (req, res) => {
    try {
      const action_logs = await ActionLogs.find().populate('user_id').sort({"createdAt": -1});
      return res.status(200).json(action_logs);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  },
}

module.exports = actionLogsController;