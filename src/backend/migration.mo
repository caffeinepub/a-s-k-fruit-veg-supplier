module {
  type OldActor = {};

  type NewActor = {
    greeting : Text;
  };

  public func run(_old : OldActor) : NewActor {
    {
      greeting = "Hello, world! Welcome to fruit and veggie delivery service.";
    };
  };
}
