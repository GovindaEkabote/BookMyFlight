const express = require('express');
const cookieParser = require("cookie-parser"); // ✅ import cookie-parser
const { serverConfig, loggerConfig } = require('./config');
const apiRoutes = require('./routes');
const { rateLimiter } = require('./middlewares');

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser()); // ✅ enable cookies
app.use(rateLimiter.limiter);

// Routes
app.use('/api', apiRoutes);

app.listen(serverConfig.PORT, () => {
  console.log(`✅ Successfully started the server on PORT: ${serverConfig.PORT}`);
});
