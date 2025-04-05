const DomainServices = require("../../models/services/domain/model");
const HostingServices = require("../../models/services/hosting/model");
const EmailServices = require("../../models/services/email/model");
const SslServices = require("../../models/services/ssl/model");
const WebsiteServices = require("../../models/services/website/model");
const ContentServices = require("../../models/services/content/model");
const ToplistServices = require("../../models/services/toplist/model");
const MaintenanceServices = require("../../models/services/maintenance/model");
const MobileNetworkServices = require("../../models/services/mobile-network/model");

const statisticsController = {
  getYears: async(req, res) => {
    try {
      const { service } = req.query;

      if (!service) {
        return res.status(400).json({message: 'Vui lòng chọn dịch vụ!'});
      }

      const serviceNum = parseInt(service);
      let model = null;
      let matchField = "registeredAt";

      switch (serviceNum) {
        case 1:
          model = DomainServices;
          break;
        case 2:
          model = HostingServices;
          break;
        case 3:
          model = EmailServices;
          break;
        case 4:
          model = SslServices;
          break;
        case 5:
          model = WebsiteServices;
          break;
        case 6:
          model = ContentServices;
          break;
        case 7:
          model = ToplistServices;
          break;
        case 8:
          model = MaintenanceServices;
          break;
        case 9:
          model = MobileNetworkServices;
          break;
        default:
          return res.status(400).json({ message: 'Dịch vụ không hợp lệ!' });
      }

      const years = await model.aggregate([
        {
          $match: { [matchField]: { $ne: null } }
        },
        {
          $project: {
            year: { $year: `$${matchField}` }
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
  
      const formattedYears = years.map(item => item._id.toString());
  
      return res.json(formattedYears);
    } catch (err) {
      console.error("Lỗi lấy danh sách năm:", err);
      return res.status(500).send(err.message);
    }
  },

  getStatistics: async(req, res) => {
    const { year, service } = req.query;

    if (!year || !service) {
      return res.status(400).json({ message: "Vui lòng chọn năm và dịch vụ!" });
    }

    const serviceNum = parseInt(service);
    let results = [];

    const start = new Date(`${year}-01-01`);
    const end = new Date(`${parseInt(year) + 1}-01-01`);

    switch (serviceNum) {
      case 1:
        results = await DomainServices.aggregate([
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
              profit: { $subtract: ["$price", "$import_price"] },
              _id: 0
            }
          },
          { $sort: { month: 1 } }
        ]);
        break;
      case 2:
        model = HostingServices;
        results = await HostingServices.aggregate([
          {
            $match: {
              registeredAt: { $gte: start, $lt: end },
              hosting_plan_id: { $ne: null }
            }
          },
          {
            $lookup: {
              from: "hostingplans",
              localField: "hosting_plan_id",
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
              profit: { $subtract: ["$price", "$import_price"] },
              _id: 0
            }
          },
          { $sort: { month: 1 } }
        ]);
        break;
      case 3:
        model = SslServices;
        results = await SslServices.aggregate([
          {
            $match: {
              registeredAt: { $gte: start, $lt: end },
              ssl_plan_id: { $ne: null }
            }
          },
          {
            $lookup: {
              from: "sslplans",
              localField: "ssl_plan_id",
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
              profit: { $subtract: ["$price", "$import_price"] },
              _id: 0
            }
          },
          { $sort: { month: 1 } }
        ]);
        break;
      case 4:
        model = EmailServices;
        results = await EmailServices.aggregate([
          {
            $match: {
              registeredAt: { $gte: start, $lt: end },
              email_plan_id: { $ne: null }
            }
          },
          {
            $lookup: {
              from: "emailplans",
              localField: "email_plan_id",
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
              profit: { $subtract: ["$price", "$import_price"] },
              _id: 0
            }
          },
          { $sort: { month: 1 } }
        ]);
        break;
      case 5:
        model = WebsiteServices;
        break;
      case 6:
        model = ContentServices;
        results = await ContentServices.aggregate([
          {
            $match: {
              registeredAt: { $gte: start, $lt: end },
              content_plan_id: { $ne: null }
            }
          },
          {
            $lookup: {
              from: "contentplans",
              localField: "content_plan_id",
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
              profit: { $subtract: ["$price", "$import_price"] },
              _id: 0
            }
          },
          { $sort: { month: 1 } }
        ]);
        break;
      case 7:
        model = ToplistServices;
        break;
      case 8:
        model = MaintenanceServices;
        results = await MaintenanceServices.aggregate([
          {
            $match: {
              registeredAt: { $gte: start, $lt: end },
              maintenance_plan_id: { $ne: null }
            }
          },
          {
            $lookup: {
              from: "maintenanceplans",
              localField: "maintenance_plan_id",
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
              profit: { $subtract: ["$price", "$import_price"] },
              _id: 0
            }
          },
          { $sort: { month: 1 } }
        ]);
        break;
      case 9:
        model = MobileNetworkServices;
        results = await MobileNetworkServices.aggregate([
          {
            $match: {
              registeredAt: { $gte: start, $lt: end },
              mobile_network_plan_id: { $ne: null }
            }
          },
          {
            $lookup: {
              from: "mobilenetworkplans",
              localField: "mobile_network_plan_id",
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
              profit: { $subtract: ["$price", "$import_price"] },
              _id: 0
            }
          },
          { $sort: { month: 1 } }
        ]);
        break;
      default:
        return res.status(400).json({ message: "Dịch vụ chưa được hỗ trợ!" });
    }

    const formatted = results.map((item) => ({
      month: `Tháng ${item.month}`,
      import_price: item.import_price,
      price: item.price,
      profit: item.profit
    }));

    const total = formatted.reduce(
      (acc, item) => {
        acc.import_price += item.import_price;
        acc.price += item.price;
        acc.profit += item.profit;
        return acc;
      },
      { import_price: 0, price: 0, profit: 0 }
    );

    return res.json({
      data: formatted,
      total
    });
  }
}

module.exports = statisticsController;