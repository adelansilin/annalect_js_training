//

window.onload = function () {
  function logout() {
    sessionStorage.removeItem("loggedIn");
    window.location.href = "login.html"; // Redirect to login page
  }
  // Check if the user is logged in
  if (!sessionStorage.getItem("loggedIn")) {
    document.getElementById("loginError").innerText =
      "You must be logged in to perform this action.";
    setTimeout(function () {
      window.location.href = "login.html"; // Redirect if not logged in
    }, 1000);
  }
};

// Functional logic
class Employee {
  constructor(id, firstName, lastName, dob, doj, grade) {
    this.id = id;
    this.firstName = firstName.toLowerCase();
    this.lastName = lastName.toLowerCase();
    this.dob = dob;
    this.doj = doj;
    this.grade = grade;
  }
}

class EmployeeManager {
  constructor() {
    this.employees = [];
  }

  addEmployee(employee) {
    this.employees.push(employee);
  }

  search(query) {
    return this.employees.filter((employee) => {
      return (
        (!query.id || employee.id === query.id) &&
        (!query.firstName ||
          employee.firstName.includes(query.firstName.toLowerCase())) &&
        (!query.lastName ||
          employee.lastName.includes(query.lastName.toLowerCase())) &&
        (!query.dob || employee.dob === query.dob) &&
        (!query.doj || employee.doj === query.doj) &&
        (!query.grade || employee.grade === query.grade)
      );
    });
  }

  updateEmployee(employeeId, updatedData) {
    const employee = this.employees.find((emp) => emp.id === employeeId);
    if (employee) {
      Object.assign(employee, updatedData);
    }
  }
}

//UI Logic
class EmployeeUI {
  static displayResults(results) {
    const resultsContainer = document.createElement("div");
    resultsContainer.id = "results-container";

    // Clear previous results
    const existingContainer = document.getElementById("results-container");
    if (existingContainer) {
      existingContainer.remove();
    }

    if (results.length === 0) {
      resultsContainer.innerHTML = "<p>No matching employees found.</p>";
    } else {
      results.forEach((employee) => {
        const employeeCard = document.createElement("div");
        employeeCard.classList.add("employee-card");
        employeeCard.innerHTML = `
        <table>
          <tr>
            <td><strong>ID</strong></td>
            <td>${employee.id}</td>
          </tr>
          <tr>
            <td><strong>Name</strong></td>
            <td>${employee.firstName} ${employee.lastName}</td>
          </tr>
          <tr>
            <td><strong>DOB</strong></td>
            <td>${employee.dob}</td>
          </tr>
          <tr>
            <td><strong>DOJ</strong></td>
            <td>${employee.doj}</td>
          </tr>
          <tr>
            <td><strong>Grade</strong></td>
            <td>${employee.grade}</td>
          </tr>
        </table>
        <button href="#" class="modify-link" data-id="${employee.id}">Modify</button>
      `;
        resultsContainer.appendChild(employeeCard);
      });
    }

    document.querySelector(".container").appendChild(resultsContainer);
  }

  static populateForm(employee) {
    document.getElementById("employee-id").value = employee.id;
    document.getElementById("first-name").value = employee.firstName;
    document.getElementById("last-name").value = employee.lastName;
    document.getElementById("dob").value = employee.dob;
    document.getElementById("doj").value = employee.doj;
    document.getElementById("grade").value = employee.grade;

    // Update UI for Modify state
    document.querySelector("h2").innerText = "Employee Modify";
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.innerText = "Modify";
  }

  static resetForm() {
    document.getElementById("search-form").reset();
    document.querySelector("h2").innerText = "Employee Search";
    document.querySelector('button[type="submit"]').innerText = "Search";
  }
}

