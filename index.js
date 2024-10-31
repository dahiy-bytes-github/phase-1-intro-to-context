// Your code here
function createEmployeeRecord(employeeData){
     return{
        firstName:employeeData[0],
        familyName:employeeData[1],
        title:employeeData[2],
        payPerHour:employeeData[3],
        timeInEvents:[],
        timeOutEvents:[]

     }
}

function createEmployeeRecords(employeeDataArray){
    return employeeDataArray.map(createEmployeeRecord)
}
function createTimeInEvent(employeeRecord, dateStamp){
    const[date, time] = dateStamp.split(" ")
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time,10),
        date: date
    })
    return employeeRecord
}
function createTimeOutEvent(employeeRecord,dateStamp){
    const[date, time] = dateStamp.split(" ")
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time,10),
        date: date
    })
    return employeeRecord
}
function hoursWorkedOnDate(employeeRecord, date) {
    // Find the timeInEvent for the given date
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    
    // Find the timeOutEvent for the given date
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    
    // Calculate hours worked
    if (timeInEvent && timeOutEvent) {
        return (timeOutEvent.hour - timeInEvent.hour) / 100; // Convert hours from HHMM to hours
    }
    
    return 0; // Return 0 if no events found for the date
}

function wagesEarnedOnDate(employeeRecord, date) {
    // Get the hours worked on the given date
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    
    // Calculate pay owed by multiplying hours worked by pay rate
    return hoursWorked * employeeRecord.payPerHour;
}
function allWagesFor(employeeRecord) {
    // Get all the dates from the timeInEvents
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    
    // Accumulate total wages for all dates worked
    const totalWages = datesWorked.reduce((total, date) => {
        return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
    
    return totalWages; // Return the total wages as a number
}

function calculatePayroll(employeeRecords) {
    // Accumulate total wages for all employees
    const totalPayroll = employeeRecords.reduce((total, employeeRecord) => {
        return total + allWagesFor(employeeRecord);
    }, 0);
    
    return totalPayroll; // Return the total payroll as a number
}

