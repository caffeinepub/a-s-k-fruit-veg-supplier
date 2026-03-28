import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Migration "migration";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

(with migration = Migration.run)
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

  public type UserProfile = {
    name : Text;
  };

  var nextVVIPPartnerId = 0;

  let vvipPartners = Map.empty<VVIPPartnerId, VVIPPartnerProfile>();
  let vvipPartnerPrincipalLookup = Map.empty<Principal, VVIPPartnerId>();
  let userProfiles = Map.empty<Principal, UserProfile>();

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

    let iter = vvipPartners.values();
    iter.toArray();
  };

  public query ({ caller }) func isVVIPPartner() : async Bool {
    let hasCallerAsVVIPPartner = vvipPartnerPrincipalLookup.containsKey(caller);
    hasCallerAsVVIPPartner;
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
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
};
