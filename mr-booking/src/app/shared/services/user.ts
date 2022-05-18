export interface User {
  uid: string;
  email: string | null;
  city?: string;
  displayName?:string;
  photoURL?: string | null;
  emailVerified: boolean;
}
