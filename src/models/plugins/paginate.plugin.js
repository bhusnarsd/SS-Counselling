// /* eslint-disable prettier/prettier */
// /* eslint-disable no-param-reassign */
// const paginate = (schema) => {
//   /**
//    * @typedef {Object} QueryResult
//    * @property {Document[]} results - Results found
//    * @property {number} page - Current page
//    * @property {number} limit - Maximum number of results per page
//    * @property {number} totalPages - Total number of pages
//    * @property {number} totalResults - Total number of documents
//    */
//   /**
//    * Query for documents with pagination
//    * @param {Object} [filter] - Mongo filter
//    * @param {Object} [options] - Query options
//    * @param {string} [options.sortBy] - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
//    * @param {string} [options.populate] - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
//    * @param {number} [options.limit] - Maximum number of results per page (default = 10)
//    * @param {number} [options.page] - Current page (default = 1)
//    * @param {boolean} [options.reverse] - Whether to reverse the order of the results (default = false)
//    * @returns {Promise<QueryResult>}
//    */
//   schema.statics.paginate = async function (filter, options) {
//     let sort = '';
//     if (options.sortBy) {
//       const sortingCriteria = [];
//       options.sortBy.split(',').forEach((sortOption) => {
//         const [key, order] = sortOption.split(':');
//         sortingCriteria.push((order === 'desc' ? '-' : '') + key);
//       });
//       sort = sortingCriteria.join(' ');
//     } else {
//       sort = '-createdAt'; // Sort by createdAt field in descending order by default
//     }

//     let limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
//     const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
//     const skip = (page - 1) * limit;

//     // Set limit to null if not provided or less than or equal to zero
//     if (!options.limit || limit <= 0) {
//       limit = null;
//     }

//     const countPromise = this.countDocuments(filter).exec();
//     let docsPromise = this.find(filter)
//                           .sort(sort)
//                           .skip(skip)
//                           .limit(limit)
//                           .select('+createdAt +updatedAt'); // Ensure createdAt and updatedAt fields are included

//     if (options.populate) {
//       options.populate.split(',').forEach((populateOption) => {
//         docsPromise = docsPromise.populate(
//           populateOption
//             .split('.')
//             .reverse()
//             .reduce((a, b) => ({ path: b, populate: a }))
//         );
//       });
//     }

//     docsPromise = docsPromise.exec();

//     return Promise.all([countPromise, docsPromise]).then((values) => {
//       const [totalResults, results] = values;
//       const totalPages = Math.ceil(totalResults / (limit || 1)); // Avoid division by zero when limit is null

//       // Reverse results if the reverse option is true
//       if (options.reverse) {
//         results.reverse();
//       }

//       const result = {
//         results,
//         page,
//         limit,
//         totalPages,
//         totalResults,
//       };
//       return Promise.resolve(result);
//     });
//   };
// };

// module.exports = paginate;

/* eslint-disable prettier/prettier */
/* eslint-disable no-param-reassign */
const paginate = (schema) => {
  /**
   * @typedef {Object} QueryResult
   * @property {Document[]} results - Results found
   * @property {number} page - Current page
   * @property {number} limit - Maximum number of results per page
   * @property {number} totalPages - Total number of pages
   * @property {number} totalResults - Total number of documents
   */
  /**
   * Query for documents with pagination and search
   * @param {Object} [filter] - Mongo filter
   * @param {Object} [options] - Query options
   * @param {string} [options.sortBy] - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
   * @param {string} [options.populate] - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @param {boolean} [options.reverse] - Whether to reverse the order of the results (default = false)
   * @param {string} [options.search] - Search query text
   * @returns {Promise<QueryResult>}
   */
  schema.statics.paginate = async function (filter = {}, options = {}) {
    if (options.search) {
      filter.$text = { $search: options.search };
    }

    let sort = '';
    if (options.sortBy) {
      const sortingCriteria = [];
      options.sortBy.split(',').forEach((sortOption) => {
        const [key, order] = sortOption.split(':');
        sortingCriteria.push((order === 'desc' ? '-' : '') + key);
      });
      sort = sortingCriteria.join(' ');
    } else {
      sort = '-createdAt'; // Sort by createdAt field in descending order by default
    }

    const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
    const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
    const skip = (page - 1) * limit;

    const countPromise = this.countDocuments(filter).exec();
    let docsPromise = this.find(filter)
                          .sort(sort)
                          .skip(skip)
                          .limit(limit)
                          .select('+createdAt +updatedAt'); // Ensure createdAt and updatedAt fields are included

    if (options.populate) {
      options.populate.split(',').forEach((populateOption) => {
        docsPromise = docsPromise.populate(
          populateOption
            .split('.')
            .reverse()
            .reduce((a, b) => ({ path: b, populate: a }))
        );
      });
    }

    docsPromise = docsPromise.exec();

    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [totalResults, results] = values;
      const totalPages = Math.ceil(totalResults / (limit || 1)); // Avoid division by zero when limit is null

      // Reverse results if the reverse option is true
      if (options.reverse) {
        results.reverse();
      }

      const result = {
        results,
        page,
        limit,
        totalPages,
        totalResults,
      };
      return Promise.resolve(result);
    });
  };
};

module.exports = paginate;
