/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Actuality {
  id: string;
  title: string;
  content: string;
  created_at: string;
  image: {
    id: string;
    name: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: object;
    hash: string;
    ext?: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: object;
    related?: string;
    created_by?: string;
    updated_by?: string;
  };
}

export interface NewActuality {
  title: string;
  content: string;
  created_by?: string;
  updated_by?: string;
}

export interface Disponibility {
  id: string;
  when?: "morning" | "afternoon" | "full";

  /** @format date */
  start: string;

  /** @format date */
  end: string;
  espace?: {
    id: string;
    name: string;
    surface: number;
    roomLength: number;
    width: number;
    height: number;
    mirror: boolean;
    danceBar: boolean;
    accomodation: boolean;
    technicalStaff: boolean;
    floor: "floor" | "carpet" | "other";
    otherFloor?: string;
    about?: string;
    details?: string;
    address: string;
    latitude: string;
    longitude: string;
    files?: string[];
    images?: string[];
    users_permissions_user?: string;
    disponibilities?: string[];
    scheduleDetails?: string;
    filledUntil?: string;
    published?: boolean;
    created_by?: string;
    updated_by?: string;
  };
  type: "punctual" | "day" | "period";
  status: "available" | "booked" | "pending" | "past";

  /** @format date-time */
  published_at?: string;
}

export interface NewDisponibility {
  when?: "morning" | "afternoon" | "full";

  /** @format date */
  start: string;

  /** @format date */
  end: string;
  espace?: string;
  type: "punctual" | "day" | "period";
  status: "available" | "booked" | "pending" | "past";

  /** @format date-time */
  published_at?: string;
  created_by?: string;
  updated_by?: string;
}

export interface Espace {
  id: string;
  name: string;
  surface: number;
  roomLength: number;
  width: number;
  height: number;
  mirror: boolean;
  danceBar: boolean;
  accomodation: boolean;
  technicalStaff: boolean;
  floor: "plancherDanse" | "parquetTraditionnel" | "other";
  otherFloor?: string;
  about?: string;
  details?: string;
  address: string;
  latitude: string;
  longitude: string;
  files?: {
    id: string;
    name: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: object;
    hash: string;
    ext?: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: object;
    related?: string;
    created_by?: string;
    updated_by?: string;
  }[];
  images?: {
    id: string;
    name: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: object;
    hash: string;
    ext?: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: object;
    related?: string;
    created_by?: string;
    updated_by?: string;
  }[];
  users_permissions_user?: {
    id: string;
    email: string;
    provider?: string;
    password?: string;
    resetPasswordToken?: string;
    confirmationToken?: string;
    role?: string;
    username: string;
    confirmed?: boolean;
    blocked?: boolean;
    firstname: string;
    lastname: string;
    structureName: string;
    socialReason?: string;
    address: string;
    zipCode: string;
    city: string;
    country?: string;
    siret: string;
    ape: string;
    phone?: string;
    license?: string;
    website?: string;
    legalRepresentative?: string;
    statusRepresentative?: string;
    insuranceNumber?: string;
    insuranceName?: string;
    choreographer?: string;
    espaces?: string[];
    type: "company" | "place";
    created_by?: string;
    updated_by?: string;
  };
  disponibilities?: {
    id: string;
    when?: "morning" | "afternoon" | "full";
    start: string;
    end: string;
    espace?: string;
    type: "punctual" | "day" | "period";
    status: "available" | "booked" | "pending" | "past";
    published_at?: string;
    created_by?: string;
    updated_by?: string;
  }[];
  scheduleDetails?: string;

  /** @format date */
  filledUntil?: string;
  published?: boolean;
  city: string;
  danceCarpet: boolean;
}

export interface NewEspace {
  name: string;
  surface: number;
  roomLength: number;
  width: number;
  height: number;
  mirror: boolean;
  danceBar: boolean;
  accomodation: boolean;
  technicalStaff: boolean;
  floor: "plancherDanse" | "parquetTraditionnel" | "other";
  otherFloor?: string;
  about?: string;
  details?: string;
  address: string;
  latitude: string;
  longitude: string;
  users_permissions_user?: string;
  disponibilities?: string[];
  scheduleDetails?: string;

  /** @format date */
  filledUntil?: string;
  published?: boolean;
  city: string;
  danceCarpet: boolean;
  created_by?: string;
  updated_by?: string;
}

export interface HomeCarousel {
  id: string;
  images: {
    id: string;
    name: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: object;
    hash: string;
    ext?: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: object;
    related?: string;
    created_by?: string;
    updated_by?: string;
  }[];
}

export interface NewHomeCarousel {
  created_by?: string;
  updated_by?: string;
}

export interface Message {
  id: string;
  name: string;
  from: string;
  message: string;
}

export interface NewMessage {
  name: string;
  from: string;
  message: string;
  created_by?: string;
  updated_by?: string;
}

export interface Page {
  id: string;
  title?: string;
  text?: string;
  url: string;
}

export interface NewPage {
  title?: string;
  text?: string;
  url: string;
  created_by?: string;
  updated_by?: string;
}

export interface UploadFile {
  name?: string;
  sha256?: string;
  hash?: string;
  ext?: string;
  size?: number;
  mime?: string;
  url?: string;
  provider?: string;
  updatedAt?: string;
  createdAt?: string;
  related?: string[];
}

export interface UsersPermissionsRole {
  id: string;
  name: string;
  description?: string;
  type?: string;
  permissions?: {
    id: string;
    type: string;
    controller: string;
    action: string;
    enabled: boolean;
    policy?: string;
    role?: string;
    created_by?: string;
    updated_by?: string;
  }[];
  users?: {
    id: string;
    email: string;
    provider?: string;
    password?: string;
    resetPasswordToken?: string;
    confirmationToken?: string;
    role?: string;
    username: string;
    confirmed?: boolean;
    blocked?: boolean;
    firstname: string;
    lastname: string;
    structureName: string;
    socialReason?: string;
    address: string;
    zipCode: string;
    city: string;
    country?: string;
    siret: string;
    ape: string;
    phone?: string;
    license?: string;
    website?: string;
    legalRepresentative?: string;
    statusRepresentative?: string;
    insuranceNumber?: string;
    insuranceName?: string;
    choreographer?: string;
    espaces?: string[];
    type: "company" | "place";
    created_by?: string;
    updated_by?: string;
  }[];
}

