const strapiLib = import("strapi");
const csv = require("csv-parser");
const fs = require("fs");
const crypto = require("crypto");

const mapping_country = {
  FR: "France",
  CH: "Suisse",
  BE: "Belgique",
};
const PATH_MIGRATION_CSV =
  "/Users/gesno/Downloads/studio-d_users_2021-05-30-12-48.csv";
const TYPE_PLACE = "16149";
const TYPE_COMPANY = "16150";

const mapping_type = {
  [TYPE_COMPANY]: "company",
  [TYPE_PLACE]: "place",
};

const check = (obj, prop, errors) => {
  const isOk = Boolean(obj[prop]) && obj[prop] !== "";
  if (!isOk) {
    errors.push(prop);
  }
  return isOk;
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
        .on("end", () => {
          rows.map(async (row) => {
            const errors = [];
            const resetPasswordToken = crypto.randomBytes(64).toString("hex");
            const user = {
              confirmed: true,
              accepted: true,
              provider: "local",
              blocked: false,
              role: 1,
              external_id: Object.entries(row)[0][1],
              resetPasswordToken,
            };

            const checkProp = (prop, mappingProp = null) => {
              const isCheked = check(row, prop, errors);
              if (!isCheked && mappingProp) user[mappingProp] = "todefine";
              return isCheked;
            };

            if (checkProp("address_city")) {
              user.city = row.address_city;
            }

            if (
              checkProp("address_country") &&
              mapping_country[row.address_country]
            ) {
              user.country = mapping_country[row.address_country];
            }

            if (checkProp("address_line1")) {
              user.address =
                row.address_line1 +
                (row.address_line2 && row.address_line2 !== ""
                  ? ` ${row.address_line2}`
                  : "");
            }

            if (checkProp("address_zipcode")) {
              user.zipCode = row.address_zipcode;
            }

            if (checkProp("business_name") || checkProp("public_name")) {
              user.structureName = row.business_name || row.public_name;
            }

            if (checkProp("email")) {
              user.email = row.email;
              user.username = row.email;
            }

            if (checkProp("first_name")) {
              user.firstname = row.first_name;
            }

            if (checkProp("last_name")) {
              user.lastname = row.last_name;
            }

            if (checkProp("group_id") && mapping_type[row.group_id]) {
              user.type = mapping_type[row.group_id];

              if (row.group_id === TYPE_PLACE) {
                if (
                  checkProp(
                    "_Représant·e légal·e de la structure",
                    "legalRepresentative"
                  )
                ) {
                  user.legalRepresentative =
                    row["_Représant·e légal·e de la structure"];
                }

                if (
                  checkProp(
                    "_Fonction du·de la représentant·e légal·e",
                    "statusRepresentative"
                  )
                ) {
                  user.statusRepresentative =
                    row["_Fonction du·de la représentant·e légal·e"];
                }
              } else if (row.group_id === TYPE_COMPANY) {
                user.choreographer = "todefine";
                user.insuranceName = "todefine";
                user.insuranceNumber = "todefine";
              }
            }

            if (checkProp("_Siret", "siret")) {
              user.siret = row._Siret;
            }

            if (checkProp("_Code A.P.E", "ape")) {
              user.ape = row["_Code A.P.E"]
                .toLowerCase()
                .replace(/ /g, "")
                .replace(".", "")
                .replace("-", "")
                .replace(/ape/, "")
                .replace("artsduspectaclevivant", "")
                .replace(/artsduspectacle/, "")
                .toUpperCase();
            }

            if (
              checkProp("_Numéro de licence entrepreneur spectacle", "license")
            ) {
              user.license = row["_Numéro de licence entrepreneur spectacle"]
                .toLowerCase()
                .replace(/licences?/g, ",")
                .replace(/cat[ée]gorie/g, ",")
                .replace(/cat/g, ",")
                .replace(/et/g, ",")
                .replace(/\r/g, ",")
                .replace(/\n/g, ",")
                .replace(/;/g, "")
                .replace(/\//g, ",")
                .replace(/|/g, "")
                .replace(/ [0-9]{1,2}-/g, ",")
                .replace(/  /g, ",")
                .replace(/ /g, "")
                .replace(/n°/g, "")
                .replace(/,[0-9]{1}-/g, ",")
                .replace(/:/g, "")
                .replace(/^[0-9]{1,2}(-|,)/, "")
                .replace(/-/g, "")
                .replace(/&[0-9]/g, ",")
                .replace(/,{2,9}/g, ",")
                .replace(/,[0-9],/g, ",")
                .replace(/^,/, "")
                .replace(/,$/, "")
                .toUpperCase();
            }

            if (checkProp("phone_number", "phone")) {
              user.phone = row.phone_number;
            }

            if (row["_Site internet"]) {
              const match = row["_Site internet"].match(
                /(https?:\/\/)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
              );
              if (!match) {
                user.website = "";
              } else {
                user.website = row["_Site internet"];
              }
            } else {
              user.website = "";
            }

            const socialReason =
              row[
                "_Raison sociale (si différente du nom d'usage de la structure)"
              ];
            user.socialReason =
              socialReason && socialReason.length < 255 ? socialReason : "";

            const isAlreadyCreated = await strapi
              .query("user", "users-permissions")
              .findOne({ external_id: user.external_id });

            if (!isAlreadyCreated) {
              await strapi
                .query("user", "users-permissions")
                .create(user)
                .then((res) => {
                  console.log(`[CREATED] ${user.email}`);
                })
                .catch((err) => console.log(err, user));
            } else {
              await strapi
                .query("user", "users-permissions")
                .update({ external_id: user.external_id }, user)
                .then((res) => {
                  console.log(`[UPDATED] ${user.email}`);
                })
                .catch((err) => console.log(err, user));
            }
          });
        });
    });
};

start();
