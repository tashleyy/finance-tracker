/**
 * Budget.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    year: {
      type: 'integer',
      required: true
    },
    month: {
      type: 'integer',
      required: true
    },
    category: {
      type: 'string',
      enum: ['Groceries', 'Dining', 'Entertainment', 'Utilities', 'Other'],
      defaultsTo: 'Other',
      required: true
    },
    max: {
      type: 'float',
      required: true
    },
    ownerId: {
      type: 'string',
      required: true
    }
  }
};
