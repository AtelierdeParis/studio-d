"use strict";
const max = require("date-fns/max");
const min = require("date-fns/min");
const isPast = require("date-fns/isPast");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async checkIsPast(booking) {
    if (!booking.disponibilities) return booking;
    if (
      booking.status === "pending" &&
      isPast(min(booking.disponibilities.map((dispo) => new Date(dispo.start))))
    ) {
      await Promise.all(
        booking.disponibilities.map((dispo) =>
          strapi.services.disponibility.checkStatus(dispo)
        )
      );
      return strapi
        .query("booking")
        .update({ id: booking.id }, { status: "expired" });
    } else if (
      booking.status === "accepted" &&
      isPast(max(booking.disponibilities.map((dispo) => new Date(dispo.end))))
    ) {
      return strapi
        .query("booking")
        .update({ id: booking.id }, { status: "past" });
    }
    return booking;
  },
};
