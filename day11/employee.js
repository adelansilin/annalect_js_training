const details = [
  {
    empId: 1,
    deptId: 1,
    empName: "Adel",
    empLocation: "Coimbatore",
  },
];

// function add() {
//   const empid = document.querySelector('input[name = "emp-id"]').value;
//   const deptid = document.querySelector('input[name = "dept-id"]').value;
//   const empname = document.querySelector('input[name = "name"]').value;
//   const location = document.querySelector('input[name = "location"]').value;

//   if (!empid || !deptid || !empname || !location) {
//     message.innerText = "Please fill in all the fields and select a product.";
//     return;
//   }

//   if (!details.find((i) => i.id == empid)) {
//     details.push({
//       empId: parseInt(empid),
//       deptId: deptid,
//       empName: empname,
//       empLocation: location,
//     });
//     console.log("Details Added Successfully!");
//     let message = document.getElementById("message");
//     message.textContent = "Product Added Successfully!";
//   }
// }

class Details {
  constructor(empId, deptId, empName, empLocation) {
    this.empId = empId;
    this.deptId = deptId;
    this.empName = empName;
    this.empLocation = empLocation;
  }
}

class EmployeeLogic {
  constructor() {
    this.details = [];
  }

  findElement(newDetails) {
    const detail = this.details.find(
      (detail) => detail.empId == newDetails.empId
    );
  }

  displayMessage(message) {
    this.messageElement.textContent = message;
  }

  add(newDetails) {
    if (
      !newDetails.empId ||
      !newDetails.deptId ||
      !newDetails.empLocation ||
      !newDetails.empName
    ) {
      return "Please fill in all fields.";
    }
    const existingDetail = this.findElement(empId);
  }
}

document.addEventListener("DOMContentLoaded", () => {});
