import React from "react";
import {
  List,
  Datagrid,
  TextField,
  SearchInput,
  EditButton,
  Filter,
} from "react-admin";

const ProjectFilter = (props: any) => (
  <Filter {...props}>
    <SearchInput source="name" alwaysOn />
  </Filter>
);

const ProjectsList = (props) => (
  <List {...props} filters={<ProjectFilter />}>
    <Datagrid rowClick="edit">
      <TextField source="name" />
      <EditButton />
    </Datagrid>
  </List>
);

export default ProjectsList;
