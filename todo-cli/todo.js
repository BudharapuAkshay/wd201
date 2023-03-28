const todoList = () => {
const all = [];

const add = (todoItem) => {
all.push(todoItem);
};

const markAsComplete = (index) => {
all[index].completed = true;
};

const overdue = () => {
const now = new Date();
return all.filter((todoItem) => {
const dueDate = new Date(todoItem.dueDate);
return !todoItem.completed && dueDate < now;
});
};

const dueToday = () => {
const now = new Date();
return all.filter((todoItem) => {
const dueDate = new Date(todoItem.dueDate);
return (
!todoItem.completed &&
dueDate >= now &&
dueDate < new Date(now.getTime() + 24 * 60 * 60 * 1000)
);
});
};

const dueLater = () => {
  const laterItems = all.filter(item => {
    return new Date(item.dueDate) > new Date() && !item.completed
  })
  laterItems.sort((a, b) => {
    return new Date(a.dueDate) - new Date(b.dueDate);
  })
  return laterItems;
}

const toDisplayableList = (list) => {
return list
.map(
(todoItem, index) =>
`${index + 1}. [${todoItem.completed ? "X" : " "}] ${
todoItem.title
} - ${todoItem.dueDate}`
)
.join("\n");
};

return {
all,
add,
markAsComplete,
overdue,
dueToday,
dueLater,
toDisplayableList,
};
};

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

const todos = todoList();

const formattedDate = (d) => {
return d.toISOString().split("T")[0];
};

const dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDate(
new Date(new Date().setDate(dateToday.getDate() + 1))
);

todos.add({
title: "Submit assignment",
dueDate: yesterday,
completed: false,
});
todos.add({ title: "Pay rent", dueDate: today, completed: true });
todos.add({ title: 'Service Vehicle', dueDate: today, completed: false })
todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false })
todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false })

console.log("My Todo-list\n")

console.log("Overdue")
var overdues = todos.overdue()
var formattedOverdues = todos.toDisplayableList(overdues)
console.log(formattedOverdues)
console.log("\n")

console.log("Due Today")
let itemsDueToday = todos.dueToday()
let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday)
console.log(formattedItemsDueToday)
console.log("\n")

console.log("Due Later")
let itemsDueLater = todos.dueLater()
let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater)
console.log(formattedItemsDueLater)
console.log("\n\n")