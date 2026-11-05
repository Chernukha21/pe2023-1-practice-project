const BadRequestError = require('../errors/BadRequestError');

const prepareContestFilters = (req, res, next) => {
  const {
    limit: requestedLimit = '8',
    offset: requestedOffset = '0',
    typeIndex: requestedTypeIndex = '1',
    contestId: requestedContestId = '',
    industry = '',
    awardSort = 'asc',
    ownEntries = 'false',
  } = req.query;

  const limit = Number(requestedLimit);
  const offset = Number(requestedOffset);
  const typeIndex = Number(requestedTypeIndex);
  const contestId =
    requestedContestId === '' ? undefined : Number(requestedContestId);

  if (
    typeof requestedLimit !== 'string' ||
    typeof requestedOffset !== 'string' ||
    typeof requestedTypeIndex !== 'string' ||
    typeof requestedContestId !== 'string' ||
    !Number.isSafeInteger(limit) ||
    limit < 1 ||
    !Number.isSafeInteger(offset) ||
    offset < 0 ||
    !Number.isSafeInteger(typeIndex) ||
    typeIndex < 0 ||
    typeIndex > 7 ||
    (contestId !== undefined &&
      (!Number.isSafeInteger(contestId) || contestId < 1)) ||
    typeof industry !== 'string' ||
    !['asc', 'desc'].includes(awardSort) ||
    !['true', 'false'].includes(ownEntries)
  ) {
    return next(new BadRequestError('Invalid contest filters'));
  }

  req.contestFilters = {
    limit,
    offset,
    typeIndex,
    contestId,
    industry,
    awardSort,
    hasOwnEntries: ownEntries === 'true',
  };

  return next();
};

module.exports = prepareContestFilters;
