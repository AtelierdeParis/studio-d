import { Typography } from "@material-ui/core";
import { useTranslate } from "react-admin";
import { makeStyles } from "@material-ui/core/styles";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    marginTop: "-3em",
    alignItems: "center",
    justifyContent: "center",
    color: "grey",
  },
  icon: {
    fontSize: 150,
    color: "grey",
  },
}));

const RestrictedDashboard = () => {
  const translate = useTranslate();
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <SentimentDissatisfiedIcon className={classes.icon} />
      <Typography variant="h3" gutterBottom>
        {translate("dashboard.no_access_title")}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {translate("dashboard.no_access")}
      </Typography>
    </div>
  );
};

export default RestrictedDashboard;
