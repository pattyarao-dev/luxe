
type PermissionObject = string[];


export const PERMISSIONS: Record<string, PermissionObject> = {
  "CLIENT": ['/', '/home'],
  "ADMIN_ALL": ['/', '/home'], 
  "ADMIN": ['/'], 
  "CASHIER": ['/', '/cashier/verify']
};
