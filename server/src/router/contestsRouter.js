const { Router } = require('express');
const checkToken = require('../middlewares/checkToken');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const upload = require('../utils/fileUpload');
const validators = require('../middlewares/validators');
const userController = require('../controllers/userController');
const contestController = require('../controllers/contestController');


const contestsRouter = Router();

// POST /contests
contestsRouter.post(
  '/',
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment,
);

contestsRouter.get(
  '/',
  basicMiddlewares.onlyForCreative,
  contestController.getContests
);

// GET /contests/byCustomer
contestsRouter.get('/byCustomer', contestController.getCustomersContests);

// GET /contests/:id

contestsRouter.patch(
  '/:contestId',
  validators.validateContestId,
  upload.updateContestFile,
  contestController.updateContest
);


contestsRouter.get(
  '/:contestId',
  basicMiddlewares.canGetContest,
  contestController.getContestById,
);

module.exports = contestsRouter;
