import { OrderEnum, SortByEnum, FilterByEmum } from './enum/index.js';

export const idIsNumberMiddleware = (req, res, next) => {
  const numberId = parseInt(req.params.id);
  if (isNaN(numberId)) {
    return res.status(400).json({ code: 400, message: 'Id must be a number.' });
  }
  if (!(numberId > 0)) {
    return res.status(400).json({ code: 400, message: 'id must be higher than zero' });
  }
  next();
};

export const bodyExistsMiddleware = (req, res, next) => {
  if (!req.body) {
    return res.status(404).json({ code: 400, message: 'bad request' });
  }
  next();
};

export const inputDtoMiddleware = (req, res, next) => {
  const { name, types } = req.body;
  if (!name && !types && req.method == 'PATCH') {
    return res.status(400).json({ code: 400, message: "payload shouldn't empty" });
  }
  if (req.method === 'POST' && (!name || !types)) {
    return res.status(400).json({ code: 400, message: 'name and types are required' });
  }
  next();
};

export const validateQueryMiddleware = (req, res, next) => {
  const { order, sortBy, filterBy } = req.query;
  if (req.query.order && !Object.values(OrderEnum).includes(order)) {
    return res.status(400).json({ code: 400, message: `order must be: ${Object.values(OrderEnum).join(' | ')}` });
  }
  if (req.query.sortBy && !Object.values(SortByEnum).includes(sortBy)) {
    return res.status(400).json({ code: 400, message: `by must be: ${Object.values(SortByEnum).join(' | ')}` });
  }
  if (req.query.filterBy && !Object.values(FilterByEmum).includes(filterBy)) {
    return res.status(400).json({ code: 400, message: `by must be: ${Object.values(FilterByEmum).join(' | ')}` });
  }

  if (req.query.page) {
    const parsedPage = Number(req.query.page);
    const minPage = 1;
    const maxPage = 999;
    if (parsedPage < minPage) {
      return res.status(400).json({ code: 400, message: `page must be higher than ${minPage}` });
    }
    if (parsedPage > maxPage) {
      return res.status(400).json({ code: 400, message: `page must be lower than ${maxPage}` });
    }
  }

  if (req.query.limit) {
    const parsedLimit = Number(req.query.limit);
    const minLimit = 1;
    const maxLimit = 100;
    if (parsedLimit < minLimit) {
      return res.status(400).json({ code: 400, message: `limit must be higher than ${minLimit}` });
    }
    if (parsedLimit > maxLimit) {
      return res.status(400).json({ code: 400, message: `limit must be lower than ${maxLimit}` });
    }
  }

  next();
};

export const formatPokemonInputMiddleware = (req, res, next) => {
  if (req.body.name) {
    req.body.name = req.body.name.toLowerCase();
  }
  if (Array.isArray(req.body.types)) {
    req.body.types = req.body.types.map((type) => type.toLowerCase());
  }
  next();
};

export const validateDuplicateTypesMiddleware = (req, res, next) => {
  req.body.types = [...new Set(req.body.types)];
  next();
};
