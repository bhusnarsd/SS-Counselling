
const mongoose = require('mongoose');
const readline = require('readline');
const { User } = require('./models');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function promptUser() {
  rl.question('Enter username: ', (username) => {
    rl.question('Enter password: ', async (password) => {
      try {
        // Create the user in the database
        await User.create({
          username,
          password,
          role: 'superadmin',
          name: 'Super Admin',
        });

        logger.info('Superadmin user created successfully!');
        rl.close();
      } catch (error) {
        logger.error('Error creating superadmin user:', error);
        rl.close();
      }
    });
  });
}

async function checkUserExistence() {
  try {
    const users = await User.find();
    if (users.length === 0) {
      logger.info('No users found. Creating superadmin user...');
      promptUser();
    } else {
      logger.info('Users already exist in the database. Exiting...');
      rl.close();
    }
  } catch (error) {
    logger.error('Error checking user existence:', error);
    rl.close();
  }
}

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  checkUserExistence();
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
