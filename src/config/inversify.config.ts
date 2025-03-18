import { Container } from "inversify";
import { UserController, UserRepository, UserService } from "../modules/users";
import { ErrorHandlerMiddleware } from "../middlewares";

const container = new Container();

container.bind<UserRepository>("UserRepository").to(UserRepository);
container.bind<UserService>("UserService").to(UserService);
container.bind<UserController>("UserController").to(UserController);

container
  .bind<ErrorHandlerMiddleware>("ErrorHandlerMiddleware")
  .to(ErrorHandlerMiddleware);

export { container };
