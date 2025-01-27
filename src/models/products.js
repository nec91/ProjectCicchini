class Product {
    constructor(title, description, code, thumbnail, price, stock,category) {
        this.timestamp = new Date().toLocaleString()
        this.title = title || " "
        this.description = description || " "
        this.code = code || " "
        this.price = price || 0
        this.status = true
        this.stock = stock || 0
        this.category = category || " "
        this.thumbnail = thumbnail || " "
    }
}

export default Product