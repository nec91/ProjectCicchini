import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class Container {
  constructor(name) {
    this.fileRoute = join(__dirname, 'db', `${name}.json`);
  }

  async #readFile() {
    try {
      const content = await fs.promises.readFile(this.fileRoute, "utf-8");
      return JSON.parse(content);
    } catch (error) {
      if (error.code === "ENOENT") {
        // Si el archivo no existe, devolvemos un array vacío
        return [];
      }
      throw new Error("Error al leer el archivo");
    }
  }

  async save(object) {
    try {
      const fileContent = await this.#readFile();
      const newId =
        fileContent.length > 0 ? fileContent[fileContent.length - 1].id + 1 : 1;
      const newObject = { ...object, id: newId };
      fileContent.push(newObject);

      await fs.promises.writeFile(
        this.fileRoute,
        JSON.stringify(fileContent, null, 2),
        "utf-8"
      );
      return newId;
    } catch (error) {
      throw new Error("Error al guardar el objeto");
    }
  }

  async getById(id) {
    try {
      const fileContent = await this.#readFile();
      return fileContent.find((item) => item.id === id) || null;
    } catch (error) {
      throw new Error("Error al buscar el elemento");
    }
  }

  async getAll() {
    return await this.#readFile();
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(
        this.fileRoute,
        JSON.stringify([], null, 2),
        "utf-8"
      );
      console.log("Base de datos eliminada correctamente");
    } catch (error) {
      throw new Error("Error al eliminar la base de datos");
    }
  }

  async deleteById(id) {
    try {
      const fileContent = await this.#readFile();
      const updatedContent = fileContent.filter((element) => element.id !== id);

      if (updatedContent.length === fileContent.length) {
        throw new Error("Elemento no encontrado");
      }

      await fs.promises.writeFile(
        this.fileRoute,
        JSON.stringify(updatedContent, null, 2),
        "utf-8"
      );
      console.log("Elemento eliminado correctamente");
    } catch (error) {
      throw new Error("Error al eliminar el elemento");
    }
  }

  async modifyById(id, element) {
    try {
      const fileContent = await this.#readFile();
      const index = fileContent.findIndex((e) => e.id === id);
  
      if (index === -1) {
        throw new Error("Elemento no encontrado");
      }
        // Genera un nuevo timestamp
      const updatedTimestamp = new Date().toLocaleString()

      fileContent[index] = {
        ...fileContent[index],
        ...element,
        timestamp: updatedTimestamp, 
        id, 
      };
        await fs.promises.writeFile(
        this.fileRoute,
        JSON.stringify(fileContent, null, 2),
        "utf-8"
      );
        return "Producto modificado correctamente";
    } catch (error) {
      throw new Error(`Error al modificar el producto: ${error.message}`);
    }
  }

  async saveCart(obj, id) {
    try {
      const fileContent = await this.#readFile();
      const index = fileContent.findIndex((item) => item.id === id);

      if (index === -1) {
        throw new Error("Carrito no encontrado");
      }

      if (!fileContent[index].product) {
        fileContent[index].product = [];
      }

      fileContent[index].product.push(obj);
      await fs.promises.writeFile(
        this.fileRoute,
        JSON.stringify(fileContent, null, 2),
        "utf-8"
      );
      return "Producto agregado al carrito";
    } catch (error) {
      throw new Error("Error al agregar el producto al carrito");
    }
  }
}

export default Container;
