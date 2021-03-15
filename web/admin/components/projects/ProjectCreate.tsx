import React from "react";
import { SimpleForm, TextInput, Create, useTranslate } from "react-admin";
import { Typography, Container } from "@material-ui/core";
import { requiredValidate } from "admin/utils/validate";

const ProjectCreate = (props) => {
  const translate = useTranslate();
  return (
    <Container>
      <Create {...props}>
        <SimpleForm>
          <Typography variant="h6" gutterBottom>
            {translate("projects.create.title")}
          </Typography>
          <TextInput
            source="name"
            label="projects.create.project_name"
            validate={requiredValidate}
            fullWidth
          />
        </SimpleForm>
      </Create>
    </Container>
  );
};

export default ProjectCreate;
