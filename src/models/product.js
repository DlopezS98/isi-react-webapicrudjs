export default class Product {
    constructor(id, brandId, categoryId, name, unitPrice, active, createdAt) {
        this.id = id;
        this.brandId = brandId;
        this.categoryId = categoryId;
        this.name = name;
        this.unitPrice = unitPrice;
        this.active = active;
        this.createdAt = createdAt;
    }

    static fromJson(json) {
        const id = Number(json['idProducto']) || 0;
        const brandId = Number(json['idMarca']) || 0;
        const categoryId = Number(json['idCategoria']) || 0;
        const name = String(json['nombreProducto'] || '');
        const unitPrice = Number(json['precioUnidad']) || 0;
        const active = Boolean(json['activo']) || false;
        const createdAt = String(json['fechaRegistro'] || '');
        return new Product(id, brandId, categoryId, name, unitPrice, active, createdAt);
    }
}