export interface NewUsersPermissionsRole {
  name: string;
  description?: string;
  type?: string;
  permissions?: string[];
  users?: string[];
  created_by?: string;
  updated_by?: string;
}

export interface UsersPermissionsUser {
  id: string;
  email: string;
  provider?: string;
  role?: {
    id: string;
    name: string;
    description?: string;
    type?: string;
    permissions?: string[];
    users?: string[];
    created_by?: string;
    updated_by?: string;
  };
  username: string;
  confirmed?: boolean;
  blocked?: boolean;
  firstname: string;
  lastname: string;
  structureName: string;
  socialReason?: string;
  address: string;
  zipCode: string;
  city: string;
  country?: string;
  siret: string;
  ape: string;
  phone?: string;
  license?: string;
  website?: string;
  legalRepresentative?: string;
  statusRepresentative?: string;
  insuranceNumber?: string;
  insuranceName?: string;
  choreographer?: string;
  espaces?: {
    id: string;
    name: string;
    surface: number;
    roomLength: number;
    width: number;
    height: number;
    mirror: boolean;
    danceBar: boolean;
    accomodation: boolean;
    technicalStaff: boolean;
    floor: "floor" | "carpet" | "other";
    otherFloor?: string;
    about?: string;
    details?: string;
    address: string;
    latitude: string;
    longitude: string;
    files?: string[];
    images?: string[];
    users_permissions_user?: string;
    disponibilities?: string[];
    scheduleDetails?: string;
    filledUntil?: string;
    published?: boolean;
    created_by?: string;
    updated_by?: string;
  }[];
  type: "company" | "place";
}

export interface NewUsersPermissionsUser {
  email: string;
  provider?: string;

  /** @format password */
  password?: string;
  resetPasswordToken?: string;
  confirmationToken?: string;
  role?: string;
  username: string;
  confirmed?: boolean;
  blocked?: boolean;
  firstname: string;
  lastname: string;
  structureName: string;
  socialReason?: string;
  address: string;
  zipCode: string;
  city: string;
  country?: string;
  siret: string;
  ape: string;
  phone?: string;
  license?: string;
  website?: string;
  legalRepresentative?: string;
  statusRepresentative?: string;
  insuranceNumber?: string;
  insuranceName?: string;
  choreographer?: string;
  espaces?: string[];
  type: "company" | "place";
  created_by?: string;
  updated_by?: string;
}

export interface Error {
  /** @format int32 */
  code: number;
  message: string;
}

