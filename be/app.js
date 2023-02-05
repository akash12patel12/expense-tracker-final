require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const userRoutes = require('./routes/userRoute')
const expenseRoutes = require('./routes/expenseRoute')
const premiumRoutes = require('./routes/premiumRoute');
const resetpasswordRoutes = require('./routes/resetpassword');
const FileLink = require('./models/fileLinks')
const Expense  = require('./models/expense')
const User = require("./models/user");
const Order = require('./models/order');
const ForgotPassword = require('./models/forgotpassword');
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(userRoutes);
app.use(expenseRoutes);
app.use(premiumRoutes);
app.use(resetpasswordRoutes);



User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(ForgotPassword);
ForgotPassword.belongsTo(User);
User.hasMany(FileLink);
FileLink.belongsTo(User);


// sequelize.sync({force : true});
sequelize.sync();

app.listen(3000);