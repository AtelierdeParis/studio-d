module.exports = async (ctx, next) => {
  const { id } = ctx.params;
  if (id && ctx.state.user) {
    const { user } = ctx.state;
    const dispo = await strapi.query("disponibility").findOne({ id });
    if (dispo && dispo.espace.users_permissions_user === user.id) {
      return await next();
    }
  }

  ctx.unauthorized(`Not allowed`);
};
