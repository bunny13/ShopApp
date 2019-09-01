class Product {
    constructor(id, ownerId, title, imageUrl, description, price){
        console.log('here');
        this.id = id;
        this.ownerId = ownerId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

}

export default Product;