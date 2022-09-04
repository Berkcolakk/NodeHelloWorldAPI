import Auth from "../../TodoApp.Api/Auth";
let RouteArr = [];
const SetArrayAllRoute = () => {
    const RouteObj = {
        Name:Object.keys({ Auth })[0],
        Template:Auth
    }
    RouteArr.push(RouteObj);
};
SetArrayAllRoute();
export default RouteArr;
