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

// khách hàng
const customerRoutes = require("./routes/customers/customer");

// nhà cung cấp
const supplierRoutes = require("./routes/suppliers/supplier");

// dịch vụ
const domainServicesRoutes = require("./routes/services/domain/domain");
const hostingServicesRoutes = require("./routes/services/hosting/hosting");
const emailServicesRoutes = require("./routes/services/email/email");
const sslServicesRoutes = require("./routes/services/ssl/ssl");
const contentServicesRoutes = require("./routes/services/content/content");
const websiteServicesRoutes = require("./routes/services/website/website");
const toplistServicesRoutes = require("./routes/services/toplist/toplist");

// hợp đồng
const contractRoutes = require("./routes/contracts/contracts");

// user
const userRoutes = require("./routes/users/user");

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

// khách hàng
app.use("/v1/customer", customerRoutes);

// nhà cung cấp
app.use("/v1/supplier", supplierRoutes);

// dịch vụ
app.use("/v1/services/domain", domainServicesRoutes);
app.use("/v1/services/hosting", hostingServicesRoutes);
app.use("/v1/services/email", emailServicesRoutes);
app.use("/v1/services/ssl", sslServicesRoutes);
app.use("/v1/services/content", contentServicesRoutes);
app.use("/v1/services/website", websiteServicesRoutes);
app.use("/v1/services/toplist", toplistServicesRoutes);

// hợp đồng
app.use("/v1/contracts", contractRoutes);

// users
app.use("/v1/users", userRoutes);

const PORT = process.env.PORT || 3123;
app.listen(PORT, () => {
    console.log("Server is running...");
});