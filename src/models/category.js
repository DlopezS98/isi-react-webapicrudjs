export default class Category {
    constructor(id, name, description, isActive, createdAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.isActive = isActive;
        this.createdAt = createdAt;
    }
    
    static fromJson(json) {
        const id = Number(json["idCategoria"]) || 0;
        const name = String(json["nombre"] || "");
        const description = String(json["descripcion"] || "");
        const isActive = Boolean(json["activo"] || false);
        const createdAt = new Date(json["createdAt"] || null);
        return new Category(id, name, description, isActive, createdAt);
    }
}