async function markAttendance() {

    const studentName =
        document.getElementById("studentName").value;

    const response = await fetch(
        "http://localhost:5000/api/mark-attendance",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                studentName
            })
        }
    );

    const data = await response.json();

    document.getElementById("message").innerText =
        data.message;
}