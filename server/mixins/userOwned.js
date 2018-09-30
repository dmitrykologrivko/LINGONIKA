'use strict';

module.exports = function (Model, options) {
  Model.observe('access', (ctx, next) => {
    if (ctx.options.accessToken) {
      const where = ctx.query.where;
      const userId = ctx.options.accessToken.userId;

      if (where) {
        ctx.query.where = {and: [{userId: userId}, where]};
      } else {
        ctx.query.where = {userId: userId};
      }
    }

    next();
  });

  Model.observe('before save', (ctx, next) => {
    const instance = ctx.instance || ctx.currentInstance;

    if (ctx.options.accessToken) {
      instance.userId = ctx.options.accessToken.userId;
    }

    next();
  });
};
