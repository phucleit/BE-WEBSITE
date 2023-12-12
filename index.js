const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
var morgan = require("morgan");
const dotenv = require("dotenv");

const domainPlansRoutes = require("./routes/plans/domain/domain");
const emailPlansRoutes = require("./routes/plans/email/email");
const hostingPlansRoutes = require("./routes/plans/hosting/hosting");
const sslPlansRoutes = require("./routes/plans/ssl/ssl");
const customerRoutes = require("./routes/customers/customer");
const supplierRoutes = require("./routes/suppliers/supplier");

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

// khách hàng
app.use("/v1/customer", customerRoutes);

// nhà cung cấp
app.use("/v1/supplier", supplierRoutes);

app.listen(8000, () => {
    console.log("Server is running...");
})