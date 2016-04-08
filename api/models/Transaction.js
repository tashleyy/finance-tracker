/**
 * Transaction.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    amount: {
      type: 'float',
      required: true
    },
    accountName: {
      type: 'string',
      required: true
    },
    category: {
      type: 'string',
      enum: ['Online Services', 'Restaurants', 'Gasoline', 'Other', 'category-5'],
      defaultsTo: 'Other',
      required: true
    },
    merchant: {
      type: 'string',
      required: true
    },
    ownerId: {
      type: 'string',
      required: true
    },
    date: {
      type: 'date',
      required: true
    }
  }
};

