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
  const { name, type } = req.body;
  if (!name && !type && req.method == 'PATCH') {
    return res.status(400).json({ code: 400, message: "payload shouldn't empty" });
  }
  if (req.method === 'POST' && (!name || !type)) {
    return res.status(400).json({ code: 400, message: 'name and type are required' });
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
  next();
};
