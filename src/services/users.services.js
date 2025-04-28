import { UsersRepository } from "../repositories/DAO_MONGO/users.repository.dao.js";
import { createHash, isValidPassword, generateJWToken } from "../utils/utils.js";

class UsersService {
    constructor() {
        this.usersRepository = new UsersRepository()
    }

    registerUser = async (userData) => {
        try {
            const exist = await this.usersRepository.findByEmail(userData.email)
            if (exist) {
                throw new Error("El usuario ya existe.")
            }
            userData.password = createHash(userData.password)
            const userCreated = await this.usersRepository.createUser(userData)
            return userCreated
        } catch (error) {
            throw new Error(`Error en el registro de usuario: ${error.message}`);
        }
    }

    loginUser = async (email, password) => {
        try {
            const user = await this.usersRepository.findByEmail(email);
            if (!user) {
                throw new Error("Usuario no encontrado.");
            }

            if (!isValidPassword(user, password)) {
                throw new Error("Credenciales inválidas.");
            }

            const tokenUser = {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                age: user.age,
                role: user.role,
                isAdmin: user.role === "admin",
            };
            const access_token = generateJWToken(tokenUser);
            return access_token;
        } catch (error) {
            throw new Error(`Error en el login de usuario: ${error.message}`);
        }
    };
}

export { UsersService }
