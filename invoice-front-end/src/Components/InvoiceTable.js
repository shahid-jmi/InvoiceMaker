import { useEffect, useState } from 'react';
import axios from 'axios';
const InvoiceTable = ({ invoices }) => {
    const [invoicesData, setInvoicesData] = useState([])
    useEffect(() => {
        const baseURL = 'http://localhost:3001';
        axios.get(`${baseURL}/api/invoice`, {
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => {
                const invoicesData = response.data;
                setInvoicesData(invoicesData);
            })
            .catch((error) => {
                console.error(error);
            });

    }, [])
    const handleViewClick = (invoiceId) => {
        const baseURL = 'http://localhost:3001';
        axios.get(`${baseURL}/api/generate-invoice?id=${invoiceId}`, {
            responseType: 'arraybuffer',
        }).then((response) => {
            const file = new Blob([response.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL, '_blank');
        })

    };

    const handleEmailClick = (invoiceId) => {
        const baseURL = 'http://localhost:3001';
        axios.get(`${baseURL}/api/email-invoice?id=${invoiceId}`, {
            headers: { 'Content-Type': 'application/json' },
        }).then((response) => {
            console.log(response)
        })
    };
    return (
        <>
            <table className="table card-body m-4 custom-table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Invoice Number</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Invoice Date</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {(invoicesData || []).map((invoice) => (
                        <tr key={invoice.id}>
                            <td>{invoice.id}</td>
                            <td>{invoice.invoiceNumber}</td>
                            <td>{invoice.customerName}</td>
                            <td>{invoice.invoiceDate}</td>
                            <td> <button className="btn btn-primary me-2" onClick={() => handleViewClick(invoice.id)}>View</button>
                                <button className="btn btn-success" onClick={() => handleEmailClick(invoice.id)}>Email</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default InvoiceTable;
