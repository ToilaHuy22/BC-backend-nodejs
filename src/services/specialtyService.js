import db from '../models/index';
import emailService from '../services/emailService';

let createSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown) {
        resolve({
          errCode: 1,
          errMessage: 'Missing required parameters',
        });
      } else {
        await db.Specialty.create({
          image: data.imageBase64,
          name: data.name,
          descriptionHTMl: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });
        resolve({
          errCode: 0,
          errMessage: 'Created Specialty',
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createSpecialty: createSpecialty,
};
