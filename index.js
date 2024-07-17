import inquirer from "inquirer";
import chalk from "chalk";
// Student Class
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }
    // Enroll students in a course
    enrollCourse(course) {
        this.courses.push(course);
    }
    // View student balance
    viewBalance() {
        console.log(chalk.blueBright(`\nBalance for ${this.name} is ${this.balance}\n`));
    }
    // Pay student fees
    payFees(amount) {
        this.balance -= amount;
        console.log(chalk.underline.bold(`\n$${amount} Fees paid successfully for ${this.name}`));
        console.log(chalk.underline(`Remaining Balance: $${this.balance}\n`));
    }
    // Display student status
    displayStatus() {
        console.log(chalk.yellow(`\nStudent ID: ${this.id}`));
        console.log(chalk.yellow(`Student Name: ${this.name}`));
        console.log(chalk.yellow(`Student Courses: ${this.courses}`));
        console.log(chalk.yellow(`Balance: ${this.balance}\n`));
    }
}
class StudentManager {
    students;
    constructor() {
        this.students = [];
    }
    // Add a new student
    addStudent(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(chalk.green(`\n Student: ${name} added successfully, Student ID: ${student.id}\n`));
    }
    enrollStudent(studentId, course) {
        let student = this.findStudent(studentId);
        if (student) {
            student.enrollCourse(course);
            console.log(chalk.green(`\n ${student.name} enrolled in ${course} successfully!\n`));
        }
    }
    // View student balance
    viewStdBalance(studentId) {
        let student = this.findStudent(studentId);
        if (student) {
            student.viewBalance();
        }
        else {
            console.log(chalk.red("\nStudent not found! Please enter a correct student ID.\n"));
        }
    }
    // Pay student fees
    payStudentFees(studentId, amount) {
        let student = this.findStudent(studentId);
        if (student) {
            student.payFees(amount);
        }
        else {
            console.log(chalk.red("\nStudent not found! Please enter a correct student ID.\n"));
        }
    }
    // Show student status
    showStudentStatus(studentId) {
        let student = this.findStudent(studentId);
        if (student) {
            student.displayStatus();
        }
    }
    // Find student by student ID
    findStudent(studentId) {
        return this.students.find(std => std.id === studentId);
    }
}
// Main function to run the program
async function main() {
    console.log(chalk.magentaBright("\t\nWelcome to Student Management System... By Marjan"));
    console.log("-".repeat(50));
    console.log("\n");
    let studentManager = new StudentManager();
    while (true) {
        let choices = await inquirer.prompt({
            name: "option",
            type: "list",
            message: "Select an option:",
            choices: [
                { name: "Add a Student", value: 1 },
                { name: "Enroll Student", value: 2 },
                { name: "View Student Balance", value: 3 },
                { name: "Pay fees", value: 4 },
                { name: "Show Status", value: 5 },
                { name: "Exit", value: "exit" }
            ]
        });
        switch (choices.option) {
            case 1:
                let studentInfo = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter student name:"
                    }
                ]);
                studentManager.addStudent(studentInfo.name);
                break;
            case 2:
                let enrollStudent = await inquirer.prompt([
                    {
                        name: "student_Id",
                        type: "input",
                        message: "Enter student ID:"
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter course name:"
                    }
                ]);
                studentManager.enrollStudent(parseInt(enrollStudent.student_Id), enrollStudent.course);
                break;
            case 3:
                let balanceInput = await inquirer.prompt({
                    name: "student_Id",
                    type: "input",
                    message: "Enter student ID: "
                });
                studentManager.viewStdBalance(parseInt(balanceInput.student_Id));
                break;
            case 4:
                let feesInput = await inquirer.prompt([
                    {
                        name: "student_Id",
                        type: "input",
                        message: "Enter student ID: "
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay: "
                    }
                ]);
                studentManager.payStudentFees(parseInt(feesInput.student_Id), feesInput.amount);
                break;
            case 5:
                let statusInput = await inquirer.prompt([
                    {
                        name: "student_Id",
                        type: "input",
                        message: "Enter student ID: "
                    }
                ]);
                studentManager.showStudentStatus(parseInt(statusInput.student_Id));
                break;
            case "exit":
                console.log("Exiting the program...");
                process.exit();
        }
    }
}
main();
