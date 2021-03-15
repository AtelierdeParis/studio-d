import React from "react";
import polyglotI18nProvider from "ra-i18n-polyglot";
import messages from "admin/messages";
import { createAdminStore } from "@studio-d/core";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import crudProvider from "ra-data-nestjsx-crud";
import { Admin, Resource } from "react-admin";
import {
  ProjectCreate,
  ProjectList,
  ProjectEdit,
  UserList,
  UserCreate,
  UserEdit,
} from "admin/components";
import { Router } from "react-router-dom";
import { MainLayout, Dashboard } from "admin/layout";
import customTheme from "admin/customTheme";

const AdminBase = () => {
  const authProvider = {
    login: (params) => Promise.resolve(),
    logout: (params) => Promise.resolve(),
    checkAuth: (params) => Promise.resolve(),
    checkError: (error) => Promise.resolve(),
    getPermissions: (params) => Promise.resolve(),
  };
  const history = createMemoryHistory();
  const dataProvider = crudProvider("/api/data");
  const AdminStore = createAdminStore({
    authProvider,
    dataProvider,
    history,
  });
  const i18nProvider = polyglotI18nProvider((locale) => {
    if (Object.keys(messages).includes(locale)) {
      return messages[locale];
    }
    return messages["en"];
  });

  return (
    <Provider store={AdminStore}>
      <Router history={history}>
        <Admin
          authProvider={authProvider}
          dataProvider={dataProvider}
          history={history}
          dashboard={Dashboard}
          layout={MainLayout}
          i18nProvider={i18nProvider}
          theme={customTheme}
        >
          <Resource
            name="projects"
            list={ProjectList}
            edit={ProjectEdit}
            create={ProjectCreate}
          />
          <Resource
            name="users"
            list={UserList}
            edit={UserEdit}
            create={UserCreate}
          />
        </Admin>
      </Router>
    </Provider>
  );
};

export default AdminBase;
