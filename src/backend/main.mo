actor {
  public query ({ caller }) func greet(name : Text) : async Text {
    "Hello, " # name # "! Welcome to Fruit & Vegetable Delivery Service.";
  };
};
