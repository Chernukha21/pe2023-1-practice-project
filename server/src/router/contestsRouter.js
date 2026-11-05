const { Router } = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const upload = require('../utils/fileUpload');
const validators = require('../middlewares/validators');
const prepareContestFilters = require('../middlewares/prepareContestFilters');
const userController = require('../controllers/userController');
const contestController = require('../controllers/contestController');

const contestsRouter = Router();

contestsRouter.post(
  '/',
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validators.validateContestCreation,
  userController.payment
);

contestsRouter.get(
  '/',
  basicMiddlewares.onlyForCreative,
  prepareContestFilters,
  contestController.getContests
);

contestsRouter.get('/byCustomer', contestController.getCustomersContests);

contestsRouter.patch(
  '/:contestId',
  validators.validateContestId,
  upload.updateContestFile,
  contestController.updateContest
);

contestsRouter.get(
  '/:contestId',
  basicMiddlewares.canGetContest,
  contestController.getContestById
);

module.exports = contestsRouter;
