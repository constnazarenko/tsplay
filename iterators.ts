interface INumbers {
    [Symbol.iterator]: () => { next: () => { done: boolean; value: number; }; }; 
}

class SequencedNumbers implements INumbers {
    private counter = 0;
    private stop = 0;

    public constructor(private _from: number, private _to: number) {
        this.counter = _from;
        this.stop = _to;
    }

    public [Symbol.iterator]() {
        return {
            next: () => {
                return {
                    done: this.counter === this.stop,
                    value: this.counter++
                }
            }
        }
    }
}

function someAlgorithm(numbers: INumbers, functor: (value: number) => void) {
    for (const num of numbers) {
        functor(num);
    }
}

someAlgorithm(new SequencedNumbers(0, 10), (val) => console.log(val)) // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
someAlgorithm(new SequencedNumbers(5, 10), (val) => console.log(val)) // 5, 6, 7, 8, 9


const list: number[] & {customMap?: Function;} = [1, 2];

list.customMap = function(callback) {
	const arr: number[] = [];
	for (let i = 0; i < this.length; i++) {
        arr[i] = callback(this[i]);
    }
	return arr;
}


const list2 = list.customMap(element => element + 1); 
console.log('result:', list, list2); // 2, 3