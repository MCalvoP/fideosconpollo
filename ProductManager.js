import {promises as fs} from 'fs'

class ProductManager {
    constructor(){
        this.patch = './productos.txt'
        this.products = []
    }

    static id = 0

    addProduct = async (title, description, price, img, code, stock) => {
       
        ProductManager.id++

        let newProduct = {
            title,
            description,
            price,
            img,
            code,
            stock,
            id : ProductManager.id
        }

        if (!newProduct.title || newProduct.title === ""){
            return console.error("Faltan datos")
        }
        if (!newProduct.description || newProduct.description === ""){
            return console.error("Faltan datos")
        }
        if (!newProduct.price || newProduct.price === ""){
            return console.error("Faltan datos")
        }
        if (!newProduct.code || newProduct.code === ""){
            return console.error("Faltan datos")
        }
        if (!newProduct.stock || newProduct.stock === ""){
            return console.error("Faltan datos")
        }
        if(this.products.find(newProduct => newProduct.code == newProduct.code)){
            return "Producto existente"
        } 

        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products))
    }

    readProducts = async () =>{
        let respuesta = await fs.readFile(this.patch, 'utf-8')
        return JSON.parse(respuesta)
    }
    

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2);
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        if (!respuesta3.find(product => product.id === id)){
            console.log('Producto no encontrado ');
        }else{
            console.log(respuesta3.find(product => product.id === id));
        }
    }

     deleteProductById = async (id) =>{
         let respuesta3 = await this.readProducts()
         let productFilter = respuesta3.filter(products => products.id != id)
         await fs.writeFile(this.patch, JSON.stringify(productFilter))
         console.log("Producto eliminado");
     }
 


}

const productos = new ProductManager

productos.addProduct("Arroz", "Arroz", 200, "imagen1", "A01", 10);
productos.addProduct("Fideos", "Fideos", 200, "imagen2", "F01", 15);
productos.addProduct("Pollo", "Pollo", 350, "imagen3", "P01", 8);
productos.addProduct("Carne", "Carne", 400, "imagen4", "C01", 6);




productos.getProducts()

// productos.getProductsById(2)

// productos.deleteProductById(1)