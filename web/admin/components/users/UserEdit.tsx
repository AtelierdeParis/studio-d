import React from "react";
import { FC } from "react";
import {
  Toolbar,
  TextInput,
  Edit,
  useTranslate,
  PasswordInput,
  FormWithRedirect,
} from "react-admin";
import { User, FieldProps } from "../../types";
import { Box, Typography, CardContent, Container } from "@material-ui/core";
import { validatePasswords } from "../../utils/validate";
import { ProjectReferenceInput } from "../projects";

const UserTitle: FC<FieldProps<User>> = ({ record }) => {
  const translate = useTranslate();
  if (record)
    return (
      <div>
        {translate("menu.users")} - {record.name}
      </div>
    );
  return null;
};

const UserEdit = (props) => {
  const translate = useTranslate();
  return (
    <Container>
      <Edit title={<UserTitle />} {...props}>
        <FormWithRedirect
          {...props}
          validate={validatePasswords}
          render={(formProps: any) => (
            <form>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {translate("users.edit.title")}
                </Typography>
                <hr />
                <Typography variant="h6" gutterBottom>
                  {translate("users.edit.identity")}
                </Typography>
                <Box display={{ xs: "block", sm: "flex" }}>
                  <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                    <TextInput source="name" fullWidth />
                  </Box>
                  <Box flex={1}>
                    <TextInput source="emailAddress" fullWidth />
                  </Box>
                </Box>
                <Typography variant="h6" gutterBottom>
                  {translate("users.edit.access_rights")}
                </Typography>
                <Box display={{ xs: "block", sm: "flex" }}>
                  <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                    <TextInput source="role" fullWidth />
                  </Box>
                  <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                    <ProjectReferenceInput fullWidth />
                  </Box>
                </Box>

                <Typography variant="h6" gutterBottom>
                  {translate("users.edit.change_password")}
                </Typography>
                <Box display={{ xs: "block", sm: "flex" }}>
                  <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                    <PasswordInput
                      source="password"
                      resource="customers"
                      fullWidth
                      label="users.edit.new_password"
                    />
                  </Box>
                  <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
                    <PasswordInput
                      source="confirm_password"
                      resource="customers"
                      fullWidth
                      label="users.edit.new_password_confirm"
                    />
                  </Box>
                </Box>

                <Toolbar
                  record={formProps.record}
                  basePath={formProps.basePath}
                  undoable={true}
                  invalid={formProps.invalid}
                  handleSubmit={formProps.handleSubmit}
                  saving={formProps.saving}
                  resource="customers"
                />
              </CardContent>
            </form>
          )}
        />
      </Edit>
    </Container>
  );
};

export default UserEdit;
