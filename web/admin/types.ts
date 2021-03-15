import { Record } from "ra-core";
import { ReactChildren } from "react";

export interface FieldProps<T extends Record = Record> {
  addLabel?: boolean;
  label?: string;
  record?: T;
  source?: string;
  resource?: string;
  basePath?: string;
  formClassName?: string;
}

export interface User extends Record {
  name: string;
  email: string;
}

export interface Project extends Record {
  name: string;
}

export interface ReferenceFieldProps<T extends Record = Record>
  extends FieldProps<T> {
  reference: string;
  children: ReactChildren;
  link?: string | false;
  sortBy?: string;
}
