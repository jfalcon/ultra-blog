// don't use ? since we want to be explicit via nulls for this, also
// in strict mode, strings cannot be undefined or null by default
export interface UserInfo {
  createdAt: Date;
  email: string;
  emailVerified: boolean;
  id: string;
  image: string | null;
  name: string;
  updatedAt: Date;
}
