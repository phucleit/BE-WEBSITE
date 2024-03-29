const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
var morgan = require("morgan");
const dotenv = require("dotenv");

// gói dịch vụ
const domainPlansRoutes = require("./routes/plans/domain/domain");
const emailPlansRoutes = require("./routes/plans/email/email");
const hostingPlansRoutes = require("./routes/plans/hosting/hosting");
const sslPlansRoutes = require("./routes/plans/ssl/ssl");
const contentPlansRoutes = require("./routes/plans/content/content");
const maintenancePlansRoutes = require("./routes/plans/maintenance/maintenance");
const mobileNetworkPlansRoutes = require("./routes/plans/mobile-network/mobileNetwork");

// khách hàng
const customerRoutes = require("./routes/customers/customer");

// nhà cung cấp
const supplierRoutes = require("./routes/suppliers/supplier");
const mobileNetworkRoutes = require("./routes/suppliers/mobile-network");

// dịch vụ
const domainServicesRoutes = require("./routes/services/domain/domain");
const hostingServicesRoutes = require("./routes/services/hosting/hosting");
const emailServicesRoutes = require("./routes/services/email/email");
const sslServicesRoutes = require("./routes/services/ssl/ssl");
const contentServicesRoutes = require("./routes/services/content/content");
const websiteServicesRoutes = require("./routes/services/website/website");
const toplistServicesRoutes = require("./routes/services/toplist/toplist");
const maintenanceServicesRoutes = require("./routes/services/maintenance/maintenance");
const mobileNetworkServicesRoutes = require("./routes/services/mobile-network/mobileNetwork");

// hợp đồng
const contractRoutes = require("./routes/contracts/contracts");

// user
const userRoutes = require("./routes/users/user");
const groupUserRoutes = require("./routes/group-user/group-user");

dotenv.config();
// connect database
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

app.use(bodyParser.json({limit: "500mb"}));
app.use(bodyParser.urlencoded({extended:true, limit:'500mb'})); 

const corsOptions = {
	origin: 'http://localhost:3006',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true,
	optionsSuccessStatus: 204,
};	

app.use(cors(corsOptions));

app.use(morgan("common"));
app.use('/uploads', express.static('uploads'));

// các gói dịch vụ
app.use("/v1/plans/domain", domainPlansRoutes);
app.use("/v1/plans/email", emailPlansRoutes);
app.use("/v1/plans/hosting", hostingPlansRoutes);
app.use("/v1/plans/ssl", sslPlansRoutes);
app.use("/v1/plans/content", contentPlansRoutes);
app.use("/v1/plans/content", contentPlansRoutes);
app.use("/v1/plans/maintenance", maintenancePlansRoutes);
app.use("/v1/plans/mobile-network", mobileNetworkPlansRoutes);

// khách hàng
app.use("/v1/customer", customerRoutes);

// nhà cung cấp
app.use("/v1/supplier", supplierRoutes);
app.use("/v1/mobile-network", mobileNetworkRoutes);

// dịch vụ
app.use("/v1/services/domain", domainServicesRoutes);
app.use("/v1/services/hosting", hostingServicesRoutes);
app.use("/v1/services/email", emailServicesRoutes);
app.use("/v1/services/ssl", sslServicesRoutes);
app.use("/v1/services/content", contentServicesRoutes);
app.use("/v1/services/website", websiteServicesRoutes);
app.use("/v1/services/toplist", toplistServicesRoutes);
app.use("/v1/services/maintenance", maintenanceServicesRoutes);
app.use("/v1/services/mobile-network", mobileNetworkServicesRoutes);

// hợp đồng
app.use("/v1/contracts", contractRoutes);

// users
app.use("/v1/users", userRoutes);
app.use("/v1/group-user", groupUserRoutes);

const PORT = process.env.PORT || 3123;
app.listen(PORT, () => {
    console.log("Server is running...");
});