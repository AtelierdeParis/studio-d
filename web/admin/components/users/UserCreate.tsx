import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  useTranslate,
  PasswordInput,
} from "react-admin";
import { Typography, Box, Container } from "@material-ui/core";
import { ProjectReferenceInput } from "../projects";
import {
  requiredValidate,
  validatePasswords,
  emailValidate,
} from "../../utils/validate";

const UserCreate = (props: any) => {
  const translate = useTranslate();

  return (
    <Container>
      <Create {...props}>
        <SimpleForm validate={validatePasswords}>
          <Typography variant="h5" gutterBottom>
            {translate("users.create.title")}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {translate("users.create.info")}
          </Typography>
          <Box display={{ xs: "block", sm: "flex" }} width={"100%!important"}>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <TextInput
                label="users.fields.name"
                autoFocus
                source="name"
                validate={requiredValidate}
                fullWidth
              />
            </Box>
            <Box flex={1}>
              <TextInput
                type="email"
                source="email"
                label="users.fields.emailAddress"
                validation={{ email: true }}
                validate={emailValidate}
                fullWidth
              />
            </Box>
          </Box>
          <ProjectReferenceInput />
          <Box pt="1em" />
          <Typography variant="h6" gutterBottom>
            {translate("users.create.password")}
          </Typography>
          <Box display={{ xs: "block", sm: "flex" }} width={"100%!important"}>
            <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
              <PasswordInput
                label="users.fields.password"
                source="password"
                fullWidth
                validate={requiredValidate}
              />
            </Box>
            <Box flex={1}>
              <PasswordInput
                label="users.fields.password_confirm"
                source="confirm_password"
                fullWidth
                validate={requiredValidate}
              />
            </Box>
          </Box>
        </SimpleForm>
      </Create>
    </Container>
  );
};

export default UserCreate;
