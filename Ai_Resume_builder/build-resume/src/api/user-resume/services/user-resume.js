'use strict';

/**
 * user-resume controller
 * user-resume service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-resume.user-resume');
