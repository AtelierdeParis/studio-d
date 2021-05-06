"use strict";

function truncateString(str, num) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

module.exports = {
  // Send email notification if message is unread
  "*/5 * * * *": async () => {
    const knex = strapi.connections.default;
    const messages = await knex.raw(
      "SELECT place, company FROM messages WHERE hasbeenread = false AND notified = false AND status = 'message' AND  created_at < (NOW() + INTERVAL '5 minute') GROUP BY place, company"
    );

    if (messages.rows.length > 0) {
      messages.rows.map(async (row) => {
        const { place, company } = row;
        const lastMessage = await strapi.query("message").findOne({
          place,
          company,
          status: "message",
          _sort: "created_at:desc",
        });

        if (!lastMessage || lastMessage.notified || lastMessage.hasbeenread)
          return;

        const isPlace = lastMessage.author === "place";
        await knex("messages")
          .where({ place, company })
          .update({ notified: true });

        // Send email to the last user who didn't see the last messages
        strapi.plugins["email"].services.email.sendEmail(
          {
            to: isPlace ? lastMessage.company.email : lastMessage.place.email,
          },
          {
            templateId: "new-message",
          },
          {
            user_type: lastMessage.author,
            user_name: isPlace
              ? lastMessage.place.firstname
              : lastMessage.company.firstname,
            from: isPlace
              ? lastMessage.company.firstname
              : lastMessage.place.firstname,
            structure: isPlace
              ? lastMessage.place.structureName
              : lastMessage.company.structureName,
            user_id: isPlace ? lastMessage.company.id : lastMessage.place.id,
            message: truncateString(lastMessage.message, 200),
          }
        );
      });
    }
  },
};
