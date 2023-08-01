/** Define the items in the stack */
class StackItem {
  value: string;

  constructor(item: string) {
    this.value = item;
  }
}

/**
 * Defines the Stack class which stores items and uses First-In,
 * First-Out (FIFO) for adding and retrieval.
 * The name "Stack" should be familiar to JS/TS devs as it's the
 * same methodology used for processing, hence Stack Traces / Errors
 */
class Stack {
  /* Stores the items in the stack */
  private items: StackItem[] = [];

  /* Adds a new item to the stack */
  push(item: StackItem): StackItem {
    this.items.push(item);
    return item;
  }

  /* Pops the last added item from the stack */
  pop(): StackItem | null {
    return this.items.pop() || null;
  }

  /**
   * Returns the number of items in the stack which is useful
   * for checking if there are items in the stack or setting
   * an itterator length
   */
  get size(): number {
    return this.items.length || 0;
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

const stack = new Stack();

stack.push(new StackItem('a'));
stack.push(new StackItem('b'));

console.log('Size:', stack.size);

const pop1 = stack.pop();
console.log('Pop1:', pop1);

const pop2 = stack.pop();
console.log('Pop2:', pop2);

const popNull = stack.pop();
console.log('PopNull:', popNull);
