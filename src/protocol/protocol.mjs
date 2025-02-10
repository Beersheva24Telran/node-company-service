import Employee from "../dto/Employee.mjs";

/*
here should be the code for actual protocol
*/
const protocolObj= {
     '/addEmployee': addEmployee,
     '/getEmployee' : getEmployee,
     '/removeEmployee':removeEmployee,
     '/getDepartments':getDepartments,
     '/getDepartmentBudget':getDepartmentBudget,
     '/getManagersWithMostFactor':getManagersWithMostFactor

}
function createResponse(code, response) {
    return {code, response};
}

   async function addEmployee(data, server, service) {
        
        try {
            const empl = Employee.fromPlainObject(JSON.parse(data));
            await service.addEmployee(empl);
            server.emit("response", createResponse(204, ""));
        } catch(error) {
            server.emit("response", createResponse(400, error.message));
        }

   }
   async function getEmployee(data, server, service){
    try {
        const empl = await service.getEmployee(+data);
        if(empl == null) {
            throw Error(`employee withn id ${data} doesn't found`)
        }
        server.emit("response", createResponse(200, JSON.stringify(empl)))
    } catch (error) {
        server.emit("response", createResponse(404, error.message));
    }
   }
   async function removeEmployee(data, server, service){
    try {
        await service.removeEmployee(+data);
        server.emit("response", createResponse(204, "deleted"));
    } catch (error) {
        server.emit("response", createResponse(404, error.message));
    }
   }
   async function getDepartments(data, server, service){
    try {
        const departments = await service.getDepartments();
        server.emit("response", createResponse(200, JSON.stringify(departments)))
    } catch (error) {
        server.emit("response", createResponse(400, error.message));
    }
   }
   async function getDepartmentBudget(data, server, service){
    try {
        const budget = await service.getDepartmentBudget(data);
        server.emit("response", createResponse(200, "" + budget))
    } catch (error) {
        server.emit("response", createResponse(400, error.message));
    }
   }
   async function getManagersWithMostFactor(data, server, service){
    try {
        const managers = await service.getManagersWithMostFactor();
        server.emit("response", createResponse(200, JSON.stringify(managers)))
    } catch (error) {
        server.emit("response", createResponse(400, error.message));
    }
   }
    export default protocolObj;