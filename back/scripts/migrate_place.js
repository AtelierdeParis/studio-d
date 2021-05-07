const strapiLib = import("strapi");
const csv = require("csv-parser");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const request = require("request");
const createSlug = require("url-slug");

const TO_DEFINE = "todefine";
const PATH_MIGRATION_CSV =
  "/Users/gesno/Downloads/studio-d_listings_2021-04-22-11-18.csv";

const mapping_country = {
  FR: "France",
  CH: "Suisse",
  BE: "Belgique",
};

const check = (obj, prop, errors) => {
  const isOk = Boolean(obj[prop]) && obj[prop] !== "";
  if (!isOk) {
    errors.push(prop);
  }
  return isOk;
};

const uploadFile = (url, options) => {
  if (url === "/img/default.jpg") return null;
  const formData = new FormData({ maxDataSize: 9999999999 });
  formData.append("ref", options.ref);
  formData.append("refId", options.refId);
  formData.append("field", options.field);
  formData.append(`files`, request(url));
  const formHeaders = formData.getHeaders();
  return axios
    .post(`${process.env.BASE_URL}/upload`, formData, {
      headers: {
        ...formHeaders,
      },
      maxContentLength: 100000000,
      maxBodyLength: 1000000000,
    })
    .then(() => {
      console.log(`[UPLOADED] ${options.refId}`);
    })
    .catch((err) => {
      console.log(`[ERROR UPLOAD] ${options.refId}`, err.response.data);
    });
};

const start = async () => {
  const instance = await strapiLib;
  await instance
    .default()
    .load()
    .then(async (strapi) => {
      const rows = [];
      fs.createReadStream(PATH_MIGRATION_CSV)
        .pipe(csv({ separator: ";" }))
        .on("data", (data) => rows.push(data))
        .on("end", async () => {
          for (let index = 0; index < rows.length; index++) {
            const row = rows[index];

            const errors = [];
            const place = {
              external_id: Object.entries(row)[0][1],
            };

            const checkProp = (prop, mappingProp = null) => {
              const isCheked = check(row, prop, errors);
              if (!isCheked && mappingProp) place[mappingProp] = TO_DEFINE;
              return isCheked;
            };

            if (checkProp("city", "city")) {
              place.city = row.city.toLowerCase();
            }

            if (checkProp("country") && mapping_country[row.country]) {
              place.country = mapping_country[row.country];
            }

            if (checkProp("lng", "longitude")) {
              place.longitude = row.lat;
            }

            if (checkProp("lat", "latitude")) {
              place.latitude = row.lng;
            }

            if (checkProp("location", "address")) {
              place.address = row.location;
            }

            if (checkProp("title", "name")) {
              place.name = row.title;
              place.slug = createSlug(row.title);
            }

            if (checkProp("_Largeur de la salle (en mètre)", "width")) {
              place.width = row["_Largeur de la salle (en mètre)"];
            }

            if (checkProp("_Longueur de la salle (en mètre)", "roomLength")) {
              place.roomLength = row["_Longueur de la salle (en mètre)"];
            }

            place.details = row.description;
            place.published = false;
            place.floor = TO_DEFINE;
            place.surface = 0;
            place.height = 0;
            place.mirror = row._Miroir === "Oui";
            place.danceBar = row["_Barre de danse"] === "Oui";
            place.accomodation =
              row[
                "_Hébergement possible (Si oui, les compagnies peuvent prendre contact avec les lieux pour plus de précisions)"
              ] === "Oui";
            place.technicalStaff =
              row[
                `_Personnel technique disponible sur place (Si oui, les compagnies doivent spécifier leurs besoins dans l'encart "message" au moment de la réservation)`
              ] === "Oui";

            const owner = await strapi
              .query("user", "users-permissions")
              .findOne({ email: row.supplier_email });

            if (!owner) {
              throw new Error("Owner not found");
            }

            place.users_permissions_user = 8;

            const isAlreadyCreated = await strapi
              .query("espace")
              .findOne({ external_id: place.external_id });

            if (!isAlreadyCreated) {
              await strapi
                .query("espace")
                .create(place)
                .then((res) => {
                  console.log(`[CREATED] ${place.name}`);
                  uploadFile(row.cover, {
                    ref: "espace",
                    refId: res.id,
                    field: "images",
                  });
                })
                .catch((err) =>
                  console.log("[ERROR] creation failed:", err, place)
                );
            } else {
              await strapi
                .query("espace")
                .update({ external_id: place.external_id }, place)
                .then(async (res) => {
                  console.log(`[UPDATED] ${place.name}`);
                  await uploadFile(row.cover, {
                    ref: "espace",
                    refId: res.id,
                    field: "images",
                  });
                })
                .catch((err) =>
                  console.log("[ERROR] update failed:", err, place)
                );
            }
          }
        });
    });
};

start();
