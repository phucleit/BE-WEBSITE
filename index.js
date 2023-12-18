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

app.use(bodyParser.json({limit: "50mb"}));
app.use(cors());
app.use(morgan("common"));

// các gói dịch vụ
app.use("/v1/plans/domain", domainPlansRoutes);
app.use("/v1/plans/email", emailPlansRoutes);
app.use("/v1/plans/hosting", hostingPlansRoutes);
app.use("/v1/plans/ssl", sslPlansRoutes);
app.use("/v1/plans/content", contentPlansRoutes);

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

app.listen(8000, () => {
    console.log("Server is running...");
})