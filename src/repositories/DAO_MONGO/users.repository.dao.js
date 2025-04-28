import { userModel } from "../models/users.model.js";

class UsersRepository {
    constructor() {
        this.userModel = userModel
    }
    createUser = async ({ userData }) => {
        try {
            return await userModel.create(userData);
        } catch (error) {
            throw new Error(`Error creando usuario: ${error.message}`);
        }
    }
    findById = async (id) => {
        try {
            return await this.userModel.findById(id);
        } catch (error) {
            throw new Error(`Error buscando usuario por ID: ${error.message}`);
        }
    }
    findByEmail = async (email) => {
        try {
            return await this.userModel.findOne({ email });
        } catch (error) {
            throw new Error(`Error buscando usuario por email: ${error.message}`);
        }
    }
}

export { UsersRepository }