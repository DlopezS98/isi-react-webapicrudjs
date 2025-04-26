export default class Brand {
    constructor(id, name, active, createdAt) {
        this.id = id;
        this.name = name;
        this.active = active;
        this.createdAt = createdAt;
    }

    static fromJson(json) {
        const id = Number(json["idMarca"]) || 0;
        const name = String(json["nombreMarca"] || "");
        const active = Boolean(json["activo"] || false);
        const createdAt = new Date(json["fechaRegistro"] || null);
        return new Brand(id, name, active, createdAt);
    }
}


