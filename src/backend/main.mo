import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";


import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";


actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type VVIPPartnerId = Nat;

  public type VVIPPartnerProfile = {
    principal : Principal;
    fullName : Text;
    phone : Text;
    businessName : Text;
    registrationTime : Time.Time;
    isActive : Bool;
  };

  public type OrderStatus = {
    status : Text;
    timestamp : Int;
  };

  public type UserProfile = {
    name : Text;
  };

  public type Order = {
    id : Nat;
    clientName : Text;
    itemsSummary : Text;
    status : Text;
    statusMessage : Text;
    vehicleNumber : Text;
    createdAt : Int;
    updatedAt : Int;
    isArchived : Bool;
  };

  public type VisitRecord = {
    id : Nat;
    timestamp : Int;
    city : Text;
    page : Text;
  };

  var visitCounter = 0;

  var nextOrderId = 0;

  var nextVVIPPartnerId = 0;

  let orders = Map.empty<Nat, Order>();
  let visits = Map.empty<Nat, VisitRecord>();
  let vvipPartners = Map.empty<VVIPPartnerId, VVIPPartnerProfile>();
  let vvipPartnerPrincipalLookup = Map.empty<Principal, VVIPPartnerId>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var currentStatus = "Ordered";
  let statusHistory = List.empty<OrderStatus>();

  let greeting = "Hello, World! Welcome to Fruit & Vegetable Delivery Service";

  public query ({ caller }) func getGreeting() : async Text {
    greeting;
  };

  public shared ({ caller }) func registerVVIPPartner(fullName : Text, phone : Text, businessName : Text) : async VVIPPartnerId {
    if (caller.isAnonymous()) {
      Runtime.trap("Anonymous principals cannot register as VVIP Partners");
    };

    if (fullName == "" or phone == "" or businessName == "") {
      Runtime.trap("Missing user data. Please provide full name, phone, and business name");
    };

    if (vvipPartnerPrincipalLookup.containsKey(caller)) {
      Runtime.trap("You are already registered as a VVIP Partner");
    };

    let registrationTime = Time.now();

    let vvipPartnerId = nextVVIPPartnerId;
    nextVVIPPartnerId += 1;

    let newProfile : VVIPPartnerProfile = {
      principal = caller;
      fullName;
      phone;
      businessName;
      registrationTime;
      isActive = true;
    };

    vvipPartners.add(vvipPartnerId, newProfile);
    vvipPartnerPrincipalLookup.add(caller, vvipPartnerId);

    let userProfile : UserProfile = {
      name = fullName;
    };
    userProfiles.add(caller, userProfile);

    vvipPartnerId;
  };

  public query ({ caller }) func getVVIPPartnerProfile() : async ?VVIPPartnerProfile {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot access VVIP Partner profiles");
    };

    switch (vvipPartnerPrincipalLookup.get(caller)) {
      case (null) { null };
      case (?vvipPartnerId) {
        vvipPartners.get(vvipPartnerId);
      };
    };
  };

  public query ({ caller }) func getAllVVIPPartners() : async [VVIPPartnerProfile] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all VVIP Partners");
    };

    vvipPartners.values().toArray();
  };

  public query ({ caller }) func isVVIPPartner() : async Bool {
    let hasCallerAsVVIPPartner = vvipPartnerPrincipalLookup.containsKey(caller);
    hasCallerAsVVIPPartner;
  };

  public shared ({ caller }) func setStatus(status : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    let timestamp = Time.now();
    let statusUpdate : OrderStatus = {
      status;
      timestamp;
    };
    statusHistory.add(statusUpdate);
    currentStatus := status;
  };

  public query ({ caller }) func getStatus() : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view order status");
    };
    currentStatus;
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getOrdersCount() : async Nat {
    orders.size();
  };

  public query ({ caller }) func getStatusHistory() : async [OrderStatus] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view order status history");
    };
    statusHistory.reverse().toArray();
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func clearHistory() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can clear order history");
    };
    currentStatus := "Ordered";
    statusHistory.clear();
  };

  public shared ({ caller }) func createOrder(clientName : Text, itemsSummary : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create orders");
    };
    let orderId = nextOrderId;
    let newOrder : Order = {
      id = orderId;
      clientName;
      itemsSummary;
      status = "Pending";
      statusMessage = "Order pending confirmation";
      vehicleNumber = "";
      createdAt = Time.now();
      updatedAt = Time.now();
      isArchived = false;
    };
    orders.add(orderId, newOrder);
    nextOrderId += 1;
    orderId;
  };

  public shared ({ caller }) func confirmOrder(id : Nat) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update orders");
    };
    updateOrder(id, "Confirmed", "Order confirmed", "", false);
  };

  public shared ({ caller }) func startSourcing(id : Nat) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update orders");
    };
    updateOrder(id, "Sourcing", "Picking fresh stock", "", false);
  };

  public shared ({ caller }) func dispatchOrder(id : Nat, vehicleNumber : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update orders");
    };
    updateOrder(id, "Out for Delivery", "Out for delivery in vehicle " # vehicleNumber, vehicleNumber, false);
  };

  public shared ({ caller }) func deliverOrder(id : Nat) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update orders");
    };
    updateOrder(id, "Delivered", "Delivered successfully", "", true);
  };

  public query ({ caller }) func getActiveOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view orders");
    };

    orders.values().toArray().filter(func(order) { not order.isArchived });
  };

  public query ({ caller }) func getArchivedOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view orders");
    };
    orders.values().toArray().filter(func(order) { order.isArchived });
  };

  public query ({ caller }) func getOrder(id : Nat) : async ?Order {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view orders");
    };
    orders.get(id);
  };

  func updateOrder(id : Nat, newStatus : Text, newStatusMessage : Text, vehicleNumber : Text, isArchived : Bool) : Bool {
    switch (orders.get(id)) {
      case (null) { false };
      case (?order) {
        let updatedOrder : Order = {
          order with
          status = newStatus;
          statusMessage = newStatusMessage;
          vehicleNumber;
          updatedAt = Time.now();
          isArchived;
        };
        orders.add(id, updatedOrder);
        true;
      };
    };
  };

  public type VisitorStats = {
    totalVisits : Nat;
    todayVisits : Nat;
    weekVisits : Nat;
    noidaGhaziabadVisits : Nat;
    otherCityVisits : Nat;
  };

  public type DailyReport = {
    date : Text;
    count : Nat;
  };

  public shared ({ caller }) func logVisit(city : Text, page : Text) : async () {
    let id = visitCounter;
    let timestamp = Time.now();

    let visit : VisitRecord = {
      id;
      timestamp;
      city;
      page;
    };

    visits.add(id, visit);
    visitCounter += 1;
  };

  public query ({ caller }) func getVisitorStats() : async VisitorStats {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view visitor stats");
    };

    let allVisits = visits.values().toArray();

    let currentTime = Time.now();
    let dayNanos = 86_400_000_000_000;
    let weekNanos = dayNanos * 7;

    let todayVisits = allVisits.filter(
      func(visit) {
        return (currentTime - visit.timestamp) < dayNanos;
      }
    ).size();

    let weekVisits = allVisits.filter(
      func(visit) {
        return (currentTime - visit.timestamp) < weekNanos;
      }
    ).size();

    let noidaGhaziabadVisits = allVisits.filter(
      func(visit) {
        return visit.city.contains(#text("Noida")) or visit.city.contains(#text("Ghaziabad"));
      }
    ).size();

    let totalVisits = allVisits.size();
    let otherCityVisits = totalVisits - noidaGhaziabadVisits;

    {
      totalVisits;
      todayVisits;
      weekVisits;
      noidaGhaziabadVisits;
      otherCityVisits;
    };
  };

  public query ({ caller }) func getDailyReport() : async [DailyReport] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view daily report");
    };

    let allVisits = visits.values().toArray();

    let currentTime = Time.now();
    let dayNanos = 86_400_000_000_000;

    let dayRanges = Nat.range(0, 30);
    let reports = dayRanges.map(
      func(dayOffset) {
        let dayTimestamp = currentTime - (dayOffset * dayNanos);

        let count = allVisits.filter(
          func(visit) {
            let daysAgo = Int.abs((currentTime - visit.timestamp) / dayNanos);
            daysAgo == dayOffset;
          }
        ).size();

        let report : DailyReport = {
          date = "Day " # dayOffset.toText();
          count;
        };

        report;
      }
    );

    reports.toArray();
  };
};
