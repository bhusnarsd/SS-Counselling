const httpStatus = require('http-status');
const { Scholarship } = require('../models');
const ApiError = require('../utils/ApiError');

const bulkUpload = async (scholarshipArray, csvFilePath = null) => {
    let modifiedScholarshipArray = scholarshipArray;
    if (csvFilePath) {
        modifiedScholarshipArray = { Scholarships: csvFilePath };
    }
    if (!modifiedScholarshipArray.Scholarships || !modifiedScholarshipArray.Scholarships.length) {
        return { error: true, message: 'missing array' };
    }

    const records = [];
    const dups = [];

    await Promise.all(
        modifiedScholarshipArray.Scholarships.map(async (scholarship) => {
            const scholarshipFound = await Scholarship.findOne({ id: scholarship.id });
            if (scholarshipFound) {
                dups.push(scholarship);
            } else {
                const formattedScholarship = {
                    id: scholarship.id,
                    name: scholarship.name,
                    slug: scholarship.slug,
                    scholarship_type_id: scholarship.scholarship_type_id || null,
                    funding_type: parseInt(scholarship.funding_type) || 1,
                    status: parseInt(scholarship.status) || 1,
                    funding: scholarship.funding || "",
                    region_name: scholarship.region_name || "India",
                    last_date: scholarship.last_date || null,
                    notification_status: parseInt(scholarship.notification_status) || 1,
                    academic_year_priority: parseInt(scholarship.academic_year_priority) || 10,
                    scholarship_types: [], // Initialize arrays
                    detail: [],
                    careers: [],
                    notification_type: []
                };

                // Handle scholarship_types
                Object.keys(scholarship).forEach(key => {
                    if (key.startsWith('scholarship_types/') && scholarship[key]) {
                        formattedScholarship.scholarship_types.push(scholarship[key]);
                    }
                });

                // Handle detail
                Object.keys(scholarship).forEach(key => {
                    if (key.startsWith('detail/') && scholarship[key]) {
                        const [, index, subKey] = key.split('/');
                        if (!formattedScholarship.detail[index]) {
                            formattedScholarship.detail[index] = { dates: [], notification_type: [] };
                        }
                        if (subKey === 'dates') {
                            // Ensure 'from_date' and 'to_date' are Date objects
                            const fromDate = new Date(scholarship[key + '/from_date']);
                            const toDate = scholarship[key + '/to_date'] ? new Date(scholarship[key + '/to_date']) : null;
                            formattedScholarship.detail[index].dates.push({ 
                                from_date: fromDate,
                                to_date: toDate,
                                title: scholarship[key + '/title'] || '',
                                sms: scholarship[key + '/sms'] || '',
                                advance_sms: scholarship[key + '/advance_sms'] || '',
                                email: scholarship[key + '/email'] || '',
                                email_subject: scholarship[key + '/email_subject'] || '',
                                advance_email: scholarship[key + '/advance_email'] || '',
                                advance_email_subject: scholarship[key + '/advance_email_subject'] || '',
                                is_automatic: parseInt(scholarship[key + '/is_automatic']) || false,
                                created_at: new Date(scholarship[key + '/created_at']),
                                updated_at: new Date(scholarship[key + '/updated_at']),
                            });
                        } else if (subKey === 'notification_type') {
                            formattedScholarship.detail[index].notification_type.push(scholarship[key]);
                        } else {
                            formattedScholarship.detail[index][subKey] = scholarship[key];
                        }
                    }
                });

                // Handle careers
            // Handle careers
Object.keys(scholarship).forEach(key => {
    if (key.startsWith('careers/') && scholarship[key]) {
        const [, index, subKey] = key.split('/');
        const careerIndex = parseInt(index); // Convert index to integer
        if (!formattedScholarship.careers[careerIndex]) {
            formattedScholarship.careers[careerIndex] = {}; // Initialize career object if not exists
        }
        if (subKey === 'id') {
            formattedScholarship.careers[careerIndex].id = scholarship[key]; // Set career id
        } else if (subKey === 'name') {
            formattedScholarship.careers[careerIndex].name = scholarship[key]; // Set career name
        } else if (subKey === 'type_id') {
            formattedScholarship.careers[careerIndex].type_id = parseInt(scholarship[key]) || 1; // Parse and set type_id
        }
    }
});


                // Handle notification_type
                Object.keys(scholarship).forEach(key => {
                    if (key.startsWith('notification_type/') && scholarship[key]) {
                        formattedScholarship.notification_type.push(scholarship[key]);
                    }
                });

                let record = new Scholarship(formattedScholarship);
                record = await record.save();
                if (record) {
                    records.push(formattedScholarship);
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
 * Create a Scholarship
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createScholarship = async (reqBody) => {
  return Scholarship.create(reqBody);
};

/**
 * Query for Scholarship information
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryScholarship = async (filter, options) => {
  const scholarship = await Scholarship.paginate(filter, options);
  return scholarship;
};

/**
 * Get Scholarship by id
 * @param {ObjectId} id
 * @returns {Promise<Scholarship>}
 */
const getScholarshipById = async (id) => {
  return Scholarship.findById(id);
};


/**
 * Update Scholarship by id
 * @param {ObjectId} scholarshipId
 * @param {Object} updateBody
 * @returns {Promise<Scholarship>}
 */
const updateScholarshipById = async (scholarshipId, updateBody) => {
  const scholarship = await getScholarshipById(scholarshipId);
  if (!scholarship) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Scholarship not found');
  }
  Object.assign(scholarship, updateBody);
  await scholarship.save();
  return scholarship;
};

/**
 * Delete user by id
 * @param {ObjectId} scholarshipId
 * @returns {Promise<Scholarship>}
 */
const deleteScholarshipById = async (scholarshipId) => {
  const scholarship = await getScholarshipById(scholarshipId);
  if (!scholarship) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Scholarship not found');
  }
  await scholarship.remove();
  return scholarship;
};

module.exports = {
  bulkUpload,
  createScholarship,
  queryScholarship,
  getScholarshipById,
  updateScholarshipById,
  deleteScholarshipById,
};
