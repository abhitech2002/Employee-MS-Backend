const express = require("express");
const pdf = require("html-pdf");
const json2xls = require("json2xls");
const fs = require("fs");
const json2csv = require("json2csv").parse;

const Employee = require("../models/employee.model");

const router = express.Router();

router.get("/employees/excel", async (req, res) => {
  try {
    const employees = await Employee.find(
      {},
      "-_id name code department designation workLocation reportingManager workExperience email"
    );
    const xls = json2xls(employees);
    res.setHeader("Content-Disposition", "attachment; filename=employees.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(xls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/employees/csv", async (req, res) => {
  try {
    const employees = await Employee.find(
      {},
      "-_id name code department designation workLocation reportingManager workExperience email"
    );
    const csv = json2csv(employees, {
      fields: ["name", "department", "email"],
    });

    res.setHeader("Content-Disposition", "attachment; filename=employees.csv");
    res.setHeader("Content-Type", "text/csv");
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/employees/pdf", async (req, res) => {
  try {
    const employees = await Employee.find(
      {},
      "-_id name code department designation workLocation reportingManager workExperience email"
    );
    const html = `
            <html>
                <head><title>Employee Details</title></head>
                <body>
                    <h1>Employee Details</h1>
                    <table border="1">
                        <tr><th>Name</th><th>Department</th><th>Email</th><th>code</th><th>designation</th><th>workLocation</th><th>reportingManager</th><th>workExperience</th></tr>
                        ${employees
                          .map(
                            (emp) =>
                              `<tr><td>${emp.name}</td><td>${emp.department}</td><td>${emp.email}</td><td>${emp.code}</td> <td>${emp.designation}</td> <td>${emp.workLocation}</td><td>${emp.reportingManager}</td><td>${emp.workExperience}</td></tr>`
                          )
                          .join("")}
                    </table>
                </body>
            </html>
        `;
    const options = {
      format: "A4",
      orientation: "portrait",
      border: "10mm",
    };
    pdf.create(html, options).toBuffer((err, buffer) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error generating PDF" });
      } else {
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=employees.pdf"
        );
        res.setHeader("Content-Type", "application/pdf");
        res.send(buffer);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
