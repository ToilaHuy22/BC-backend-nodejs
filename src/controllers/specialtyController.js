import specialtyService from '../services/specialtyService';

let createSpecialty = async (res, req) => {
  try {
    let data = await specialtyService.createSpecialty(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from server',
    });
  }
};

module.exports = {
  createSpecialty: createSpecialty,
};
