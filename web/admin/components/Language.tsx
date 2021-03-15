import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { useTranslate, useLocale, useSetLocale } from "react-admin";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  label: { width: "10em", display: "inline-block" },
  button: { marginRight: "1em" },
});

const Language = () => {
  const locale = useLocale();
  const setLocale = useSetLocale();
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <>
      <Button
        variant="contained"
        className={classes.button}
        color={locale === "en" ? "primary" : "default"}
        onClick={() => setLocale("en")}
      >
        en
      </Button>
      <Button
        variant="contained"
        className={classes.button}
        color={locale === "fr" ? "primary" : "default"}
        onClick={() => setLocale("fr")}
      >
        fr
      </Button>
    </>
  );
};

export default Language;
