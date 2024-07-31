export {}

class BPlus{

}

class BPlusNode<Key>{
    children:  (BPlusNode<Key> | Key)[];

    constructor(n: number){
        this.children = new Array(n);
    }
}