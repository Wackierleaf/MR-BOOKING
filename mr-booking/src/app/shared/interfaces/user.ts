export interface User {
  uid: string;
  email: string | null;
  city?: string;
  role: string;
  displayName?:string;
  photoURL?: string | null;
  emailVerified: boolean;
}
