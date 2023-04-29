{
    function* generatorOne() {
        let counter = 0;
        while (true) {
            yield counter++;
        }
    }

    var iterator = generatorOne();
    console.log(iterator.next().value); // 0
    console.log(iterator.next().value); // 1
    console.log(iterator.next().value); // 2

}


{
    // You can do the same with a class:

    class Counter implements Iterator<number> {
        private counter = 0;

        public next(): IteratorResult<number> {
            return {
                done: false,
                value: this.counter++
            }
        }
    }

    let c = new Counter();
    console.log(c.next().value); // 0
    console.log(c.next().value); // 1
    console.log(c.next().value); // 2
}


{
    // The first solution with the generator works well with the for/of loop:

    function* generator() {
        let counter = 0;
        while (counter < 5) {
            yield counter++;
        }
    }
    for (let i of generator()) console.log(i);

    // Prints 0 to 5, however, to do that with an instance you'll need to do:

    class Counter implements Iterable<number> {
        private counter = 0;

        public [Symbol.iterator]() {
            return {
                next: () => {
                    return {
                        done: this.counter === 6,
                        value: this.counter++
                    }
                }
            }
        }
    }
    let c = new Counter();
    for (let i of c) console.log(i);
}