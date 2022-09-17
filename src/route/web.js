import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController';
import doctorController from '../controllers/doctorController';
import patientController from '../controllers/patientController';

let router = express.Router();

let initWebRoutes = (app) => {
  router.get('/', homeController.getHomePage);
  router.get('/about', homeController.getAboutPage);
  router.get('/crud', homeController.getCRUD);
  router.get('/get-crud', homeController.displayGetCRUD);
  router.get('/edit-crud', homeController.getEditCRUD);
  router.get('/delete-crud', homeController.deleteCRUD);
  router.post('/post-crud', homeController.postCRUD);
  router.post('/put-crud', homeController.putCRUD);

  router.get('/api/get-all-users', userController.handleGetAllUsers);
  router.get('/api/allcode', userController.getAllCode);
  router.put('/api/edit-user', userController.handleEditUser);
  router.delete('/api/delete-user', userController.handleDeleteUser);
  router.post('/api/login', userController.handleLogin);
  router.post('/api/create-new-user', userController.handleCreateNewUser);

  router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
  router.get('/api/get-all-doctors', doctorController.getAllDoctors);
  router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);
  router.post('/api/save-infor-doctors', doctorController.postInforDoctor);
  router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);
  router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate);
  router.get('/api/get-extra-infor-doctor-by-id', doctorController.getExtraInforDoctorById);
  router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById);

  router.post('/api/patient-book-appointment', patientController.postBookAppointment);
  router.post('/api/verify-book-appointment', patientController.postVerifyBookAppointment);

  return app.use('/', router);
};

module.exports = initWebRoutes;
