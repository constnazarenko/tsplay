interface Events {
    [key: string]: Function[];
}
  
export class EventEmitter {
    public events: Events;
    constructor(events?: Events) {
        this.events = events || {};
    }

    public subscribe(name: string, cb: Function) {
        (this.events[name] || (this.events[name] = [])).push(cb);

        return {
        unsubscribe: () =>
            this.events[name] && this.events[name].splice(this.events[name].indexOf(cb) >>> 0, 1)
        };
    }

    public emit(name: string, ...args: any[]): void {
        (this.events[name] || []).forEach(fn => fn(...args));
    }
}

const event = new EventEmitter();
const subscription = event.subscribe("event", value => value);

subscription.unsubscribe();



function emitter(e?: Events) {
    let events: Events = e || {};

    return {
        events,
        subscribe: (name: string, cb: Function) => {
        (events[name] || (events[name] = [])).push(cb);

        return {
            unsubscribe: () => {
            events[name] && events[name].splice(events[name].indexOf(cb) >>> 0, 1);
            }
        };
        },
        emit: (name: string, ...args: any[]) => {
        (events[name] || []).forEach(fn => fn(...args));
        }
    };
}