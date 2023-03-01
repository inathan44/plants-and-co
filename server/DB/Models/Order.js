const Sequelize = require('sequelize');
const { db } = require('../index');

const Order = db.define('order', {
  promoRate: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 1,
    validate: {
      notEmpty: true,
      notNull: true,
      min: 0,
      max: 1,
    },
  },
  finalPrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
      min: 0,
    },
  },
  totalQty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
      min: 1,
    },
  },
});

Order.beforeValidate('finalPrice', (order) => {
  order.finalPrice *= 1 - order.promoRate;
});

module.exports = Order;
