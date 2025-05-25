const dancePasses = [
    {
        passType: "Monthly Pass - October 2024",
        classesAttended: ["Hip Hop - Oct 12, 2024", "Jazz - Oct 14, 2024", "Ballet - Oct 16, 2024"]
    },
    {
        passType: "One Pass - September 2024",
        classesAttended: ["Contemporary - Sep 13, 2024"]
    }
];

const tableBody = document.getElementById('dancePassTableBody');

// Function to populate the table
function populateTable(dancePassesToDisplay) {
    tableBody.innerHTML = ""; // Clear the table

    dancePassesToDisplay.forEach(pass => {
        const passHeaderRow = document.createElement('tr');
        const passHeaderCell = document.createElement('td');
        passHeaderCell.colSpan = 2;
        passHeaderCell.textContent = pass.passType;
        passHeaderCell.classList.add('pass-header');
        passHeaderRow.appendChild(passHeaderCell);
        tableBody.appendChild(passHeaderRow);

        const classListRow = document.createElement('tr');
        const classesCell = document.createElement('td');
        const classList = document.createElement('ul');
        pass.classesAttended.forEach(classAttended => {
            const classItem = document.createElement('li');
            classItem.textContent = classAttended;
            classList.appendChild(classItem);
        });
        classesCell.appendChild(classList);
        classListRow.appendChild(classesCell);

        tableBody.appendChild(classListRow);
    });
}

// Initially populate the table
populateTable(dancePasses);

// Filter function
function filterTable() {
    const selectedPass = document.getElementById("dancePassFilter").value;
    const selectedMonth = document.getElementById("monthFilter").value;
    const selectedYear = document.getElementById("yearFilter").value;

    const filteredPasses = dancePasses.filter(pass => {
        // Filter by pass type
        if (selectedPass && pass.passType.indexOf(selectedPass) === -1) return false;

        // Filter by month and year
        const filteredClasses = pass.classesAttended.filter(classAttended => {
            const dateString = classAttended.split(" - ")[1];
            const classDate = new Date(dateString);
            const classMonth = classDate.getMonth() + 1;
            const classYear = classDate.getFullYear();

            if (selectedMonth && classMonth != selectedMonth) return false;
            if (selectedYear && classYear != selectedYear) return false;

            return true;
        });

        if (filteredClasses.length > 0) {
            pass.classesAttended = filteredClasses;
            return true;
        }
        return false;
    });

    populateTable(filteredPasses);
}

// Reset filter
function resetFilter() {
    document.getElementById("dancePassFilter").value = "";
    document.getElementById("monthFilter").value = "";
    document.getElementById("yearFilter").value = "";
    populateTable(dancePasses); // Repopulate the original table
}