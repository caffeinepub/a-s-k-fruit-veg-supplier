import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface OrderStatus {
    status: string;
    timestamp: bigint;
}
export type Time = bigint;
export type VVIPPartnerId = bigint;
export interface VVIPPartnerProfile {
    principal: Principal;
    businessName: string;
    fullName: string;
    isActive: boolean;
    phone: string;
    registrationTime: Time;
}
export interface Order {
    id: bigint;
    status: string;
    itemsSummary: string;
    clientName: string;
    vehicleNumber: string;
    createdAt: bigint;
    isArchived: boolean;
    updatedAt: bigint;
    statusMessage: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearHistory(): Promise<void>;
    confirmOrder(id: bigint): Promise<boolean>;
    createOrder(clientName: string, itemsSummary: string): Promise<bigint>;
    deliverOrder(id: bigint): Promise<boolean>;
    dispatchOrder(id: bigint, vehicleNumber: string): Promise<boolean>;
    getActiveOrders(): Promise<Array<Order>>;
    getAllVVIPPartners(): Promise<Array<VVIPPartnerProfile>>;
    getArchivedOrders(): Promise<Array<Order>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getGreeting(): Promise<string>;
    getOrder(id: bigint): Promise<Order | null>;
    getOrdersCount(): Promise<bigint>;
    getStatus(): Promise<string>;
    getStatusHistory(): Promise<Array<OrderStatus>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getVVIPPartnerProfile(): Promise<VVIPPartnerProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isVVIPPartner(): Promise<boolean>;
    registerVVIPPartner(fullName: string, phone: string, businessName: string): Promise<VVIPPartnerId>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setStatus(status: string): Promise<void>;
    startSourcing(id: bigint): Promise<boolean>;
}
