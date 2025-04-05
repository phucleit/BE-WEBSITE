const DomainServices = require("../../models/services/domain/model");

const statisticsController = {
  getYears: async(req, res) => {
    try {
      const { service } = req.query;

      if (!service) {
        return res.status(400).json({message: 'Vui lòng chọn dịch vụ!'});
      }

      const years = await DomainServices.aggregate([
        {
          $match: { registeredAt: { $ne: null } }
        },
        {
          $project: {
            year: { $year: "$registeredAt" }
          }
        },
        {
          $group: {
            _id: "$year"
          }
        },
        {
          $sort: { _id: 1 }
        }
      ]);
  
      const formattedYears = years.map((item) => item._id.toString());
  
      res.json(formattedYears);
    } catch (err) {
      console.error("Lỗi lấy danh sách năm:", err);
      return res.status(500).send(err.message);
    }
  },

  getStatistics: async(req, res) => {
    try {
      const { year, service } = req.query;

      if (!year || !service) {
        return res.status(400).json({ message: "Vui lòng chọn năm và dịch vụ!" });
      }

      const serviceNum = parseInt(service);

      if (serviceNum === 1) {
        const start = new Date(`${year}-01-01`);
        const end = new Date(`${parseInt(year) + 1}-01-01`);

        const results = await DomainServices.aggregate([
          {
            $match: {
              registeredAt: { $gte: start, $lt: end },
              domain_plan_id: { $ne: null }
            }
          },
          {
            $lookup: {
              from: "domainplans",
              localField: "domain_plan_id",
              foreignField: "_id",
              as: "plan"
            }
          },
          { $unwind: "$plan" },
          {
            $group: {
              _id: { $month: "$registeredAt" },
              import_price: { $sum: "$plan.import_price" },
              price: { $sum: "$plan.price" }
            }
          },
          {
            $project: {
              month: "$_id",
              import_price: 1,
              price: 1,
              _id: 0
            }
          },
          { $sort: { month: 1 } }
        ]);

        const formatted = results.map((item) => ({
          month: `Tháng ${item.month}`,
          import_price: item.import_price,
          price: item.price
        }));

        const total = formatted.reduce(
          (acc, item) => {
            acc.import_price += item.import_price;
            acc.price += item.price;
            return acc;
          },
          { import_price: 0, price: 0 }
        );
  
        return res.json({
          data: formatted,
          total
        });
      }

      return res.status(400).json({ message: "Dịch vụ chưa được hỗ trợ!" });
    } catch(err) {
      console.error(err);
      return res.status(500).send(err.message);
    }
  }
}

module.exports = statisticsController;