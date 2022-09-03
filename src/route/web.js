import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.get("/api/allcode", userController.getAllCode);
  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  router.get("/api/get-all-doctors", doctorController.getAllDoctors);

  router.post("/post-crud", homeController.postCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.post("/api/login", userController.handleLogin);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.post("/api/save-infor-doctors", doctorController.postInforDoctor);

  router.put("/api/edit-user", userController.handleEditUser);

  router.delete("/api/delete-user", userController.handleDeleteUser);

  return app.use("/", router);
};

module.exports = initWebRoutes;
