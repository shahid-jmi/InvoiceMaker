import logo from './assets/yarikul-logo.png';
import Form from './Components/Form';
import InvoiceTable from './Components/InvoiceTable';

// Title component for display logo
const Logo = () => (
    <a href="/">
        <img className="logo" src={logo} alt="Yarikul Logo" />
    </a>
);

const App = () => {
    return (
        <div className="App">
            <div className="body">
                <Form />
                <header>
                    <div className="nav-bar">
                        <Logo />
                        <div className="nav-items">
                            <ul>
                                <li>Home</li>
                                <li>About</li>
                                <li>Contacts</li>
                            </ul>
                        </div>
                    </div>
                    <h1>Invoice Creator</h1>
                </header>
                <main >
                    <div className='card m-1'>
                        <div className="card-body title">
                            <h4>Invoices</h4>
                            <button className="round-button" data-bs-toggle="modal" data-bs-target="#createInvoice">
                                + Create Invoice
                            </button>
                        </div>
                        <InvoiceTable />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;
