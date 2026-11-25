
// ======================================================
// WEEK 7 ASSIGNMENT
// Questions 1–4
// ======================================================


// ------------------------------------------------------
// QUESTION 1: Block Scoping & Immutability with const
// ------------------------------------------------------

const serverConfig = {
    port: 3000,
    env: "development"
};

// Change the existing port property.
serverConfig.port = 4000;

// Add a new timeout property.
serverConfig.timeout = 5000;

console.log("QUESTION 1: Server Configuration");
console.log(serverConfig);

// Explanation:
// const prevents the variable serverConfig from being
// reassigned to a different object. However, const does
// not prevent changes to the object's properties.
// Therefore, changing port and adding timeout are allowed.
// No TypeError occurs.


// ------------------------------------------------------
// QUESTION 2: DOM Element Creation and Event Delegation
// ------------------------------------------------------

// This code runs in a browser because it needs HTML elements.
// The document check prevents errors when running this file
// with Node.js for Questions 1, 3, and 4.

if (typeof document !== "undefined") {

    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (addTaskBtn && taskInput && taskList) {

        // Listen for a click on the Add Task button.
        addTaskBtn.addEventListener("click", function () {

            // Read the text entered by the user.
            const taskText = taskInput.value.trim();

            // Do not add an empty task.
            if (taskText === "") {
                alert("Please enter a task.");
                return;
            }

            // Create a new list item.
            const li = document.createElement("li");

            // Add the task text.
            const taskSpan = document.createElement("span");
            taskSpan.textContent = taskText;

            // Create the Delete button.
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.type = "button";
            deleteBtn.className = "delete-task";

            // Put the text and Delete button inside the list item.
            li.appendChild(taskSpan);
            li.appendChild(document.createTextNode(" "));
            li.appendChild(deleteBtn);

            // Add the list item to the unordered list.
            taskList.appendChild(li);

            // Clear the input field.
            taskInput.value = "";
        });

        // Event delegation: listen on the UL for Delete button clicks.
        taskList.addEventListener("click", function (event) {

            if (event.target.classList.contains("delete-task")) {

                // Find and remove only the selected list item.
                const taskItem = event.target.closest("li");

                if (taskItem) {
                    taskItem.remove();
                }
            }
        });
    }
}

// Explanation:
// Event delegation allows one listener on the UL to handle
// Delete buttons, including buttons created dynamically.


// ------------------------------------------------------
// QUESTION 3: Asynchronous Chaining with Promises
// ------------------------------------------------------

function processOrder(orderId) {

    return new Promise((resolve, reject) => {

        // Reject if the order ID is falsy or negative.
        if (!orderId || orderId < 0) {
            reject(new Error("Invalid Order ID"));
            return;
        }

        // Step 1: Verify inventory after 500 milliseconds.
        setTimeout(() => {

            console.log(`Verifying inventory for order ${orderId}...`);

            // Step 2: Process payment after another 500 milliseconds.
            setTimeout(() => {

                console.log("Processing payment...");

                // Step 3: Complete the order after another 500 milliseconds.
                setTimeout(() => {

                    const confirmation = {
                        orderId: orderId,
                        status: "SUCCESS",
                        timestamp: new Date().toISOString()
                    };

                    resolve(confirmation);

                }, 500);

            }, 500);

        }, 500);
    });
}


// Use async/await with try, catch, and finally.
async function runOrderExample() {

    try {

        const result = await processOrder(101);

        console.log("Order confirmation:", result);

    } catch (error) {

        console.error("Order processing failed:", error.message);

    } finally {

        console.log("Order processing attempt finished.");
    }
}

// Run the order example.
runOrderExample();


// ------------------------------------------------------
// QUESTION 4: Array Transformations
// filter(), map(), and reduce()
// ------------------------------------------------------

const transactions = [

    { id: 101, item: "Laptop", status: "completed", price: 1200 },

    { id: 102, item: "Mouse", status: "cancelled", price: 25 },

    { id: 103, item: "Keyboard", status: "completed", price: 100 },

    { id: 104, item: "Monitor", status: "pending", price: 300 },

    { id: 105, item: "Headphones", status: "completed", price: 150 }

];

// Filter out cancelled transactions.
// Map the remaining transactions to add 8% tax.
// Reduce the completed transactions to calculate total revenue.

const totalRevenue = transactions

    .filter(transaction => transaction.status !== "cancelled")

    .map(transaction => ({
        ...transaction,
        taxedAmount: transaction.price * 1.08
    }))

    .reduce((total, transaction) => {

        if (transaction.status === "completed") {
            return total + transaction.taxedAmount;
        }

        return total;

    }, 0);

console.log("QUESTION 4: Total Revenue");
console.log(totalRevenue.toFixed(2));

// Explanation:
// filter() removes the cancelled Mouse transaction.
// map() calculates the price with 8% tax.
// reduce() adds only completed transactions.
// The pending Monitor is not included.
//
// Expected total revenue: $1,566.00
