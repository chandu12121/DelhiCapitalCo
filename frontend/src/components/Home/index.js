import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './index.css';

const Home = () => {
    const navigator = useNavigate();
    const [initialInvoices, setInvoices] = useState([]);
    const [formData, setFormData] = useState({
        invoiceNumber: 0,
        clientName: "",
        amount: 0,
        date: "",
        status: "Pending",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const statusOptions = ["Paid", "Unpaid", "Pending"];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === "amount" || name === "invoiceNumber" ? Number(value) : value,
        }));
    };

    const handleAddInvoice = (e) => {
        e.preventDefault();
        const { invoiceNumber, clientName, amount, date } = formData;
        if (clientName && amount > 0 && date && invoiceNumber) {
            if (isEditing) {
                const updatedInvoices = initialInvoices.map((invoice) =>
                    invoice.invoiceNumber === editId ? { ...formData } : invoice
                );
                setInvoices(updatedInvoices);
                setIsEditing(false);
                setEditId(null);
            } else {
                setInvoices([...initialInvoices, formData]);
            }
            setFormData({
                invoiceNumber: 0,
                clientName: "",
                amount: 0,
                date: "",
                status: "Pending",
            });
        } else {
            alert("Please fill in all fields with valid data");
        }
    };

    const handleEdit = (id) => {
        const invoiceToEdit = initialInvoices.find((invoice) => invoice.invoiceNumber === id);
        if (invoiceToEdit) {
            setIsEditing(true);
            setFormData(invoiceToEdit);
            setEditId(id);
        }
    };

    const handleDeleteInvoice = (id) => {
        setInvoices(initialInvoices.filter((invoice) => invoice.invoiceNumber !== id));
    };

    const handleLogout = () => {
        navigator("/");
    };

    return (
        <div className="home-container">
            <header className="header">
                <h1>Invoice Manager</h1>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </header>
            <main className="main-content">
                <form className="invoice-form" onSubmit={handleAddInvoice}>
                    <h2>{isEditing ? "Edit Invoice" : "Add Invoice"}</h2>
                    <div className="form-group">
                        <label htmlFor="invoiceNumber">Invoice Number</label>
                        <br/>
                        <input
                            type="number"
                            id="invoiceNumber"
                            name="invoiceNumber"
                            value={formData.invoiceNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="clientName">Client Name</label>
                        <br/>
                        <input
                            type="text"
                            id="clientName"
                            name="clientName"
                            value={formData.clientName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                        <br/>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <br/>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <br/>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            required
                        >
                            {statusOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="submit-btn" type="submit">
                        {isEditing ? "Update Invoice" : "Add Invoice"}
                    </button>
                </form>
                <section className="invoice-list">
                    <h2>Invoices</h2>
                    <ul>
                        {initialInvoices.map((invoice) => (
                            <li key={invoice.invoiceNumber} className="invoice-item">
                                <div><strong>Invoice Number:</strong> {invoice.invoiceNumber}</div>
                                <div><strong>Client Name:</strong> {invoice.clientName}</div>
                                <div><strong>Amount:</strong> {invoice.amount}</div>
                                <div><strong>Date:</strong> {invoice.date}</div>
                                <div><strong>Status:</strong> {invoice.status}</div>
                                <button
                                    className="edit-btn"
                                    onClick={() => handleEdit(invoice.invoiceNumber)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDeleteInvoice(invoice.invoiceNumber)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default Home;
