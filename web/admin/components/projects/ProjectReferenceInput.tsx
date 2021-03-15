import React from "react";
import { ReferenceInput, SelectInput } from "react-admin";

const ProjectReferenceInput = (props) => (
  <ReferenceInput
    label="users.fields.project"
    source="project.id"
    reference="projects"
    allowEmpty
    perPage={100}
    sort={{ field: "name", order: "ASC" }}
    {...props}
  >
    <SelectInput source="name" />
  </ReferenceInput>
);

export default ProjectReferenceInput;
