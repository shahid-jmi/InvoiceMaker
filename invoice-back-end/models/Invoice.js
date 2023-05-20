const { Model, DataTypes } = require('sequelize')
const sequelize = require('./database')
class Invoice extends Model { }

Invoice.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    invoiceNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    invoiceDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    invoiceAmount: {
        type: DataTypes.DECIMAL(10, 2),
    },
    invoiceDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "invoice"
})
module.exports = Invoice;