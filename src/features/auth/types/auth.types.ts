export type UserRole = "SUPER_ADMIN" | "ADMIN" | "STAFF";

export interface UserPermission {
  readonly moduleName: string;
  readonly level: "none" | "view" | "edit";
}

export interface AuthUserData {
  readonly id: string;
  readonly username: string;
  readonly fullName: string;
  readonly email: string;
  readonly role: UserRole;
  readonly isActive: boolean;
  readonly permissions?: Record<string, "none" | "view" | "edit">;
}

export interface LoginRequest {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponseDto {
  readonly success: boolean;
  readonly message: string;
  readonly data: {
    readonly user: AuthUserData;
    readonly requiresPasswordChange: boolean;
    readonly requires2FA: boolean;
    readonly tempToken?: string;
    readonly accessToken?: string;
  };
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
}
