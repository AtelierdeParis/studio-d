module.exports = async (ctx, next) => {
  const { id } = ctx.params;
  if (id && ctx.state.user) {
    const { user } = ctx.state;
    const booking = await strapi.query("booking").findOne({ id });

    if (
      booking &&
      (booking.place.id === user.id || booking.company.id === user.id)
    ) {
      return await next();
    }
  }

  ctx.unauthorized(`Not allowed`);
};
