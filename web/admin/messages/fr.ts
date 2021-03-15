import { TranslationMessages } from "ra-core";
import frenchMessages from "ra-language-french";

const customFrenchMessages: TranslationMessages = {
  ...frenchMessages,
  dashboard: {
    title: "Bienvenue",
    introduction:
      "Gérez tous les utilisateurs et les projets de votre plateforme depuis votre dashboard. Modifiez, supprimez ou ajoutez-en de nouveaux en un clic.",
    languageSelect: "Choisissez votre langue",
    no_access: "accès réservé aux administrateurs",
    no_access_title: "Désolé!",
    projects_title: "Nombre de projets",
    users_title: "Nombre d'utilisateurs",
    last_projects: "Derniers projets créés",
    last_users: "Derniers utilisateurs ajoutés",
  },
  menu: {
    users: "Utilisateurs",
    projects: "Projets",
  },
  loading: {
    primary: "Chargement",
    secondary: "On y est presque..",
  },
  dropdown: {
    configuration: "Paramètres",
  },
  projects: {
    create: {
      project_name: "Nom du projet",
      title: "Créer un nouveau projet",
    },
    edit: {
      title: "Modifier un projet",
    },
  },
  users: {
    create: {
      title: "Créer un utilisateur",
      password: "Mot de passe",
      info: "Identité",
    },
    fields: {
      name: "Nom complet",
      emailAddress: "Email",
      role: "Role",
      password: "Mot de passe",
      password_confirm: "Confirmation du mot de passe",
      project: "Projet",
      createdAt: "Création",
      updatedAt: "Modification",
    },
    edit: {
      title: "Modifier un utilisateur ",
      change_password: "Changer le mot de passe",
      identity: "Identité",
      access_rights: "Droits d'accès",
      new_password: "Nouveau mot de passe",
      new_password_confirm: "Confirmez le mot de passe",
    },
    errors: {
      password_mismatch: "Attention, les mots de passe ne correspondent pas.",
    },
  },
  login: {
    email: "Adresse email",
    password: "Mot de passe",
    sign_in: "Connexion",
    title: "Connexion",
    sign_in_error: "Une erreur est survenue lors de la connexion.",
    bad_request: "Email ou mot de passe invalide.",
    failed_to_fetch: "Erreur lors de la connexion",
    not_admin: "Seuls les administrateurs peuvent se connecter.",
    auth: {
      login: {
        invalid: "Email ou mot de passe invalide.",
      },
    },
  },
  validation: {
    field_required: "Ce champs est requis.",
  },
};

export default customFrenchMessages;
