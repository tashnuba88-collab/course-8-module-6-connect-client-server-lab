document.addEventListener("DOMContentLoaded", () => {
    const eventList = document.getElementById("event-list");
    const form = document.querySelector("form");
    const titleInput = document.getElementById("title");

    const API_URL = "http://127.0.0.1:5000/events";

    // 1. Fetch and display existing events
    function fetchEvents() {
        fetch(API_URL)
            .then(response => response.json())
            .then(events => {
                eventList.innerHTML = "";
                events.forEach(event => {
                    const li = document.createElement("li");
                    li.textContent = event.title;
                    eventList.appendChild(li);
                });
            })
            .catch(error => console.error("Error fetching events:", error));
    }

    // 2. Handle form submission to add a new event
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = titleInput.value.trim();

        if (!title) return;

        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: title })
        })
        .then(response => {
            if (response.ok) {
                titleInput.value = "";
                fetchEvents(); // Refresh the list
            } else {
                console.error("Failed to add event");
            }
        })
        .catch(error => console.error("Error posting event:", error));
    });

    // Initial load
    fetchEvents();
});