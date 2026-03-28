import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export type VVIPPartnerId = bigint;
export interface UserProfile {
    name: string;
}
export interface VVIPPartnerProfile {
    principal: Principal;
    businessName: string;
    fullName: string;
    isActive: boolean;
    phone: string;
    registrationTime: Time;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllVVIPPartners(): Promise<Array<VVIPPartnerProfile>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getGreeting(): Promise<string>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getVVIPPartnerProfile(): Promise<VVIPPartnerProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isVVIPPartner(): Promise<boolean>;
    registerVVIPPartner(fullName: string, phone: string, businessName: string): Promise<VVIPPartnerId>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
