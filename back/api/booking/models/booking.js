"use strict";

const differenceInDays = require("date-fns/differenceInDays");
const format = require("date-fns/format");
const fr = require("date-fns/locale/fr");
const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};
const locale = {
  locale: fr,
};

const updateDispo = (dispos = [], status) => {
  if (!dispos || dispos.length === 0) return null;
  const data = { status };
  if (status === "available") {
    data.booking = null;
  }
  dispos.map((dispo) => {
    strapi.query("disponibility").update({ id: dispo.id }, data);
    if (status === "available") {
      strapi
        .query("disponibility")
        .create({ ...dispo, place: null, status: "canceled" });
    }
  });
};

const getDispoEmail = (dispos = []) => {
  return dispos
    .map((dispo) => {
      const start = format(new Date(dispo.start), "d MMMM", locale);
      const end = format(new Date(dispo.end), "d MMMM", locale);
      switch (dispo.type) {
        case "day":
          return `&nbsp;&nbsp;- ${start} (journée entière)`;
        case "punctual":
          return `&nbsp;&nbsp;- ${start} (${
            dispo.when === "morning" ? "matin" : "après-midi"
          })`;
        case "period":
          return `&nbsp;&nbsp;- ${start} - ${end} (${
            differenceInDays(new Date(dispo.end), new Date(dispo.start)) + 1
          } jours)`;
      }
    })
    .join("<br/>");
};

const getPlaceInfoEmail = (place) => {
  const infos = [];
  if (place.tel)
    infos.push(`Tél. : <a href="tel:${place.tel}">${place.tel}</a>`);
  if (place.email)
    infos.push(`Email : <a href="mailto:${place.email}">${place.email}</a>`);
  if (place.website)
    infos.push(`<a href="${place.website}">${place.website}</a>`);

  return infos.join("<br/>");
};

const checkStatus = (booking, status) => {
  const statusToCheck = Array.isArray(status) ? status : [status];
  console.log(
    booking.status,
    statusToCheck,
    statusToCheck.includes(booking.status)
  );
  if (!booking || !statusToCheck.includes(booking.status))
    throw new Error("An error occured, booking has a wrong status");
};

