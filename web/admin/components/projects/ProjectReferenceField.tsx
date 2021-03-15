import * as React from "react";
import { FC } from "react";
import { ReferenceField } from "react-admin";

import { ReferenceFieldProps } from "../../types";

const ProjectReferenceField = (props) => (
  <ReferenceField source="project.id" reference="projects" {...props}>
    <div>{props.record?.project.name}</div>
  </ReferenceField>
);

ProjectReferenceField.defaultProps = {
  source: "project.id",
};

export default ProjectReferenceField;
