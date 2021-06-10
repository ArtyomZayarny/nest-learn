import { EntityRepository, Repository } from "typeorm";
import { AuthCreadentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";


@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signUp(authCredentialsDto: AuthCreadentialsDto): Promise<void> {
        const {username, password} = authCredentialsDto;

        const user = new User();
        user.unsername = username;
        user.password = password;
        await user.save();
    }

}