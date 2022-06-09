function firstElement<Type>(arr: Type[]): Type | undefined {
    return arr[0];
}

const s = firstElement(["a", "b", "c"]);

console.log(s)
