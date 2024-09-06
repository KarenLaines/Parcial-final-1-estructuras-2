// Karen Floridalma Laines Pablo
// Carnet 1520722

class Product{
    private codigo: string;
    private nombre: string;
    private precio_costo: number;
    private precio_venta: number;

    constructor(codigo, nombre, precio_costo, precio_venta) {
        this.codigo = codigo
        this.nombre = nombre
        this.precio_costo = precio_costo
        this.precio_venta = precio_venta
    }

    public setCodigo(codigo: string) {
        this.codigo = codigo;
    }

    public getCodigo(): string {
        return this.codigo;
    }

    public setNombre(nombre: string) {
        this.nombre = nombre;
    }

    public getNombre(): string {
        return this.nombre;
    }
    public setPrecioCosto(PrecioCosto: number) {
        this.precio_costo = PrecioCosto;
    }

    public getPrecioCosto(): number {
        return this.precio_costo;
    }
    public setPrecioVenta(precioVenta: number) {
        this.precio_venta = precioVenta;
    }

    public getPrecioVenta(): number {
        return this.precio_venta;
    }

    public toString(): string {
        return `PRODUCTO  con código: ${this.codigo}, Nombre: ${this.nombre}, Precio de Costo ${this.precio_costo} y el precio de venta es ${this.precio_venta}`;
    }
}

class Lnk_Node {
    private data: Product;
    private next!: Lnk_Node;

    constructor(producto:Product){
        this.data = producto;
    }

    public setNext(next:Lnk_Node){
        this.next = next;
    }
    public getNext(){
        return this.next;
    }
    
    public getProducto():Product{
        return this.data;
    }
}

class Hashtable {
private size: number;
private data: Lnk_Node[];

constructor(size:number){
    this.data = new Array(size);
    this.size = size;
}

 //Con el número de caracteres del nombre, respecto al tamaño de la tabla
private hash(key:string):number{
    return key.length % this.size;
}

public insert(producto:Product): void {
    let index:number = this.hash(producto.getNombre())
    if (this.data[index] ==  undefined){
        this.data[index] = new Lnk_Node(producto);
    } else {
        let node: Lnk_Node = this.data[index];
        while (node.getNext()){
            node = node.getNext();
        }
        node.setNext(new Lnk_Node(producto));
    }
}

public search(key:string):Product{
    let index:number = this.hash(key);
    let node = this.data[index];
    while (node){
        if (node.getProducto().getCodigo() == key){
            return node.getProducto();
        }
        node = node.getNext()
    }
    return new Product("No", "registrado", 0, 0 );

    
}

public to_string():string {
    let txt:string = "";
    for (let i = 0; i < this.data.length; i++){
        txt += i+";";
        let node = this.data[i];
        while  (node){
            txt += " " + node.getProducto().toString() + ", ";
            node = node.getNext()
        }
        txt += "\n"
    }
    return txt;

}
}

let tabla:Hashtable = new Hashtable(10);
let producto1 = new Product('P001', "Pepto-Bismol", 50, 65);
let producto2 = new Product('P002', "Acetaminofen", 50, 65); // colision
let producto3 = new Product('P003', "Aspirina", 50, 65);
let producto4 = new Product('P004', "Vitamina c", 50, 65);
let producto5 = new Product('P005', "vitamina d", 50, 65);
let producto6 = new Product('P006', "Virogrip", 50, 65);
let producto7 = new Product('P007', "Dorival en gel", 50, 65);
let producto8 = new Product('P008', "Dorival", 50, 65);
let producto9 = new Product('P009', "Aspirina Forte", 50, 65);
let producto10 = new Product('P010', "Salandrews", 50, 65);

tabla.insert(producto1);
tabla.insert(producto2);
tabla.insert(producto3);
tabla.insert(producto4);
tabla.insert(producto6);
tabla.insert(producto5);
tabla.insert(producto7);
tabla.insert(producto8);
tabla.insert(producto9);
tabla.insert(producto10);
console.log(tabla.toString())
console.log(tabla.search("P001").toString())