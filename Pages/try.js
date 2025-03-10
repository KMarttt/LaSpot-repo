

const slots = document.querySelectorAll("[id^='slot-']");

let clicked = [];

// creates a function listener for each slot
slots.forEach(slot => {
    slot.addEventListener("click", () => {
        // Will separeate the slot number from the first part of the id
        let slotNumber = parseInt(slot.id.split("-")[1]);
        
        // If the slot is not clicked, it will be added to the clicked array and change the color to red
        if (!clicked.includes(slotNumber)) {
            clicked.push(slotNumber);
            slot.style.backgroundColor = "red";
        // If the slot is clicked, it will be removed from the clicked array and change the color to grey
        } else {
            clicked = clicked.filter(function (value) {return value !== slotNumber; });
            slot.style.backgroundColor = "#c0c0c0";
        }
    })
})


