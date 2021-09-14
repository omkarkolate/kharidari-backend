const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const initDatabaseConnection = require('./database/database.connect.js');

const app = express();

const corsOptions = {
  origin: 'https://kharidari.netlify.app/',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions))
app.use(bodyParser.json());

initDatabaseConnection();

//Middlewares
const { routeNotFound, errorHandler, findUserByEmailId  } = require("./middleware/index.js");

//Routes
const { login, signup, user, product, wishlist, cart, address, order } = require("./routes/index.js");


app.get('/', (req, res) => {
    res.status(200).send('Namaste _/\\_  Welcome to kharidari app server!')
});

app.post("/login", findUserByEmailId, login);
app.post("/signup", findUserByEmailId, signup);
app.use("/users", user);
app.use("/products", product);
app.use("/wishlist", wishlist);
app.use("/cart", cart);
app.use("/addresses", address);
app.use("/orders", order);

/*
 * Note: Keep at end to handle errors and 404s
 */
app.use(routeNotFound);
app.use(errorHandler)

app.listen(3000, () => {
    console.log('server started');
});