import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";
import User from "../models/User";

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}
class AuthenticateUserService {
  public async execute({email, password}:Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({where: {email}});

    if(!user){
      throw new Error("Incorrect email/password combination.");
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }
    
    const token = sign({}, 'f9ba2aaaddd8407f9fd15823d6522ebc', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    }
  }
}

export default AuthenticateUserService;