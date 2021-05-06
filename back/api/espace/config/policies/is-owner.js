module.exports = async (ctx, next) => {
  const { id } = ctx.params;
  if (id && ctx.state.user) {
    const { user } = ctx.state;
    const espace = await strapi.query("espace").findOne({ id });
    if (espace && espace.users_permissions_user.id === user.id) {
      return await next();
    }
  }

  ctx.unauthorized(`Not allowed`);
};
