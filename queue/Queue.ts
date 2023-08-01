/**
 * Define the items in the queue
 */
class QueueItem {
  value: string;

  constructor(value: string) {
    this.value = value;
  }
}

/**
 * Create the Queue class which stores an array of items and uses
 * First-In Last-Out (FILO)
 * Note: Arrays work fine in most cases because you wouldn't typically
 * write a queue for large data sets; you'd use a queuing system.
 * However, if you're looking for high-perf a Set could be used.
 * The downside/catch is each item in a set has to be unique.
 */
class Queue {
  /* Stores the items pushed into the queue */
  private items: QueueItem[] = [];

  /* Adds an item to the queue */
  push(item: QueueItem): QueueItem {
    this.items.push(item);
    return item;
  }

  /* Gets the next item from the "bottom" of the queue */
  next(): QueueItem | null {
    return this.items.shift() || null;
  }

  /**
   * Returns the length of the queue which is useful if trying to
   * determine if there's anything in it, or set a loop duration
   */
  get size(): number {
    return this.items.length;
  }
}

//
//
//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ EXAMPLES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//
//

const queue = new Queue();

queue.push(new QueueItem('a'));
queue.push(new QueueItem('b'));

console.log('Size:', queue.size);

const next1 = queue.next();
console.log('Next1:', next1);
const next2 = queue.next();
console.log('Next2:', next2);

const nextNull = queue.next();
console.log('NextNull:', nextNull);
