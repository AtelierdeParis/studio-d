module.exports = async (ctx, next) => {
  if (ctx.state.user && ctx.state.user.type === "place") {
    return await next();
  }

  ctx.unauthorized(`Allowed to places only`);
};
