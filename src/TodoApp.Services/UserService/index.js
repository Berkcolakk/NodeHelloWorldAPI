import { GetById, Insert } from "../../TodoApp.Bus/Repository";

export const UserLogin = ({ UserName, Password }) => {
  return new Promise((resolve, reject) => {
    const DefaultFilter = { IsActive: 1, EndDate: null };
    GetById("customers", {
      UserName: UserName,
      Password: Password,
      ...DefaultFilter,
    }).then((result) => {
      resolve(result);
    });
  });
};
export const InsertUser = () => {
  try {
    return Insert();
  } catch (Exception) {
    throw Exception;
  } finally {
  }
};
