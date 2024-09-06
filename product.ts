// Karen Floridalma Laines Pablo
// Carnet 1520722

export class Product{
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


// Clase LinkedListNode
class LinkedListNode {
    private data: Product;
    private nextNode: LinkedListNode | null;

    constructor(data: Product, nextNode: LinkedListNode | null = null) {
        this.data = data
        this.nextNode = nextNode

    }

    public setData(data: Product) {
        this.data = data;
    }

    public getData(): Product {
        return this.data;
    }

    public setNextNode(nextNode: LinkedListNode | null) {
        this.nextNode = nextNode;
    }

    public getNextNode(): LinkedListNode | null {
        return this.nextNode;
    }
}



// Clase LinkedList
class LinkedList {
    private head: LinkedListNode | null = null;
    private tail: LinkedListNode | null = null;
    private size: number = 0;

    constructor() { }

    // Métodos Getters y Setters --------------------------------------------------------
    public setSize(size: number) {
        this.size = size;
    }

    public getSize(): number {
        return this.size;
    }

    public setHead(head: LinkedListNode) {
        this.head = head;
    }

    public getHead(): LinkedListNode | null {
        return this.head;
    }

    public setTail(tail: LinkedListNode) {
        this.tail = tail;
    }

    public getTail(): LinkedListNode | null {
        return this.tail;
    }

    public isEmpty(): boolean {
        return this.size === 0;
    }
    
    // Método append para la lista enlazada ----------------------------------------
    public append(data:  Product): void {
        const newNode = new LinkedListNode(data);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            if (this.tail) {
                this.tail.setNextNode(newNode);
                this.tail = newNode;
            }
        }
        this.size++;
    }

    public search(codigo: string): Product | null {
        let current = this.head;
        while (current !== null) {
            if (current.getData().getCodigo() === codigo) {
                return current.getData();
            }
            current = current.getNextNode();
        }
        return null;
    }

    public print(): void {
        let current = this.head;
        if (this.isEmpty()) {
            console.log("Vacío");
            return;
        }
        while (current !== null) {
            console.log(current.getData().toString());
            current = current.getNextNode();
        }
    }
}

// Clase HashTable1
class HashTable1 {
    private size: number;
    private data: LinkedList[];

    constructor() {
        this.size = 8;
        this.data = new Array(this.size).fill(null).map(() => new LinkedList()); 
        
    }

// con el número de caracteres del nombre, se le da la posición
    private hash(key:string):number{
    return key.length % this.size;
}

    public insert(producto: Product): void {
        const index = this.hash(producto.getNombre());
        this.data[index].append(producto);

    }

    
        //-------------------------------------------

    public search(key: string): Product | null {
        const index = this.hash(key);
        const list = this.data[index];
        const producto = list.search(key);
        if (producto) {
            console.log('Producto encontrado: ' + producto.getNombre() + ' - ' + producto.getCodigo() + 'Precio Costo: ' + producto.getPrecioCosto() + 'Precio Venta: ' + producto.getPrecioVenta());
        } else {
            console.log('Producto no encontrado');
        }
        return producto;
    }

    public ShowSlots(): void {
        console.log("Tabla Hash:");
        for (let i = 0; i < this.size; i++) {
            console.log(`Slot ${i}:`);
            this.data[i].print();
        }
    }
}


let productos: Product[] = [
    new Product('P001', 'Pepto-Bismol', 50, 65),
    new Product('P002', 'Acetaminofen', 10, 15),
    new Product('P003', 'Aspirina',10, 25),
    new Product('P004', 'Virogrip', 30, 45),
    new Product('P005', 'Salandrews', 50, 55),
    new Product('P006', 'aspirina forte', 15, 25),
    new Product('P007', 'vitamina c', 50, 65),
    new Product('P008', 'Calmadol', 50, 75),
    new Product('P009', 'Dorival en gel', 60, 70),
    new Product('P010', 'Dorival', 60, 85),

];

let miTablaHash = new HashTable1();
productos.forEach(producto => miTablaHash.insert(producto));

// Mostrar todos los slots
miTablaHash.ShowSlots();

// Búsqueda de estudiantes
miTablaHash.search('Acetaminofen');
miTablaHash.search('Aspirina');