export namespace Actualities {
  /**
   * No description
   * @tags Actuality
   * @name ActualitiesList
   * @request GET:/actualities
   * @secure
   */
  export namespace ActualitiesList {
    export type RequestParams = {};
    export type RequestQuery = {
      _limit?: number;
      _sort?: string;
      _start?: number;
      "="?: string;
      _ne?: string;
      _lt?: string;
      _lte?: string;
      _gt?: string;
      _gte?: string;
      _contains?: string;
      _containss?: string;
      _in?: string[];
      _nin?: string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Actuality[];
  }
  /**
   * @description Create a new record
   * @tags Actuality
   * @name ActualitiesCreate
   * @request POST:/actualities
   * @secure
   */
  export namespace ActualitiesCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = NewActuality;
    export type RequestHeaders = {};
    export type ResponseBody = Actuality;
  }
  /**
   * No description
   * @tags Actuality
   * @name CountList
   * @request GET:/actualities/count
   * @secure
   */
  export namespace CountList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { count?: number };
  }
  /**
   * No description
   * @tags Actuality
   * @name ActualitiesDetail
   * @request GET:/actualities/{id}
   * @secure
   */
  export namespace ActualitiesDetail {
    export type RequestParams = { id: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Actuality;
  }
  /**
   * @description Update a record
   * @tags Actuality
   * @name ActualitiesUpdate
   * @request PUT:/actualities/{id}
   * @secure
   */
  export namespace ActualitiesUpdate {
    export type RequestParams = { id: string };
    export type RequestQuery = {};
    export type RequestBody = NewActuality;
    export type RequestHeaders = {};
    export type ResponseBody = Actuality;
  }
  /**
   * @description Delete a record
   * @tags Actuality
   * @name ActualitiesDelete
   * @request DELETE:/actualities/{id}
   * @secure
   */
  export namespace ActualitiesDelete {
    export type RequestParams = { id: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = number;
  }
}

export namespace Disponibilities {
  /**
   * No description
   * @tags Disponibility
   * @name DisponibilitiesList
   * @request GET:/disponibilities
   * @secure
   */
  export namespace DisponibilitiesList {
    export type RequestParams = {};
    export type RequestQuery = {
      _limit?: number;
      _sort?: string;
      _start?: number;
      "="?: string;
      _ne?: string;
      _lt?: string;
      _lte?: string;
      _gt?: string;
      _gte?: string;
      _contains?: string;
      _containss?: string;
      _in?: string[];
      _nin?: string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Disponibility[];
  }
  /**
   * @description Create a new record
   * @tags Disponibility
   * @name DisponibilitiesCreate
   * @request POST:/disponibilities
   * @secure
   */
  export namespace DisponibilitiesCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = NewDisponibility;
    export type RequestHeaders = {};
    export type ResponseBody = Disponibility;
  }
  /**
   * No description
   * @tags Disponibility
   * @name CountList
   * @request GET:/disponibilities/count
   * @secure
   */
  export namespace CountList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { count?: number };
  }
  /**
   * No description
   * @tags Disponibility
   * @name DisponibilitiesDetail
   * @request GET:/disponibilities/{id}
   * @secure
   */
  export namespace DisponibilitiesDetail {
    export type RequestParams = { id: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Disponibility;
  }
  /**
   * @description Update a record
   * @tags Disponibility
   * @name DisponibilitiesUpdate
   * @request PUT:/disponibilities/{id}
   * @secure
   */
  export namespace DisponibilitiesUpdate {
    export type RequestParams = { id: string };
    export type RequestQuery = {};
    export type RequestBody = NewDisponibility;
    export type RequestHeaders = {};
    export type ResponseBody = Disponibility;
  }
  /**
   * @description Delete a record
   * @tags Disponibility
   * @name DisponibilitiesDelete
   * @request DELETE:/disponibilities/{id}
   * @secure
   */
  export namespace DisponibilitiesDelete {
    export type RequestParams = { id: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Disponibility;
  }
}

export namespace Bulk {
  /**
   * @description Create a new record
   * @tags Disponibility
   * @name DisponibilitiesCreate
   * @request POST:/bulk/disponibilities
   * @secure
   */
  export namespace DisponibilitiesCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = Disponibility[];
    export type RequestHeaders = {};
    export type ResponseBody = Disponibility[];
  }
}

export namespace Espaces {
  /**
   * @description Get places related to current user
   * @tags Espace
   * @name MyPlaces
   * @request GET:/espaces/me
   * @secure
   */
  export namespace MyPlaces {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Espace[];
  }
  /**
   * @description Get list of cities
   * @tags Espace
   * @name CitiesList
   * @request GET:/espaces/cities
   * @secure
   */
  export namespace CitiesList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { foo?: string };
  }
  /**
   * No description
   * @tags Espace
   * @name EspacesList
   * @request GET:/espaces
   * @secure
   */
  export namespace EspacesList {
    export type RequestParams = {};
    export type RequestQuery = {
      _limit?: number;
      _sort?: string;
      _start?: number;
      "="?: string;
      _ne?: string;
      _lt?: string;
      _lte?: string;
      _gt?: string;
      _gte?: string;
      _contains?: string;
      _containss?: string;
      _in?: string[];
      _nin?: string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Espace[];
  }
  /**
   * @description Create a new record
   * @tags Espace
   * @name EspacesCreate
   * @request POST:/espaces
   * @secure
   */
  export namespace EspacesCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = object;
    export type RequestHeaders = {};
    export type ResponseBody = Espace;
  }
  /**
   * No description
   * @tags Espace
   * @name CountList
   * @request GET:/espaces/count
   * @secure
   */
  export namespace CountList {
    export type RequestParams = {};
    export type RequestQuery = {
      _limit?: number;
      _sort?: string;
      _start?: number;
      "="?: string;
      _ne?: string;
      _lt?: string;
      _lte?: string;
      _gt?: string;
      _gte?: string;
      _contains?: string;
      _containss?: string;
      _in?: string[];
      _nin?: string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { count?: number };
  }
  /**
   * No description
   * @tags Espace
   * @name EspacesDetail
   * @request GET:/espaces/{id}
   * @secure
   */
  export namespace EspacesDetail {
    export type RequestParams = { id: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Espace;
  }
  /**
   * @description Update a record
   * @tags Espace
   * @name EspacesUpdate
   * @request PUT:/espaces/{id}
   * @secure
   */
  export namespace EspacesUpdate {
    export type RequestParams = { id: string };
    export type RequestQuery = {};
    export type RequestBody = object;
    export type RequestHeaders = {};
    export type ResponseBody = Espace;
  }
  /**
   * @description Delete a record
   * @tags Espace
   * @name EspacesDelete
   * @request DELETE:/espaces/{id}
   * @secure
   */
  export namespace EspacesDelete {
    export type RequestParams = { id: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = number;
  }
}

export namespace HomeCarousel {
  /**
   * @description Find all the home-carousel's records
   * @tags Home-carousel
   * @name HomeCarouselList
   * @request GET:/home-carousel
   * @secure
   */
  export namespace HomeCarouselList {
    export type RequestParams = {};
    export type RequestQuery = {
      _limit?: number;
      _sort?: string;
      _start?: number;
      "="?: string;
      _ne?: string;
      _lt?: string;
      _lte?: string;
      _gt?: string;
      _gte?: string;
      _contains?: string;
      _containss?: string;
      _in?: string[];
      _nin?: string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = HomeCarousel;
  }
  /**
   * @description Update a single home-carousel record
   * @tags Home-carousel
   * @name HomeCarouselUpdate
   * @request PUT:/home-carousel
   * @secure
   */
  export namespace HomeCarouselUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = NewHomeCarousel;
    export type RequestHeaders = {};
    export type ResponseBody = { foo?: string };
  }
  /**
   * @description Delete a single home-carousel record
   * @tags Home-carousel
   * @name HomeCarouselDelete
   * @request DELETE:/home-carousel
   * @secure
   */
  export namespace HomeCarouselDelete {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = number;
  }
}

export namespace Messages {
  /**
   * No description
   * @tags Message
   * @name MessagesList
   * @request GET:/messages
   * @secure
   */
  export namespace MessagesList {
    export type RequestParams = {};
    export type RequestQuery = {
      _limit?: number;
      _sort?: string;
      _start?: number;
      "="?: string;
      _ne?: string;
      _lt?: string;
      _lte?: string;
      _gt?: string;
      _gte?: string;
      _contains?: string;
      _containss?: string;
      _in?: string[];
      _nin?: string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Message[];
  }
  /**
   * @description Create a new record
   * @tags Message
   * @name MessagesCreate
   * @request POST:/messages
   * @secure
   */
  export namespace MessagesCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = NewMessage;
    export type RequestHeaders = {};
    export type ResponseBody = Message;
  }
  /**
   * No description
   * @tags Message
   * @name CountList
   * @request GET:/messages/count
   * @secure
   */
  export namespace CountList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { count?: number };
  }
  /**
   * No description
   * @tags Message
   * @name MessagesDetail
   * @request GET:/messages/{id}
   * @secure
   */
  export namespace MessagesDetail {
    export type RequestParams = { id: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Message;
  }
  /**
   * @description Update a record
   * @tags Message
   * @name MessagesUpdate
   * @request PUT:/messages/{id}
   * @secure
   */
  export namespace MessagesUpdate {
    export type RequestParams = { id: string };
    export type RequestQuery = {};
    export type RequestBody = NewMessage;
    export type RequestHeaders = {};
    export type ResponseBody = Message;
  }
  /**
   * @description Delete a record
   * @tags Message
   * @name MessagesDelete
   * @request DELETE:/messages/{id}
   * @secure
   */
  export namespace MessagesDelete {
    export type RequestParams = { id: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = number;
  }
}

export namespace Pages {
  /**
   * No description
   * @tags Page
   * @name PagesList
   * @request GET:/pages
   * @secure
   */
  export namespace PagesList {
    export type RequestParams = {};
    export type RequestQuery = {
      _limit?: number;
      _sort?: string;
      _start?: number;
      "="?: string;
      _ne?: string;
      _lt?: string;
      _lte?: string;
      _gt?: string;
      _gte?: string;
      _contains?: string;
      _containss?: string;
      _in?: string[];
      _nin?: string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Page[];
  }
  /**
   * @description Create a new record
   * @tags Page
   * @name PagesCreate
   * @request POST:/pages
   * @secure
   */
  export namespace PagesCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = NewPage;
    export type RequestHeaders = {};
    export type ResponseBody = Page;
  }
  /**
   * No description
   * @tags Page
   * @name CountList
   * @request GET:/pages/count
   * @secure
   */
  export namespace CountList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { count?: number };
  }
  /**
   * No description
   * @tags Page
   * @name PagesDetail
   * @request GET:/pages/{url}
   * @secure
   */
  export namespace PagesDetail {
    export type RequestParams = { url: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Page;
  }
  /**
   * @description Update a record
   * @tags Page
   * @name PagesUpdate
   * @request PUT:/pages/{id}
   * @secure
   */
  export namespace PagesUpdate {
    export type RequestParams = { id: string };
    export type RequestQuery = {};
    export type RequestBody = NewPage;
    export type RequestHeaders = {};
    export type ResponseBody = Page;
  }
  /**
   * @description Delete a record
   * @tags Page
   * @name PagesDelete
   * @request DELETE:/pages/{id}
   * @secure
   */
  export namespace PagesDelete {
    export type RequestParams = { id: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = number;
  }
}

export namespace Email {
  /**
   * @description Send an email
   * @tags Email - Email
   * @name EmailCreate
   * @request POST:/email/
   * @secure
   */
  export namespace EmailCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = { foo?: string };
    export type RequestHeaders = {};
    export type ResponseBody = { foo?: string };
  }
  /**
   * @description Send an test email
   * @tags Email - Email
   * @name TestCreate
   * @request POST:/email/test
   * @secure
   */
  export namespace TestCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = { foo?: string };
    export type RequestHeaders = {};
    export type ResponseBody = { foo?: string };
  }
  /**
   * @description Get the email settings
   * @tags Email - Email
   * @name SettingsList
   * @request GET:/email/settings
   * @secure
   */
  export namespace SettingsList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { foo?: string };
  }
}

export namespace Upload {
  /**
   * @description Upload one or multiple files
   * @tags Upload - File
   * @name UploadCreate
   * @request POST:/upload/
   * @secure
   */
  export namespace UploadCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = object;
    export type RequestHeaders = {};
    export type ResponseBody = {
      name?: string;
      hash?: string;
      sha256?: string;
      ext?: string;
      mime?: string;
      size?: number;
      url?: string;
      provider?: string;
      related?: string[];
    }[];
  }
  /**
   * @description Retrieve the total number of uploaded files
   * @tags Upload - File
   * @name FilesCountList
   * @request GET:/upload/files/count
   * @secure
   */
  export namespace FilesCountList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { count?: number };
  }
  /**
   * @description Retrieve all file documents
   * @tags Upload - File
   * @name FilesList
   * @request GET:/upload/files
   * @secure
   */
  export namespace FilesList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UploadFile[];
  }
  /**
   * @description Retrieve a single file depending on its id
   * @tags Upload - File
   * @name FilesDetail
   * @request GET:/upload/files/{id}
   * @secure
   */
  export namespace FilesDetail {
    export type RequestParams = { id: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UploadFile;
  }
  /**
   * @description Delete an uploaded file
   * @tags Upload - File
   * @name FilesDelete
   * @request DELETE:/upload/files/{id}
   * @secure
   */
  export namespace FilesDelete {
    export type RequestParams = { id: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * @description Search for an uploaded file
   * @tags Upload - File
   * @name SearchDetail
   * @request GET:/upload/search/{id}
   * @secure
   */
  export namespace SearchDetail {
    export type RequestParams = { id: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UploadFile[];
  }
}

export namespace Users {
  /**
   * @description Update current user
   * @tags Unclassified
   * @name PutUsers
   * @request PUT:/users/me
   * @secure
   */
  export namespace PutUsers {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = { foo?: string };
    export type RequestHeaders = {};
    export type ResponseBody = { foo?: string };
  }
  /**
   * @description Retrieve the logged in user information
   * @tags UsersPermissions - User
   * @name GetUsers
   * @request GET:/users/me
   * @secure
   */
  export namespace GetUsers {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UsersPermissionsUser;
  }
  /**
   * @description Retrieve all user documents
   * @tags UsersPermissions - User
   * @name UsersList
   * @request GET:/users
   * @secure
   */
  export namespace UsersList {
    export type RequestParams = {};
    export type RequestQuery = {
      _limit?: number;
      _sort?: string;
      _start?: number;
      "="?: string;
      _ne?: string;
      _lt?: string;
      _lte?: string;
      _gt?: string;
      _gte?: string;
      _contains?: string;
      _containss?: string;
      _in?: string[];
      _nin?: string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UsersPermissionsUser[];
  }
  /**
   * @description Retrieve a single user depending on his id
   * @tags UsersPermissions - User
   * @name UsersDetail
   * @request GET:/users/{id}
   * @secure
   */
  export namespace UsersDetail {
    export type RequestParams = { id: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UsersPermissionsUser;
  }
  /**
   * @description Update an existing user
   * @tags UsersPermissions - User
   * @name UsersUpdate
   * @request PUT:/users/{id}
   * @secure
   */
  export namespace UsersUpdate {
    export type RequestParams = { id: string };
    export type RequestQuery = {};
    export type RequestBody = NewUsersPermissionsUser;
    export type RequestHeaders = {};
    export type ResponseBody = UsersPermissionsUser;
  }
  /**
   * @description Delete an existing user
   * @tags UsersPermissions - User
   * @name UsersDelete
   * @request DELETE:/users/{id}
   * @secure
   */
  export namespace UsersDelete {
    export type RequestParams = { id: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { foo?: string };
  }
}

export namespace UsersPermissions {
  /**
   * @description Retrieve a role depending on its id
   * @tags UsersPermissions - Role
   * @name RolesDetail
   * @request GET:/users-permissions/roles/{id}
   * @secure
   */
  export namespace RolesDetail {
    export type RequestParams = { id: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UsersPermissionsRole;
  }
  /**
   * @description Retrieve all role documents
   * @tags UsersPermissions - Role
   * @name RolesList
   * @request GET:/users-permissions/roles
   * @secure
   */
  export namespace RolesList {
    export type RequestParams = {};
    export type RequestQuery = {
      _limit?: number;
      _sort?: string;
      _start?: number;
      "="?: string;
      _ne?: string;
      _lt?: string;
      _lte?: string;
      _gt?: string;
      _gte?: string;
      _contains?: string;
      _containss?: string;
      _in?: string[];
      _nin?: string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UsersPermissionsRole[];
  }
  /**
   * @description Create a new role
   * @tags UsersPermissions - Role
   * @name RolesCreate
   * @request POST:/users-permissions/roles
   * @secure
   */
  export namespace RolesCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = NewUsersPermissionsRole;
    export type RequestHeaders = {};
    export type ResponseBody = UsersPermissionsRole;
  }
  /**
   * @description Update a role
   * @tags UsersPermissions - Role
   * @name RolesUpdate
   * @request PUT:/users-permissions/roles/{role}
   * @secure
   */
  export namespace RolesUpdate {
    export type RequestParams = { role: string };
    export type RequestQuery = {};
    export type RequestBody = NewUsersPermissionsRole;
    export type RequestHeaders = {};
    export type ResponseBody = UsersPermissionsRole;
  }
  /**
   * @description Delete a role
   * @tags UsersPermissions - Role
   * @name RolesDelete
   * @request DELETE:/users-permissions/roles/{role}
   * @secure
   */
  export namespace RolesDelete {
    export type RequestParams = { role: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { foo?: string };
  }
  /**
   * @description Search for users
   * @tags UsersPermissions - User
   * @name SearchDetail
   * @summary Retrieve a list of users by searching for their username or email
   * @request GET:/users-permissions/search/{id}
   * @secure
   */
  export namespace SearchDetail {
    export type RequestParams = { id: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UsersPermissionsUser[];
  }
}

export namespace Connect {
  /**
   * @description Connect a provider
   * @tags Authentication
   * @name GetConnect
   * @summary Authenticate your user with a custom provider
   * @request GET:/connect/*
   * @secure
   */
  export namespace GetConnect {
    export type RequestParams = { provider: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
}

export namespace Auth {
  /**
   * @description Login a user using the identifiers email and password
   * @tags Authentication
   * @name Login
   * @request POST:/auth/local
   * @secure
   */
  export namespace Login {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = { identifier: string; password: string };
    export type RequestHeaders = {};
    export type ResponseBody = any;
  }
  /**
   * @description Register a new user with the default role
   * @tags Authentication
   * @name Signup
   * @request POST:/auth/local/register
   * @secure
   */
  export namespace Signup {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = { username: string; email: string; password: string };
    export type RequestHeaders = {};
    export type ResponseBody = any;
  }
  /**
   * @description Successfull redirection after approving a provider
   * @tags Authentication
   * @name CallbackDetail
   * @request GET:/auth/{provider}/callback
   * @secure
   */
  export namespace CallbackDetail {
    export type RequestParams = { provider: string };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = any;
  }
  /**
   * @description Send the reset password email link
   * @tags Authentication
   * @name ForgotPassword
   * @summary Send an email to reset your password
   * @request POST:/auth/forgot-password
   * @secure
   */
  export namespace ForgotPassword {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = { email?: string; url?: string };
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * @description Reset user password with a code (resetToken)
   * @tags Authentication
   * @name ResetPassword
   * @request POST:/auth/reset-password
   * @secure
   */
  export namespace ResetPassword {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = { code: string; password: string; passwordConfirmation: string };
    export type RequestHeaders = {};
    export type ResponseBody = any;
  }
  /**
   * @description Validate a user account
   * @tags Authentication
   * @name EmailConfirmationList
   * @request GET:/auth/email-confirmation
   * @secure
   */
  export namespace EmailConfirmationList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = { foo?: string };
  }
  /**
   * @description Send a confirmation email to user
   * @tags UsersPermissions - User
   * @name SendEmailConfirmationCreate
   * @request POST:/auth/send-email-confirmation
   * @secure
   */
  export namespace SendEmailConfirmationCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = { email: string };
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
}

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  private instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;

  constructor({ securityWorker, secure, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://localhost:1337" });
    this.secure = secure;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  public request = async <T = any, E = any>({
    secure,
    path,
    type,
    query,
    format = "json",
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: format,
      data: body,
      url: path,
    });
  };
}

/**
 * @title DOCUMENTATION
 * @version 1.0.0
 * @license Apache 2.0 (https://www.apache.org/licenses/LICENSE-2.0.html)
 * @termsOfService YOUR_TERMS_OF_SERVICE_URL
 * @baseUrl http://localhost:1337
 * @externalDocs https://strapi.io/documentation/developer-docs/latest/getting-started/introduction.html
 * @contact TEAM <contact-email@something.io> (mywebsite.io)
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  actualities = {
    /**
     * No description
     *
     * @tags Actuality
     * @name ActualitiesList
     * @request GET:/actualities
     * @secure
     */
    actualitiesList: (
      query?: {
        _limit?: number;
        _sort?: string;
        _start?: number;
        "="?: string;
        _ne?: string;
        _lt?: string;
        _lte?: string;
        _gt?: string;
        _gte?: string;
        _contains?: string;
        _containss?: string;
        _in?: string[];
        _nin?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<Actuality[], Error>({
        path: `/actualities`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new record
     *
     * @tags Actuality
     * @name ActualitiesCreate
     * @request POST:/actualities
     * @secure
     */
    actualitiesCreate: (data: NewActuality, params: RequestParams = {}) =>
      this.request<Actuality, Error>({
        path: `/actualities`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Actuality
     * @name CountList
     * @request GET:/actualities/count
     * @secure
     */
    countList: (params: RequestParams = {}) =>
      this.request<{ count?: number }, Error>({
        path: `/actualities/count`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Actuality
     * @name ActualitiesDetail
     * @request GET:/actualities/{id}
     * @secure
     */
    actualitiesDetail: (id: string, params: RequestParams = {}) =>
      this.request<Actuality, Error>({
        path: `/actualities/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update a record
     *
     * @tags Actuality
     * @name ActualitiesUpdate
     * @request PUT:/actualities/{id}
     * @secure
     */
    actualitiesUpdate: (id: string, data: NewActuality, params: RequestParams = {}) =>
      this.request<Actuality, Error>({
        path: `/actualities/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a record
     *
     * @tags Actuality
     * @name ActualitiesDelete
     * @request DELETE:/actualities/{id}
     * @secure
     */
    actualitiesDelete: (id: string, params: RequestParams = {}) =>
      this.request<number, Error>({
        path: `/actualities/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  disponibilities = {
    /**
     * No description
     *
     * @tags Disponibility
     * @name DisponibilitiesList
     * @request GET:/disponibilities
     * @secure
     */
    disponibilitiesList: (
      query?: {
        _limit?: number;
        _sort?: string;
        _start?: number;
        "="?: string;
        _ne?: string;
        _lt?: string;
        _lte?: string;
        _gt?: string;
        _gte?: string;
        _contains?: string;
        _containss?: string;
        _in?: string[];
        _nin?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<Disponibility[], Error>({
        path: `/disponibilities`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new record
     *
     * @tags Disponibility
     * @name DisponibilitiesCreate
     * @request POST:/disponibilities
     * @secure
     */
    disponibilitiesCreate: (data: NewDisponibility, params: RequestParams = {}) =>
      this.request<Disponibility, Error>({
        path: `/disponibilities`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Disponibility
     * @name CountList
     * @request GET:/disponibilities/count
     * @secure
     */
    countList: (params: RequestParams = {}) =>
      this.request<{ count?: number }, Error>({
        path: `/disponibilities/count`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Disponibility
     * @name DisponibilitiesDetail
     * @request GET:/disponibilities/{id}
     * @secure
     */
    disponibilitiesDetail: (id: string, params: RequestParams = {}) =>
      this.request<Disponibility, Error>({
        path: `/disponibilities/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update a record
     *
     * @tags Disponibility
     * @name DisponibilitiesUpdate
     * @request PUT:/disponibilities/{id}
     * @secure
     */
    disponibilitiesUpdate: (id: string, data: NewDisponibility, params: RequestParams = {}) =>
      this.request<Disponibility, Error>({
        path: `/disponibilities/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a record
     *
     * @tags Disponibility
     * @name DisponibilitiesDelete
     * @request DELETE:/disponibilities/{id}
     * @secure
     */
    disponibilitiesDelete: (id: string, params: RequestParams = {}) =>
      this.request<Disponibility, Error>({
        path: `/disponibilities/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  bulk = {
    /**
     * @description Create a new record
     *
     * @tags Disponibility
     * @name DisponibilitiesCreate
     * @request POST:/bulk/disponibilities
     * @secure
     */
    disponibilitiesCreate: (data: Disponibility[], params: RequestParams = {}) =>
      this.request<Disponibility[], Error>({
        path: `/bulk/disponibilities`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  espaces = {
    /**
     * @description Get places related to current user
     *
     * @tags Espace
     * @name MyPlaces
     * @request GET:/espaces/me
     * @secure
     */
    myPlaces: (params: RequestParams = {}) =>
      this.request<Espace[], Error>({
        path: `/espaces/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get list of cities
     *
     * @tags Espace
     * @name CitiesList
     * @request GET:/espaces/cities
     * @secure
     */
    citiesList: (params: RequestParams = {}) =>
      this.request<{ foo?: string }, Error>({
        path: `/espaces/cities`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Espace
     * @name EspacesList
     * @request GET:/espaces
     * @secure
     */
    espacesList: (
      query?: {
        _limit?: number;
        _sort?: string;
        _start?: number;
        "="?: string;
        _ne?: string;
        _lt?: string;
        _lte?: string;
        _gt?: string;
        _gte?: string;
        _contains?: string;
        _containss?: string;
        _in?: string[];
        _nin?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<Espace[], Error>({
        path: `/espaces`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new record
     *
     * @tags Espace
     * @name EspacesCreate
     * @request POST:/espaces
     * @secure
     */
    espacesCreate: (data: object, params: RequestParams = {}) =>
      this.request<Espace, Error>({
        path: `/espaces`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Espace
     * @name CountList
     * @request GET:/espaces/count
     * @secure
     */
    countList: (
      query?: {
        _limit?: number;
        _sort?: string;
        _start?: number;
        "="?: string;
        _ne?: string;
        _lt?: string;
        _lte?: string;
        _gt?: string;
        _gte?: string;
        _contains?: string;
        _containss?: string;
        _in?: string[];
        _nin?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<{ count?: number }, Error>({
        path: `/espaces/count`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Espace
     * @name EspacesDetail
     * @request GET:/espaces/{id}
     * @secure
     */
    espacesDetail: (id: string, params: RequestParams = {}) =>
      this.request<Espace, Error>({
        path: `/espaces/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update a record
     *
     * @tags Espace
     * @name EspacesUpdate
     * @request PUT:/espaces/{id}
     * @secure
     */
    espacesUpdate: (id: string, data: object, params: RequestParams = {}) =>
      this.request<Espace, Error>({
        path: `/espaces/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a record
     *
     * @tags Espace
     * @name EspacesDelete
     * @request DELETE:/espaces/{id}
     * @secure
     */
    espacesDelete: (id: string, params: RequestParams = {}) =>
      this.request<number, Error>({
        path: `/espaces/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  homeCarousel = {
    /**
     * @description Find all the home-carousel's records
     *
     * @tags Home-carousel
     * @name HomeCarouselList
     * @request GET:/home-carousel
     * @secure
     */
    homeCarouselList: (
      query?: {
        _limit?: number;
        _sort?: string;
        _start?: number;
        "="?: string;
        _ne?: string;
        _lt?: string;
        _lte?: string;
        _gt?: string;
        _gte?: string;
        _contains?: string;
        _containss?: string;
        _in?: string[];
        _nin?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<HomeCarousel, Error>({
        path: `/home-carousel`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update a single home-carousel record
     *
     * @tags Home-carousel
     * @name HomeCarouselUpdate
     * @request PUT:/home-carousel
     * @secure
     */
    homeCarouselUpdate: (data: NewHomeCarousel, params: RequestParams = {}) =>
      this.request<{ foo?: string }, Error>({
        path: `/home-carousel`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a single home-carousel record
     *
     * @tags Home-carousel
     * @name HomeCarouselDelete
     * @request DELETE:/home-carousel
     * @secure
     */
    homeCarouselDelete: (params: RequestParams = {}) =>
      this.request<number, Error>({
        path: `/home-carousel`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  messages = {
    /**
     * No description
     *
     * @tags Message
     * @name MessagesList
     * @request GET:/messages
     * @secure
     */
    messagesList: (
      query?: {
        _limit?: number;
        _sort?: string;
        _start?: number;
        "="?: string;
        _ne?: string;
        _lt?: string;
        _lte?: string;
        _gt?: string;
        _gte?: string;
        _contains?: string;
        _containss?: string;
        _in?: string[];
        _nin?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<Message[], Error>({
        path: `/messages`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new record
     *
     * @tags Message
     * @name MessagesCreate
     * @request POST:/messages
     * @secure
     */
    messagesCreate: (data: NewMessage, params: RequestParams = {}) =>
      this.request<Message, Error>({
        path: `/messages`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Message
     * @name CountList
     * @request GET:/messages/count
     * @secure
     */
    countList: (params: RequestParams = {}) =>
      this.request<{ count?: number }, Error>({
        path: `/messages/count`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Message
     * @name MessagesDetail
     * @request GET:/messages/{id}
     * @secure
     */
    messagesDetail: (id: string, params: RequestParams = {}) =>
      this.request<Message, Error>({
        path: `/messages/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update a record
     *
     * @tags Message
     * @name MessagesUpdate
     * @request PUT:/messages/{id}
     * @secure
     */
    messagesUpdate: (id: string, data: NewMessage, params: RequestParams = {}) =>
      this.request<Message, Error>({
        path: `/messages/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a record
     *
     * @tags Message
     * @name MessagesDelete
     * @request DELETE:/messages/{id}
     * @secure
     */
    messagesDelete: (id: string, params: RequestParams = {}) =>
      this.request<number, Error>({
        path: `/messages/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  pages = {
    /**
     * No description
     *
     * @tags Page
     * @name PagesList
     * @request GET:/pages
     * @secure
     */
    pagesList: (
      query?: {
        _limit?: number;
        _sort?: string;
        _start?: number;
        "="?: string;
        _ne?: string;
        _lt?: string;
        _lte?: string;
        _gt?: string;
        _gte?: string;
        _contains?: string;
        _containss?: string;
        _in?: string[];
        _nin?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<Page[], Error>({
        path: `/pages`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new record
     *
     * @tags Page
     * @name PagesCreate
     * @request POST:/pages
     * @secure
     */
    pagesCreate: (data: NewPage, params: RequestParams = {}) =>
      this.request<Page, Error>({
        path: `/pages`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Page
     * @name CountList
     * @request GET:/pages/count
     * @secure
     */
    countList: (params: RequestParams = {}) =>
      this.request<{ count?: number }, Error>({
        path: `/pages/count`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Page
     * @name PagesDetail
     * @request GET:/pages/{url}
     * @secure
     */
    pagesDetail: (url: string, params: RequestParams = {}) =>
      this.request<Page, Error>({
        path: `/pages/${url}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update a record
     *
     * @tags Page
     * @name PagesUpdate
     * @request PUT:/pages/{id}
     * @secure
     */
    pagesUpdate: (id: string, data: NewPage, params: RequestParams = {}) =>
      this.request<Page, Error>({
        path: `/pages/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a record
     *
     * @tags Page
     * @name PagesDelete
     * @request DELETE:/pages/{id}
     * @secure
     */
    pagesDelete: (id: string, params: RequestParams = {}) =>
      this.request<number, Error>({
        path: `/pages/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  email = {
    /**
     * @description Send an email
     *
     * @tags Email - Email
     * @name EmailCreate
     * @request POST:/email/
     * @secure
     */
    emailCreate: (data: { foo?: string }, params: RequestParams = {}) =>
      this.request<{ foo?: string }, Error>({
        path: `/email/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Send an test email
     *
     * @tags Email - Email
     * @name TestCreate
     * @request POST:/email/test
     * @secure
     */
    testCreate: (data: { foo?: string }, params: RequestParams = {}) =>
      this.request<{ foo?: string }, Error>({
        path: `/email/test`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get the email settings
     *
     * @tags Email - Email
     * @name SettingsList
     * @request GET:/email/settings
     * @secure
     */
    settingsList: (params: RequestParams = {}) =>
      this.request<{ foo?: string }, Error>({
        path: `/email/settings`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  upload = {
    /**
     * @description Upload one or multiple files
     *
     * @tags Upload - File
     * @name UploadCreate
     * @request POST:/upload/
     * @secure
     */
    uploadCreate: (data: object, params: RequestParams = {}) =>
      this.request<
        {
          name?: string;
          hash?: string;
          sha256?: string;
          ext?: string;
          mime?: string;
          size?: number;
          url?: string;
          provider?: string;
          related?: string[];
        }[],
        Error
      >({
        path: `/upload/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve the total number of uploaded files
     *
     * @tags Upload - File
     * @name FilesCountList
     * @request GET:/upload/files/count
     * @secure
     */
    filesCountList: (params: RequestParams = {}) =>
      this.request<{ count?: number }, Error>({
        path: `/upload/files/count`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve all file documents
     *
     * @tags Upload - File
     * @name FilesList
     * @request GET:/upload/files
     * @secure
     */
    filesList: (params: RequestParams = {}) =>
      this.request<UploadFile[], Error>({
        path: `/upload/files`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve a single file depending on its id
     *
     * @tags Upload - File
     * @name FilesDetail
     * @request GET:/upload/files/{id}
     * @secure
     */
    filesDetail: (id: string, params: RequestParams = {}) =>
      this.request<UploadFile, Error>({
        path: `/upload/files/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete an uploaded file
     *
     * @tags Upload - File
     * @name FilesDelete
     * @request DELETE:/upload/files/{id}
     * @secure
     */
    filesDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/upload/files/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Search for an uploaded file
     *
     * @tags Upload - File
     * @name SearchDetail
     * @request GET:/upload/search/{id}
     * @secure
     */
    searchDetail: (id: string, params: RequestParams = {}) =>
      this.request<UploadFile[], Error>({
        path: `/upload/search/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * @description Update current user
     *
     * @tags Unclassified
     * @name PutUsers
     * @request PUT:/users/me
     * @secure
     */
    putUsers: (data: { foo?: string }, params: RequestParams = {}) =>
      this.request<{ foo?: string }, Error>({
        path: `/users/me`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve the logged in user information
     *
     * @tags UsersPermissions - User
     * @name GetUsers
     * @request GET:/users/me
     * @secure
     */
    getUsers: (params: RequestParams = {}) =>
      this.request<UsersPermissionsUser, Error>({
        path: `/users/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve all user documents
     *
     * @tags UsersPermissions - User
     * @name UsersList
     * @request GET:/users
     * @secure
     */
    usersList: (
      query?: {
        _limit?: number;
        _sort?: string;
        _start?: number;
        "="?: string;
        _ne?: string;
        _lt?: string;
        _lte?: string;
        _gt?: string;
        _gte?: string;
        _contains?: string;
        _containss?: string;
        _in?: string[];
        _nin?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<UsersPermissionsUser[], Error>({
        path: `/users`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve a single user depending on his id
     *
     * @tags UsersPermissions - User
     * @name UsersDetail
     * @request GET:/users/{id}
     * @secure
     */
    usersDetail: (id: string, params: RequestParams = {}) =>
      this.request<UsersPermissionsUser, Error>({
        path: `/users/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update an existing user
     *
     * @tags UsersPermissions - User
     * @name UsersUpdate
     * @request PUT:/users/{id}
     * @secure
     */
    usersUpdate: (id: string, data: NewUsersPermissionsUser, params: RequestParams = {}) =>
      this.request<UsersPermissionsUser, Error>({
        path: `/users/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete an existing user
     *
     * @tags UsersPermissions - User
     * @name UsersDelete
     * @request DELETE:/users/{id}
     * @secure
     */
    usersDelete: (id: string, params: RequestParams = {}) =>
      this.request<{ foo?: string }, Error>({
        path: `/users/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  usersPermissions = {
    /**
     * @description Retrieve a role depending on its id
     *
     * @tags UsersPermissions - Role
     * @name RolesDetail
     * @request GET:/users-permissions/roles/{id}
     * @secure
     */
    rolesDetail: (id: string, params: RequestParams = {}) =>
      this.request<UsersPermissionsRole, Error>({
        path: `/users-permissions/roles/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieve all role documents
     *
     * @tags UsersPermissions - Role
     * @name RolesList
     * @request GET:/users-permissions/roles
     * @secure
     */
    rolesList: (
      query?: {
        _limit?: number;
        _sort?: string;
        _start?: number;
        "="?: string;
        _ne?: string;
        _lt?: string;
        _lte?: string;
        _gt?: string;
        _gte?: string;
        _contains?: string;
        _containss?: string;
        _in?: string[];
        _nin?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<UsersPermissionsRole[], Error>({
        path: `/users-permissions/roles`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Create a new role
     *
     * @tags UsersPermissions - Role
     * @name RolesCreate
     * @request POST:/users-permissions/roles
     * @secure
     */
    rolesCreate: (data: NewUsersPermissionsRole, params: RequestParams = {}) =>
      this.request<UsersPermissionsRole, Error>({
        path: `/users-permissions/roles`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Update a role
     *
     * @tags UsersPermissions - Role
     * @name RolesUpdate
     * @request PUT:/users-permissions/roles/{role}
     * @secure
     */
    rolesUpdate: (role: string, data: NewUsersPermissionsRole, params: RequestParams = {}) =>
      this.request<UsersPermissionsRole, Error>({
        path: `/users-permissions/roles/${role}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Delete a role
     *
     * @tags UsersPermissions - Role
     * @name RolesDelete
     * @request DELETE:/users-permissions/roles/{role}
     * @secure
     */
    rolesDelete: (role: string, params: RequestParams = {}) =>
      this.request<{ foo?: string }, Error>({
        path: `/users-permissions/roles/${role}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Search for users
     *
     * @tags UsersPermissions - User
     * @name SearchDetail
     * @summary Retrieve a list of users by searching for their username or email
     * @request GET:/users-permissions/search/{id}
     * @secure
     */
    searchDetail: (id: string, params: RequestParams = {}) =>
      this.request<UsersPermissionsUser[], Error>({
        path: `/users-permissions/search/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  connect = {
    /**
     * @description Connect a provider
     *
     * @tags Authentication
     * @name GetConnect
     * @summary Authenticate your user with a custom provider
     * @request GET:/connect/*
     * @secure
     */
    getConnect: (provider: string, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/connect/*`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  auth = {
    /**
     * @description Login a user using the identifiers email and password
     *
     * @tags Authentication
     * @name Login
     * @request POST:/auth/local
     * @secure
     */
    login: (data: { identifier: string; password: string }, params: RequestParams = {}) =>
      this.request<any, Error>({
        path: `/auth/local`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Register a new user with the default role
     *
     * @tags Authentication
     * @name Signup
     * @request POST:/auth/local/register
     * @secure
     */
    signup: (data: { username: string; email: string; password: string }, params: RequestParams = {}) =>
      this.request<any, Error>({
        path: `/auth/local/register`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Successfull redirection after approving a provider
     *
     * @tags Authentication
     * @name CallbackDetail
     * @request GET:/auth/{provider}/callback
     * @secure
     */
    callbackDetail: (provider: string, params: RequestParams = {}) =>
      this.request<any, Error>({
        path: `/auth/${provider}/callback`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Send the reset password email link
     *
     * @tags Authentication
     * @name ForgotPassword
     * @summary Send an email to reset your password
     * @request POST:/auth/forgot-password
     * @secure
     */
    forgotPassword: (data: { email?: string; url?: string }, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/auth/forgot-password`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Reset user password with a code (resetToken)
     *
     * @tags Authentication
     * @name ResetPassword
     * @request POST:/auth/reset-password
     * @secure
     */
    resetPassword: (
      data: { code: string; password: string; passwordConfirmation: string },
      params: RequestParams = {},
    ) =>
      this.request<any, Error>({
        path: `/auth/reset-password`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Validate a user account
     *
     * @tags Authentication
     * @name EmailConfirmationList
     * @request GET:/auth/email-confirmation
     * @secure
     */
    emailConfirmationList: (params: RequestParams = {}) =>
      this.request<{ foo?: string }, Error>({
        path: `/auth/email-confirmation`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Send a confirmation email to user
     *
     * @tags UsersPermissions - User
     * @name SendEmailConfirmationCreate
     * @request POST:/auth/send-email-confirmation
     * @secure
     */
    sendEmailConfirmationCreate: (data: { email: string }, params: RequestParams = {}) =>
      this.request<void, Error>({
        path: `/auth/send-email-confirmation`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
