module.exports = async (ctx, next) => {
  const { id } = ctx.params;

  if (id && ctx.state.user) {
    const { user } = ctx.state;

    const application = await strapi
    .query("application")
    .findOne(
      { id }
    )

    // Only application place can update application status
    if(application && application?.espace?.users_permissions_user === user.id){
      return await next();
    }
  }

  ctx.unauthorized(`Not allowed`);
};