//Event listener
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");
  const employeeManager = new EmployeeManager();

  // Add sample employees
  employeeManager.addEmployee(
    new Employee("E001", "Adel", "Mariam", "2002-09-09", "2024-09-12", "M1")
  );
  employeeManager.addEmployee(
    new Employee("E002", "Balaji", "Bharath", "2002-02-10", "2024-09-12", "M2")
  );
  employeeManager.addEmployee(
    new Employee("E003", "Asfaq", "Moideen", "2003-09-02", "2024-07-15", "M3")
  );
  employeeManager.addEmployee(
    new Employee("E004", "Shaik", "Jasmine", "2003-12-05", "2024-07-15", "M4")
  );
  employeeManager.addEmployee(
    new Employee("E005", "Santhost", "Kumar", "2001-06-01", "2024-07-15", "M1")
  );
  employeeManager.addEmployee(
    new Employee("E004", "Sabarish", "Sanjay", "2002-08-04", "2024-07-15", "M2")
  );
  employeeManager.addEmployee(
    new Employee("E004", "Sai", "Chaithanya", "2001-08-01", "2024-07-15", "M3")
  );
  employeeManager.addEmployee(
    new Employee("E004", "Aster", "Pereira", "2002-01-05", "2024-07-15", "M4")
  );

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Clear any previous error message
    const errorMessage = document.getElementById("error-message");
    if (errorMessage) {
      errorMessage.innerText = ""; // Reset error message content
    }

    const query = {
      id: document.getElementById("employee-id").value.trim(),
      firstName: document.getElementById("first-name").value.trim(),
      lastName: document.getElementById("last-name").value.trim(),
      dob: document.getElementById("dob").value.trim(),
      doj: document.getElementById("doj").value.trim(),
      grade: document.getElementById("grade").value.trim(),
    };

    const isEmptyQuery = Object.values(query).every((value) => value === "");

    if (isEmptyQuery) {
      const errorMessage = document.getElementById("error-message");
      errorMessage.innerText = "Please provide at least one input to search.";
      return;
    }

    if (
      searchForm.querySelector('button[type="submit"]').innerText === "Search"
    ) {
      // Perform search
      const results = employeeManager.search(query);
      EmployeeUI.displayResults(results);
    } else {
      // Perform Modify
      const employeeId = document.getElementById("employee-id").value.trim();
      employeeManager.updateEmployee(employeeId, query);
      const modifiedEmployee = employeeManager.employees.find(
        (emp) => emp.id === employeeId
      );

      // Reset the form and show only the modified employee
      EmployeeUI.resetForm();
      if (modifiedEmployee) {
        EmployeeUI.displayResults([modifiedEmployee]); // Wrap in an array
      }
    }
  });

  document.querySelector(".container").addEventListener("click", (event) => {
    if (event.target.classList.contains("modify-link")) {
      event.preventDefault();

      const employeeId = event.target.getAttribute("data-id");
      const employee = employeeManager.employees.find(
        (emp) => emp.id === employeeId
      );

      if (employee) {
        EmployeeUI.populateForm(employee);
      }
      employeeManager.updateEmployee(employeeId, query);
    }
  });

  //slider functions
  // Handle "View" button click
  const viewButton = document.querySelector(
    '.sliding-content a[href="view.html"]'
  );
  viewButton.addEventListener("click", (event) => {
    event.preventDefault();
    EmployeeUI.displayResults(employeeManager.employees);
  });

  //modify link func
  // Handle "Modify" link click in the sliding content
  const modifyLink = document.querySelector('.sliding-content a[href=""]');
  modifyLink.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default behavior

    // Switch the form to Modify mode
    const searchForm = document.getElementById("search-form");
    const submitButton = searchForm.querySelector('button[type="submit"]');
    submitButton.innerText = "Modify";

    // Focus on the Employee ID field to encourage entering an ID
    const employeeIdField = document.getElementById("employee-id");
    employeeIdField.focus();

    // Optional: Clear other form fields
    searchForm.reset();

    // Change heading (optional)
    document.querySelector("h2").innerText = "Employee Modify";

    // Attach keydown listener to handle Enter key for searching
    employeeIdField.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const employeeId = event.target.value.trim();
        const employee = employeeManager.employees.find(
          (emp) => emp.id === employeeId
        );

        if (employee) {
          EmployeeUI.populateForm(employee);
          document.getElementById("error-message").innerText = ""; // Clear any error message
        } else {
          EmployeeUI.resetForm();
          document.querySelector("h2").innerText = "Employee Modify";
          document.getElementById("error-message").innerText =
            "Employee not found!";
        }
      }
    });
  });
});
