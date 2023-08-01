/**
 * Define the linked list items. Here we provide both next
 * and previous as this is a doubly linked list which allows
 * moving current pointer from head to tail or tail to head.
 */
class ListItem {
  value: string;
  next: ListItem | null = null;
  previous: ListItem | null = null;

  constructor(value: string) {
    this.value = value;
  }
}

/**
 * Create the LinkedList, in this case doubly-linked (see ListItem
 * class next and previous) which allows for searching by
 * starting at the head OR the tail.
 */
class LinkedList {
  head: ListItem | null = null;
  tail: ListItem | null = null;
  size: number = 0;

  /* Adds an item to the tail of the list */
  push(item: ListItem): ListItem {
    // If there's an existing tail (list > 0)
    if (this.tail) this.tail.next = item;

    // If there's no head (list === 0)
    if (!this.head) this.head = item;

    // Make new item's previous the previous item (duh)
    item.previous = this.tail;

    // Set the new tail
    this.tail = item;
    // Push the size by 1
    this.size++;
    // Send back the item
    return item;
  }

  /* Adds item at the head of the list */
  unshift(item: ListItem): ListItem | null {
    if (this.head) {
      // Update head props to push new item to front
      this.head.previous = item;
      item.next = this.head;
      this.head = item;
    } else {
      // No head, just set item
      this.head = item;
    }
    // Push the size by 1
    this.size++;
    // Send back the item
    return item;
  }

  /* Removes and returns the tail of the list */
  pop(): ListItem | null {
    // Ensure there is a tail (list > 0)
    if (!this.tail) return null;
    // Get current and new tails
    let currentTail = this.tail;
    let newTail = this.tail?.previous;
    // Set newTail's next to null
    if (newTail) newTail.next = null;
    this.tail = newTail;
    // Decrement the size by 1
    this.size--;
    // Return tail
    return currentTail;
  }

  /* Removes and returns the head of the list */
  shift(): ListItem | null {
    // No head, list === 0
    if (!this.head) {
      return null;
    } else {
      // Have a head, chop it off and send it to them
      const currentHead = this.head;
      const newHead = this.head.next;
      currentHead.next = null;
      if (newHead) newHead.previous = null;
      this.head = newHead;
      // Decrement list size
      this.size--;
      return currentHead;
    }
  }

  /* Gets item at specified index */
  get(index: number): ListItem | null {
    // Nothing in list, return null
    if (!this.head) return null;
    // Determine direction based on if we're closer to head or tail
    // prefer floor since indexes start at 0
    const fromHead = index <= Math.ceil(this.size / 2);
    // Loop through to find item at index
    let i;
    let item;
    if (fromHead) {
      if (index === 0) return this.head;
      // Just a while loop until index reached
      i = 0;
      item = this.head;
      while (i !== index) {
        item = item?.next;
        i++;
      }
      return item || null;
    } else {
      if (index === this.size - 1) return this.tail;
      // Just a while loop until index reached
      i = this.size - 1;
      item = this.tail;
      while (i !== index) {
        item = item?.previous;
        i--;
      }
      return item || null;
    }
  }

  /* Updates item at specified index */
  set(index: number, value: string): ListItem | null {
    const itemAtIndex = this.get(index);
    if (itemAtIndex) itemAtIndex.value = value;
    return itemAtIndex;
  }

  /* Inserts an item at the specified index */
  insert(index: number, item: ListItem): ListItem | null {
    // First, last, or nothing in list, just push
    if (this.size === 0 || index === 0 || index === this.size - 1)
      this.push(item);
    // If index is above size, throw
    if (index > this.size - 1)
      throw new Error('Index larger than size of list');
    // Doesn't match above conditions, get current item at index
    const currentAtIndex = this.get(index);
    const currentAfterIndex = this.get(index + 1);

    // Set current items to next and previous of new item
    if (currentAtIndex) currentAtIndex.next = item;
    if (currentAfterIndex) currentAfterIndex.previous = item;

    // Set new item's next and previous
    item.previous = currentAtIndex;
    item.next = currentAfterIndex;

    return item;
  }

  remove(index: number): void {
    // First, last, or nothing in list, just return
    if (this.size === 0 || index === 0 || index === this.size - 1) return;
    // If index is above size, throw
    if (index > this.size - 1)
      throw new Error('Index larger than size of list');
    // Get current
    const currentItem = this.get(index);
    // Set next and previous items to reference eachother
    if (currentItem?.previous) currentItem.previous.next = currentItem?.next;
    if (currentItem?.next) currentItem.next.previous = currentItem?.previous;
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

// Create a new linked list
const linkedList = new LinkedList();

// Add some starter item
linkedList.push(new ListItem('a'));
linkedList.push(new ListItem('b'));
linkedList.push(new ListItem('c'));

// CURRENT: a <> b <> c

console.log(
  'Starting Head:',
  linkedList.head?.value,
  'Starting Tail:',
  linkedList.tail?.value
); // should be 'a' and 'c'

// Add new item 'd' to head
const llItemD = linkedList.unshift(new ListItem('d'));

// CURRENT: d <> a <> b <> c

console.log('New Head (Unshifted):', linkedList.head?.value); // should be 'd'

const popped = linkedList.pop();

// CURRENT: d <> a <> b

console.log(
  'Popped item:',
  popped?.value,
  'New Tail (Popped):',
  linkedList.tail?.value
);

const shifted = linkedList.shift();

// CURRENT a <> b

console.log('New Head (Shifted):', linkedList.head?.value);

linkedList.push(new ListItem('c'));
linkedList.push(new ListItem('d'));
linkedList.push(new ListItem('e'));

// CURRENT a <> b <> c <> d <> e

const itemAtIndex2 = linkedList.get(2);
console.log('Item at Index 2 (Get):', itemAtIndex2?.value);

const setItem = linkedList.set(2, 'updated');
console.log('Item changed (Set):', linkedList.get(2)?.value);

// CURRENT a <> b <> updated <> d <> e

const insertedItem = linkedList.insert(1, new ListItem('inserted'));
console.log('New Item (Inserted)', insertedItem?.value);

// CURRENT a <> b <> inserted <> updated <> d <e>

linkedList.remove(3);
console.log('New idx-3 item (Remove):', linkedList.get(3)?.value);
