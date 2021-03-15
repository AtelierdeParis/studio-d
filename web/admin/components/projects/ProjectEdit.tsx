import React from "react";
import { FC } from "react";
import {
  FormWithRedirect,
  TextInput,
  Edit,
  useTranslate,
  Toolbar,
} from "react-admin";
import { Typography, CardContent, Card, Container } from "@material-ui/core";
import { FieldProps, Project } from "../../types";

const ProjectTitle: FC<FieldProps<Project>> = ({ record }) => {
  const translate = useTranslate();
  if (record)
    return (
      <div>
        {translate("menu.projects")} - {record.name}
      </div>
    );
  return null;
};

const ProjectEdit = (props) => {
  const translate = useTranslate();
  return (
    <Container>
      <Edit title={<ProjectTitle />} {...props}>
        <FormWithRedirect
          {...props}
          render={(formProps: any) => (
            <form>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {translate("projects.edit.title")}
                </Typography>
                <hr />
                <TextInput source="name" fullWidth />
              </CardContent>
              <Toolbar
                record={formProps.record}
                basePath={formProps.basePath}
                undoable={true}
                invalid={formProps.invalid}
                handleSubmit={formProps.handleSubmit}
                saving={formProps.saving}
                resource="customers"
              />
            </form>
          )}
        />
      </Edit>
    </Container>
  );
};

export default ProjectEdit;
