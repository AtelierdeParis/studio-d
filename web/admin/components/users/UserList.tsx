import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DateField,
  SearchInput,
  Filter,
} from "react-admin";
import { ProjectReferenceField } from "../projects";

const UserFilter = (props: any) => (
  <Filter {...props}>
    <SearchInput source="emailAddress" alwaysOn />
  </Filter>
);

const UsersList = (props) => (
  <List {...props} filters={<UserFilter />}>
    <Datagrid rowClick="edit">
      <TextField source="name" label="users.fields.name" />
      <TextField source="emailAddress" label="users.fields.emailAddress" />
      <ProjectReferenceField
        label="users.fields.project"
        sortBy="project.name"
      />
      <DateField source="createdAt" label="users.fields.createdAt" />
      <DateField source="updatedAt" label="users.fields.updatedAt" />
      <EditButton />
    </Datagrid>
  </List>
);

export default UsersList;
