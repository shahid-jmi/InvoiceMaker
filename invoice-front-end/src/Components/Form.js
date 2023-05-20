import React, { useState } from 'react';
import axios from 'axios';
const Form = () => {
    const [invoiceNumber, setInvoiceNumber] = useState('')
    const [customerName, setCustomerName] = useState('');
    const [invoiceDate, setInvoiceDate] = useState('');
    const [invoiceAmount, setInvoiceAmount] = useState('');
    const [address, setAddress] = useState('');
    const [invoiceDescription, setInvoiceDescription] = useState('');


    const handleInvoiceNumberChange = (event) => {
        setInvoiceNumber(event.target.value);
    };

    const handleCustomerNameChange = (event) => {
        setCustomerName(event.target.value);
    };

    const handleInvoiceDateChange = (event) => {
        setInvoiceDate(event.target.value);
    };

    const handleInvoiceAmountChange = (event) => {
        setInvoiceAmount(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setInvoiceDescription(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const invoice = {
            invoiceNumber: invoiceNumber,
            customerName: customerName,
            invoiceDate: invoiceDate,
            invoiceAmount: invoiceAmount,
            address: address,
            invoiceDescription: invoiceDescription,
        };
        console.log('invoice', invoice);

        const baseURL = 'http://localhost:3001';
        axios.post(`${baseURL}/api/invoice`, invoice, {
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => {
                console.log(response.data);

            })
            .catch((error) => {
                console.error(error);
            });
    };
    return (
        <>
            <div className="modal fade" id="createInvoice">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Create Invoice</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="invoiceNumber" className="form-label">
                                        Invoice Number
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="invoiceNumber"
                                        value={invoiceNumber}
                                        onChange={handleInvoiceNumberChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="customerName" className="form-label">
                                        Customer Name:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="customerName"
                                        value={customerName}
                                        onChange={handleCustomerNameChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="customerAddress" className="form-label">
                                        Address:
                                    </label>
                                    <input type="text" className="form-control" id="customerName" value={address} onChange={handleAddressChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="invoiceDate" className="form-label">
                                        Invoice Date:
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="invoiceDate"
                                        value={invoiceDate}
                                        onChange={handleInvoiceDateChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="invoiceDescription" className="form-label">
                                        Invoice Description:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="invoiceDescription"
                                        value={invoiceDescription}
                                        onChange={handleDescriptionChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="invoiceAmount" className="form-label">
                                        Invoice Amount:
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="invoiceAmount"
                                        value={invoiceAmount}
                                        onChange={handleInvoiceAmountChange}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Create Invoice
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Form;
