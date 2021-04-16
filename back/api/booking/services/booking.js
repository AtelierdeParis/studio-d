"use strict";
const max = require("date-fns/max");
const isPast = require("date-fns/isPast");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  checkIsPast(booking) {
    if (
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
