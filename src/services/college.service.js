const httpStatus = require('http-status');
const { College } = require('../models');
const ApiError = require('../utils/ApiError');

const bulkUpload = async (careerArray, csvFilePath = null) => {
    let modifiedCareersArray = careerArray;
    if (csvFilePath) {
      modifiedCareersArray = { Careers: csvFilePath };
    }
    if (!modifiedCareersArray.Careers || !modifiedCareersArray.Careers.length) {
      return { error: true, message: 'missing array' };
    }
  
    const records = [];
    const dups = [];
  
    await Promise.all(
      modifiedCareersArray.Careers.map(async (college) => {
        const schoolFound = await College.findOne({ id: college.id });
        if (schoolFound) {
          dups.push(college);
        } else {
          const formattedCollege = {
            weblink: college.weblink || "",
            notes: college.notes || "",
            approved_by: [],
            affiliated_by: [],
            accreditation: college.accreditation || "",
            levels: [],
            faculties: [],
            specializations: [],
            super_specializations: [],
            types: [],
            programs: [],
            award_in: [],
            type: college.type || "",
            read_count: parseInt(college.read_count) || 0,
            link: college.link || "",
            name: college.name,
            type_id: parseInt(college.type_id),
            city_id: parseInt(college.city_id),
            city_name: college.city_name,
            state_name: college.state_name,
            state_id: parseInt(college.state_id),
            country_id: parseInt(college.country_id),
            country_name: college.country_name,
            ranking: [],
            id: college.id
          };
  
          // Handle approved_by
          Object.keys(college).forEach(key => {
            if (key.startsWith('approved_by/') && college[key]) {
              formattedCollege.approved_by.push(college[key]);
            }
          });
  
          // Handle affiliated_by
          Object.keys(college).forEach(key => {
            if (key.startsWith('affiliated_by/') && college[key]) {
              formattedCollege.affiliated_by.push(college[key]);
            }
          });
  
          // Handle levels
          Object.keys(college).forEach(key => {
            if (key.startsWith('levels/') && college[key]) {
              formattedCollege.levels.push(college[key]);
            }
          });
  
          // Handle faculties
          Object.keys(college).forEach(key => {
            if (key.startsWith('faculties/') && college[key]) {
              formattedCollege.faculties.push(college[key]);
            }
          });
  
          // Handle specializations
          Object.keys(college).forEach(key => {
            if (key.startsWith('specializations/') && college[key]) {
              formattedCollege.specializations.push(college[key]);
            }
          });
  
          // Handle super_specializations
          Object.keys(college).forEach(key => {
            if (key.startsWith('super_specializations/') && college[key]) {
              formattedCollege.super_specializations.push(college[key]);
            }
          });
  
          // Handle types
          Object.keys(college).forEach(key => {
            if (key.startsWith('types/') && college[key]) {
              formattedCollege.types.push(college[key]);
            }
          });
  
          // Handle programs
          Object.keys(college).forEach(key => {
            if (key.startsWith('programs/') && college[key]) {
              formattedCollege.programs.push(college[key]);
            }
          });
  
          // Handle award_in
          Object.keys(college).forEach(key => {
            if (key.startsWith('award_in/') && college[key]) {
              formattedCollege.award_in.push(college[key]);
            }
          });
  
          // Handle ranking
          Object.keys(college).forEach(key => {
            if (key.startsWith('ranking/') && college[key]) {
              const [_, index, subKey] = key.split('/');
              if (!formattedCollege.ranking[index]) {
                formattedCollege.ranking[index] = {};
              }
              formattedCollege.ranking[index][subKey] = college[key];
            }
          });
  
          let record = new College(formattedCollege);
          record = await record.save();
          if (record) {
            records.push(formattedCollege);
          }
        }
      })
    );
  
    const duplicates = {
      totalDuplicates: dups.length ? dups.length : 0,
      data: dups.length ? dups : [],
    };
    const nonduplicates = {
      totalNonDuplicates: records.length ? records.length : 0,
      data: records.length ? records : [],
    };
    return { nonduplicates, duplicates };
  };
  

/**
 * Create a College
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createCollege = async (reqBody) => {
  return College.create(reqBody);
};

/**
 * Query for College information
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCollege = async (filter, options) => {
  const college = await College.paginate(filter, options);
  return college;
};

/**
 * Get College by id
 * @param {ObjectId} id
 * @returns {Promise<College>}
 */
const getCollegeById = async (id) => {
  return College.findById(id);
};


/**
 * Update College by id
 * @param {ObjectId} CollegeId
 * @param {Object} updateBody
 * @returns {Promise<College>}
 */
const updateCollegeById = async (CollegeId, updateBody) => {
  const college = await getCollegeById(CollegeId);
  if (!college) {
    throw new ApiError(httpStatus.NOT_FOUND, 'College not found');
  }
  Object.assign(College, updateBody);
  await college.save();
  return college;
};

/**
 * Delete user by id
 * @param {ObjectId} CollegeId
 * @returns {Promise<College>}
 */
const deleteCollegeById = async (CollegeId) => {
  const college = await getCollegeById(CollegeId);
  if (!college) {
    throw new ApiError(httpStatus.NOT_FOUND, 'College not found');
  }
  await college.remove();
  return college;
};

module.exports = {
  bulkUpload,
  createCollege,
  queryCollege,
  getCollegeById,
  updateCollegeById,
  deleteCollegeById,
};
