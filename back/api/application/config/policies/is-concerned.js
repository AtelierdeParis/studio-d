module.exports = async (ctx, next) => {
  const { id } = ctx.params;

  if (id && ctx.state.user) {
    const { user } = ctx.state;
    const application = await strapi.query("application").findOne({ id });

    if (
      application &&
      (application.company.id === user.id)
    ) {
      return await next();
    }
  }

  ctx.unauthorized(`Not allowed`);
};
