import { TranslationMessages } from "ra-core";
import englishMessages from "ra-language-english";

const customEnglishMessages: TranslationMessages = {
  ...englishMessages,
  dashboard: {
    title: "Welcome",
    introduction:
      "Manage all your platform users and projects from your dashboard. Update, delete or create new ones with one click.",
    languageSelect: "Choose your language",
    no_access: "access restricted to admins only",
    no_access_title: "Sorry!",
    projects_title: "Total projects",
    users_title: "Total users",
    last_projects: "Last projects created",
    last_users: "Last users registered",
  },
  menu: {
    users: "Users",
    projects: "Projects",
  },
  loading: {
    primary: "Loading",
    secondary: "We are nearly there..",
  },
  dropdown: {
    configuration: "Configuration",
  },
  projects: {
    create: {
      project_name: "Project name",
      title: "Create a new project",
    },
    edit: {
      title: "Modify a project",
    },
  },
  users: {
    create: {
      title: "Create a user",
      password: "Password",
      info: "Identity",
    },
    fields: {
      name: "Full name",
      emailAddress: "Email",
      role: "Role",
      password: "Password",
      password_confirm: "Confirm password",
      project: "Project",
      createdAt: "Created",
      updatedAt: "Modified",
    },
    edit: {
      title: "Modify user",
      change_password: "Change password",
      identity: "Identity",
      access_rights: "Access rights",
      new_password: "New password",
      new_password_confirm: "Confirm new password",
    },
    errors: {
      password_mismatch: "Warning, passwords do not match.",
    },
  },
  login: {
    email: "Email address",
    password: "Password",
    sign_in: "Login",
    title: "Login",
    sign_in_error: "An error occured while login.",
    bad_request: "Incorrect email and password.",
    failed_to_fetch: "Error while login please try again later",
    not_admin: "Only admin users are allowed on this platform",
    auth: {
      login: {
        invalid: "Incorrect email and password.",
      },
    },
  },
  validation: {
    field_required: "This field is required.",
  },
};

export default customEnglishMessages;
