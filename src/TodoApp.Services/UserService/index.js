const Context = require("../../TodoApp.Bus/Repository");

module.exports.UserLogin = ({UserName,Password}) => {
  return new Promise((resolve, reject) => {
    const DefaultFilter = {IsActive:1,EndDate:null};
    Context.GetById("customers",{UserName:UserName,Password:Password,...DefaultFilter}).then((result) => {
      resolve(result);
    });
  });
};
module.exports.InsertManyUser = () => {
  try {
    return Context.InsertMany();
  } catch (Exception) {
    throw Exception;
  } finally {
  }
};
