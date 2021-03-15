import React, { FC } from "react";
import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { useTranslate, useQueryWithStore } from "react-admin";
import { makeStyles } from "@material-ui/core/styles";
import { CardWithIcon, Language } from "admin/components";
import UserIcon from "@material-ui/icons/Person";
import ProjectIcon from "@material-ui/icons/Description";
import { User } from "admin/types";
import WelcomeSvg from "../../../public/admin/welcome.svg";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  spacing: {
    margin: "20px 0px",
  },
  iconCardTitle: {
    padding: 10,
  },
  mb20: {
    marginBottom: 20,
  },
  welcome: {
    height: 300,
  },
}));

interface State {
  nbProjects?: number;
  nbUsers?: number;
  lastUsers?: User[];
}

const AuthorizedDashboard: FC = () => {
  const translate = useTranslate();
  const classes = useStyles();

  const {
    loaded: loadedUsers,
    data: usersData,
    total: usersTotal,
  } = useQueryWithStore({
    type: "getList",
    resource: "users",
    payload: {
      pagination: { page: 1, perPage: 6 },
      sort: { field: "createdAt", order: "DESC" },
      filter: {},
    },
  });

  const {
    loaded: loadedProjects,
    data: projectsData,
    total: projectsTotal,
  } = useQueryWithStore({
    type: "getList",
    resource: "projects",
    payload: {
      pagination: { page: 1, perPage: 6 },
      sort: { field: "createdAt", order: "DESC" },
      filter: {},
    },
  });

  return (
    <div>
      <Card className={classes.spacing}>
        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" className={classes.mb20}>
                {translate("dashboard.title")}
              </Typography>
              <Typography variant="body1" className={classes.mb20}>
                {translate("dashboard.introduction")}
              </Typography>
              <Typography variant="body1" className={classes.mb20}>
                {translate("dashboard.languageSelect")}
              </Typography>
              <Language />
            </Grid>
            <Grid item xs={12} sm={6} alignItems="center" container>
              <WelcomeSvg className={classes.welcome} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CardWithIcon
            icon={UserIcon}
            to={"/users"}
            title={translate("dashboard.users_title")}
            loading={!loadedUsers}
            subtitle={usersTotal}
          >
            <Typography variant="h6" className={classes.iconCardTitle}>
              {translate("dashboard.last_users")}
            </Typography>
            <List>
              {!!usersData &&
                usersData.map((user) => (
                  <ListItem
                    key={user.id}
                    alignItems="center"
                    component={Link}
                    to={`/users/${user.id}`}
                  >
                    <ListItemAvatar>
                      <Avatar />
                    </ListItemAvatar>

                    <ListItemText
                      primary={user.name}
                      style={{ paddingRight: 0 }}
                    />
                  </ListItem>
                ))}
            </List>
          </CardWithIcon>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardWithIcon
            icon={ProjectIcon}
            to={"/projects"}
            title={translate("dashboard.projects_title")}
            loading={!loadedProjects}
            subtitle={projectsTotal}
          >
            <>
              <Typography variant="h6" className={classes.iconCardTitle}>
                {translate("dashboard.last_projects")}
              </Typography>
              <List>
                {!!projectsData &&
                  projectsData.map((project) => (
                    <ListItem
                      key={project.id}
                      alignItems="center"
                      component={Link}
                      to={`/projects/${project.id}`}
                    >
                      <ListItemText
                        primary={project.name}
                        style={{ paddingRight: 0 }}
                      />
                    </ListItem>
                  ))}
              </List>
            </>
          </CardWithIcon>
        </Grid>
      </Grid>
      <div className={classes.spacing}></div>
    </div>
  );
};

export default AuthorizedDashboard;
