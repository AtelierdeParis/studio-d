module.exports = async (ctx, next) => {
  const { id } = ctx.state.user

  const user = await strapi.plugins['users-permissions'].services.user.fetch({
    id,
  })

  const admin = await strapi
    .query('user', 'admin')
    .findOne({ email: user?.email })

  if (admin) {
    await next()
  } else {
    ctx.unauthorized(`You're not an admin`)
  }
}