module.exports = {
  lifecycles: {
    async afterFind(results) {
      if (results.length > 0) {
        await Promise.all(
          results.map(async (booking) => {
            const { status } = await strapi.services.booking.checkIsPast(
              booking
            );
            booking.status = status;
          })
        );
      }
    },
    async afterCreate(created) {
      await strapi.services.message.create({
        author: "company",
        status: "created",
        booking: created.id,
        place: created.place.id,
        company: created.company.id,
      });

      // Send email to the company
      strapi.plugins["email"].services.email.sendEmail(
        {
          to: created.company.email,
        },
        {
          templateId: "ask-resa-company",
          subject: `Votre demande réf. ${created.id} a bien été transmise à ${created.place.structureName}`,
        },
        {
          espace_name: created.espace.name,
          place_id: created.place.id,
          place_name: created.place.structureName,
          ref: created.id,
          user_type: "company",
          user_name: created.company.firstname,
        }
      );

      // Send email to the place
      strapi.plugins["email"].services.email.sendEmail(
        {
          to: created.place.email,
        },
        {
          templateId: "ask-resa-place",
          subject: `Nouvelle demande réf. ${created.id} pour l'espace ${created.espace.name}`,
        },
        {
          from: capitalize(created.company.firstname),
          user_name: created.place.firstname,
          company: created.company.structureName,
          ref: created.id,
          espace_name: created.espace.name,
          user_type: "place",
          dispos: getDispoEmail(created.disponibilities),
        }
      );
    },
    beforeUpdate: async (params, data) => {
      if (data.status) {
        const booking = await strapi
          .query("booking")
          .findOne({ id: params.id });

        switch (data.status) {
          case "accepted":
          case "requestcanceled":
          case "requestcanceledbyplace":
            checkStatus(booking, "pending");
            break;
          case "bookingcanceledbyplace":
          case "askcancel":
            checkStatus(booking, ["accepted", "askcancel"]);
            break;
        }
      }
    },
    async afterUpdate(updated, params, body) {
      const rel = {
        booking: updated.id,
        place: updated.place.id,
        company: updated.company.id,
      };

      if (body.status) {
        switch (body.status) {
          case "requestcanceled":
            strapi.services.message.create({
              author: "company",
              status: "requestcanceled",
              ...rel,
            });
            updateDispo(updated.disponibilities, "available");

            // Send email to the place
            strapi.plugins["email"].services.email.sendEmail(
              {
                to: updated.place.email,
              },
              {
                templateId: "canceled-place",
                subject: `La compagnie ${updated.company.structureName} a annulé sa demande réf. ${updated.id}`,
              },
              {
                from: capitalize(updated.company.firstname),
                company: updated.company.structureName,
                user_name: updated.company.firstname,
                ref: updated.id,
                espace_name: updated.espace.name,
                user_type: "place",
                dispos: getDispoEmail(updated.disponibilities),
              }
            );
            break;
          case "requestcanceledbyplace":
            strapi.services.message.create({
              author: "place",
              status: "requestcanceledbyplace",
              ...rel,
            });
            updateDispo(updated.disponibilities, "available");

            // Send email to the company
            strapi.plugins["email"].services.email.sendEmail(
              {
                to: updated.company.email,
              },
              {
                templateId: "canceled-company",
                subject: `Votre demande a été annulé par ${updated.place.structureName}`,
              },
              {
                dispos: getDispoEmail(updated.disponibilities),
                user_name: updated.company.firstname,
                ref: updated.id,
                espace_name: updated.espace.name,
                user_type: "company",
                place_name: updated.place.structureName,
              }
            );
            break;
          case "bookingcanceledbyplace":
            strapi.services.message.create({
              author: "place",
              status: "bookingcanceledbyplace",
              ...rel,
            });
            updateDispo(updated.disponibilities, "available");

            // Send email to the company
            strapi.plugins["email"].services.email.sendEmail(
              {
                to: updated.company.email,
              },
              {
                templateId: "ask-cancel-confirmed-company",
                subject: `Votre demande réf. ${updated.id} vient d'être annulée par ${updated.place.structureName}`,
              },
              {
                user_name: updated.company.firstname,
                ref: updated.id,
                company: capitalize(updated.company.structureName),
                espace_name: updated.espace.name,
                user_type: "company",
              }
            );
            break;
          case "askcancel":
            strapi.services.message.create({
              author: "company",
              status: "askcancel",
              ...rel,
            });

            // Send email to the company
            strapi.plugins["email"].services.email.sendEmail(
              {
                to: updated.company.email,
              },
              {
                templateId: "ask-cancel-company",
                subject: `Votre demande d'annulation à ${updated.place.structureName}`,
              },
              {
                espace_name: updated.espace.name,
                ref: updated.id,
                place_name: updated.place.structureName,
                place_id: updated.place.id,
                user_type: "company",
                user_name: updated.company.firstname,
              }
            );

            // Send email to the place
            strapi.plugins["email"].services.email.sendEmail(
              {
                to: updated.place.email,
              },
              {
                templateId: "ask-cancel-place",
                subject: `La compagnie ${updated.company.structureName} souhaiterait annuler sa demande réf. ${updated.id}`,
              },
              {
                from: capitalize(updated.company.firstname),
                user_name: updated.company.firstname,
                company: updated.company.structureName,
                ref: updated.id,
                espace_name: updated.espace.name,
                user_type: "place",
              }
            );
            break;
          case "accepted":
            strapi.services.message.create({
              author: "place",
              status: "accepted",
              ...rel,
            });
            updateDispo(updated.disponibilities, "booked");

            // Send confirmation email to the company
            strapi.plugins["email"].services.email.sendEmail(
              {
                to: updated.company.email,
              },
              {
                templateId: "booking-confirmed-company",
                subject: `Votre demande réf. ${updated.id} pour ${updated.espace.name} (${updated.place.structureName}) vient d'être confirmée`,
              },
              {
                dispos: getDispoEmail(updated.disponibilities),
                espace_name: updated.espace.name,
                place_name: updated.place.structureName,
                place_id: updated.place.id,
                slug: updated.espace.slug,
                ref: updated.id,
                user_type: "company",
                user_name: updated.company.firstname,
                address: `<a href="https://www.openstreetmap.org/search?query=${updated.espace.address}">${updated.espace.address}</a>`,
                info: getPlaceInfoEmail(updated.place),
              }
            );
            break;
        }
      }
    },
  },
};
