// Handle form submission
document
  .getElementById("preferences-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    // Gather inputs from the form
    const time = document.getElementById("time").value;
    const cartoon = document.getElementById("cartoon").value;
    const food = document.getElementById("food").value;
    const activities = Array.from(
      document.getElementById("activities").selectedOptions
    ).map((option) => option.value);
    const personalMessage = document.getElementById("message").value;

    // Construct email content
    const emailContent = `
    <h3>User Preferences</h3>
    <p><strong>Time of Arrival:</strong> ${time}</p>
    <p><strong>Cartoon/TV Show:</strong> ${cartoon}</p>
    <p><strong>Food:</strong> ${food}</p>
    <p><strong>Activities:</strong> ${activities.join(", ")}</p>
    <p><strong>Personal Message:</strong> ${personalMessage}</p>
  `;

    // Use Fetch API to send data to the server
    const response = await fetch("/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: "User Preferences Submission",
        html: emailContent,
      }),
    });

    // Check response status
    if (response.ok) {
      document.getElementById("result").classList.remove("hidden"); // Show confirmation message
      document.getElementById("preferences-form").reset(); // Clear the form
    } else {
      alert(
        "There was an error submitting your preferences. Please try again."
      );
    }
  });
