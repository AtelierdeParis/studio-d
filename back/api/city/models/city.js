"use strict";
const geocodingService = require("@mapbox/mapbox-sdk/services/geocoding");
const mbxClient = require("@mapbox/mapbox-sdk");

const baseClient = mbxClient({
  accessToken: process.env.MAPBOX_TOKEN,
});
const geocoder = geocodingService(baseClient);

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      if (data.name) {
        if (data.name === "todefine") {
          data.name = data.name;
          data.latitude = 0;
          data.longitude = 0;
        } else {
          let query = data.name;
          if (data.country) query = query + " " + data.country;
          await geocoder
            .forwardGeocode({
              query,
            })
            .send()
            .then((res) => {
              if (!res.body.features || res.body.features.length === 0)
                return null;
              const city = res.body.features.find((match) =>
                match.place_type.includes("place")
              );
              if (!city) {
                console.log(res.body.features);
                throw new Error("City not found with mapbox");
              }

              data.name = city.text.toLowerCase();
              data.latitude = city.geometry.coordinates[0];
              data.longitude = city.geometry.coordinates[1];
            });
        }
      }
    },
  },
};
