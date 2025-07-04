import { useState } from 'react';
import './testhub.css';

const resources = [
    { name: 'Selenium Official', url: 'https://www.selenium.dev/' },
    { name: 'Cypress Docs', url: 'https://docs.cypress.io/' },
    { name: 'Playwright Docs', url: 'https://playwright.dev/docs/intro' },
    { name: 'Appium Docs', url: 'https://appium.io/docs/en/about-appium/intro/' },
    { name: 'Test Automation University', url: 'https://testautomationu.applitools.com/' },
    { name: 'Ministry of Testing', url: 'https://www.ministryoftesting.com/' },
    { name: 'Automation Panda', url: 'https://automationpanda.com/' },
];

const tutorials = [
    { title: 'Getting Started with Selenium', url: 'https://www.selenium.dev/documentation/' },
    { title: 'Cypress Crash Course', url: 'https://www.youtube.com/watch?v=7Nn0Q3imA3c' },
    { title: 'Playwright for Beginners', url: 'https://playwright.dev/docs/intro' },
    { title: 'API Testing with Postman', url: 'https://learning.postman.com/' },
];

export default function TestAutomationHub() {
    const [search, setSearch] = useState('');
    // const [form, setForm] = useState({ name: '', url: '', feedback: '' });
    // const [, setSubmitted] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // 👁️

    const filteredResources = resources.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase())
    );

    // const handleFormChange = e => {
    //     setForm({ ...form, [e.target.name]: e.target.value });
    // };

    // const handleFormSubmit = e => {
    //     e.preventDefault();
    //     setSubmitted(true);
    //     setForm({ name: '', url: '', feedback: '' });
    //     setTimeout(() => setSubmitted(false), 3000);
    // };

    const [regForm, setRegForm] = useState({
        username: '',
        password: '',
        email: '',
        phone: '',
        address: ''
    });

    const [regErrors, setRegErrors] = useState({});
    const [regSubmitted, setRegSubmitted] = useState(false);

    const passwordInfo = "Password must be at least 8 characters, include a number, an uppercase letter, and a special character.";

    const validateRegForm = () => {
        const errors = {};
        if (!regForm.username.trim()) errors.username = "Username is required.";
        if (!regForm.password) {
            errors.password = "Password is required.";
        } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(regForm.password)) {
            errors.password = "Password does not meet requirements.";
        }
        if (!regForm.email) {
            errors.email = "Email is required.";
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(regForm.email)) {
            errors.email = "Invalid email address.";
        }
        if (!regForm.phone) {
            errors.phone = "Phone number is required.";
        } else if (!/^\+?\d{10,15}$/.test(regForm.phone)) {
            errors.phone = "Invalid phone number.";
        }
        if (!regForm.address.trim()) errors.address = "Address is required.";
        return errors;
    };

    const handleRegChange = e => {
        setRegForm({ ...regForm, [e.target.name]: e.target.value });
    };

    const handleRegSubmit = e => {
        e.preventDefault();
        const errors = validateRegForm();
        setRegErrors(errors);
        if (Object.keys(errors).length === 0) {
            setRegSubmitted(true);
            setRegForm({ username: '', password: '', email: '', phone: '', address: '' });
            setTimeout(() => setRegSubmitted(false), 3000);
        }

    };

    return (
        <div className="automation-hub-container">
            <h1>Automation Testing Learning Hub</h1>
            <input
                type="text"
                placeholder="Search resources, tools, tutorials..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="search-bar"
            />

            <section>
                <h2>Popular Tools</h2>
                <div className="tool-buttons">
                    <a href="https://www.selenium.dev/" target="_blank" rel="noopener noreferrer"><button>Selenium</button></a>
                    <a href="https://www.cypress.io/" target="_blank" rel="noopener noreferrer"><button>Cypress</button></a>
                    <a href="https://playwright.dev/" target="_blank" rel="noopener noreferrer"><button>Playwright</button></a>
                    <a href="https://appium.io/" target="_blank" rel="noopener noreferrer"><button>Appium</button></a>
                    <a href="https://jmeter.apache.org/" target="_blank" rel="noopener noreferrer"><button>JMeter</button></a>
                    <a href="https://postman.com/" target="_blank" rel="noopener noreferrer"><button>Postman</button></a>
                </div>
            </section>

            <section>
                <h2>Resources</h2>
                <ul>
                    {filteredResources.map(r => (
                        <li key={r.url}>
                            <a href={r.url} target="_blank" rel="noopener noreferrer">{r.name}</a>
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Tutorials</h2>
                <div className="card-container">
                    {tutorials.map(t => (
                        <div className="blog-card" key={t.url}>
                            <a href={t.url} target="_blank" rel="noopener noreferrer">
                                <h3>{t.title}</h3>
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* <section>
                <h2>Suggest a Resource</h2>
                <form className="resource-form" onSubmit={handleFormSubmit}>
                    <input type="text" name="name" placeholder="Resource Name" value={form.name} onChange={handleFormChange} required />
                    <input type="url" name="url" placeholder="Resource URL" value={form.url} onChange={handleFormChange} required />
                    <textarea name="feedback" placeholder="Why do you recommend this resource?" value={form.feedback} onChange={handleFormChange} rows={3} />
                    <button type="submit">Submit</button>
                    {submitted && <div className="form-success">Thank you for your suggestion!</div>}
                </form>
            </section> */}

            <section>
                <h2>User Registration</h2>
                <form className="resource-form" onSubmit={handleRegSubmit} noValidate>
                    <input type="text" name="username" placeholder="Username" value={regForm.username} onChange={handleRegChange} />
                    {regErrors.username && <div className="form-error">{regErrors.username}</div>}

                    <div className="password-field">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={regForm.password}
                            onChange={handleRegChange}
                        />
                        <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "🙈" : "👁️"}
                        </span>
                    </div>
                    <div className="form-info">{passwordInfo}</div>
                    {regErrors.password && <div className="form-error">{regErrors.password}</div>}

                    <input type="email" name="email" placeholder="Email" value={regForm.email} onChange={handleRegChange} />
                    {regErrors.email && <div className="form-error">{regErrors.email}</div>}

                    <input type="tel" name="phone" placeholder="Phone Number" value={regForm.phone} onChange={handleRegChange} />
                    {regErrors.phone && <div className="form-error">{regErrors.phone}</div>}

                    <input type="text" name="address" placeholder="Address" value={regForm.address} onChange={handleRegChange} />
                    {regErrors.address && <div className="form-error">{regErrors.address}</div>}

                    <button type="submit">Submit</button>
                    {regSubmitted && <div className="form-success">Thank you for submitting!</div>}
                </form>
            </section>

            <section>
                <h2>Sample Test Table</h2>
                <table className="sample-table">
                    <thead>
                        <tr>
                            <th>Tool</th>
                            <th>Type</th>
                            <th>Platform</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Selenium</td>
                            <td>Web Automation</td>
                            <td>Cross-browser</td>
                        </tr>
                        <tr>
                            <td>Appium</td>
                            <td>Mobile Automation</td>
                            <td>Android/iOS</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section>
                <h2>Ask a Question / Feedback</h2>
                <form className="resource-form" onSubmit={e => { e.preventDefault(); alert('Thank you for your feedback!'); }}>
                    <input type="text" name="user" placeholder="Your Name (optional)" />
                    <textarea name="question" placeholder="Type your question or feedback here..." rows={3} required />
                    <button type="submit">Send</button>
                </form>
            </section>

            <section>
                <h2>Types of Buttons</h2>
                <div className="button-types">
                    <button>Standard Button</button>
                    <button disabled>Disabled Button</button>
                    <button className="btn-primary">Primary</button>
                    <button className="btn-outline">Outline</button>
                    <button onClick={() => alert('Clicked!')}>With Action</button>
                </div>
            </section>
            <section>
  <h2>Sample Test Cases</h2>
  <table className="sample-table">
    <thead>
      <tr>
        <th>Test Case</th>
        <th>Tool</th>
        <th>Steps</th>
        <th>Expected Result</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Login Functionality</td>
        <td>Selenium</td>
        <td>Open URL → Enter credentials → Click Login</td>
        <td>User is logged in and dashboard appears</td>
      </tr>
      <tr>
        <td>Search API Status</td>
        <td>Postman</td>
        <td>Send GET request to /search</td>
        <td>200 OK with JSON response</td>
      </tr>
    </tbody>
  </table>
</section>
<section>
  <h2>Practice Bug Reporting</h2>
  <form className="resource-form" onSubmit={(e) => { e.preventDefault(); alert("Bug submitted!"); }}>
    <input type="text" placeholder="Bug Title" required />
    <textarea placeholder="Bug Description" rows={3} required />
    <textarea placeholder="Steps to Reproduce" rows={3} required />
    <textarea placeholder="Actual Behavior" rows={3} required />
    <textarea placeholder="Expected Behavior" rows={3} required />
    <button type="submit">Submit Bug</button>
  </form>
</section>
<section>
  <h2>Automation in CI/CD</h2>
  <ul>
    <li>🛠 Run Selenium scripts via Jenkins</li>
    <li>📦 Execute Playwright tests in GitHub Actions</li>
    <li>✅ Get test reports on Slack via webhook</li>
  </ul>
</section>
<section>
  <h2>Test Execution Report</h2>
  <table className="sample-table">
    <thead>
      <tr>
        <th>Test</th>
        <th>Status</th>
        <th>Duration</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Login Test</td>
        <td style={{ color: 'green' }}>Passed</td>
        <td>2.4s</td>
      </tr>
      <tr>
        <td>Checkout Flow</td>
        <td style={{ color: 'red' }}>Failed</td>
        <td>5.1s</td>
      </tr>
    </tbody>
  </table>
</section>
<section>
  <h2>Test Automation Strategy</h2>
  <ul>
    <li>📌 Unit Tests: Fast, low-level (Jest, Mocha)</li>
    <li>🧪 Integration Tests: Test module interaction</li>
    <li>🌐 UI Tests: Selenium/Playwright for E2E</li>
    <li>⚙️ Run nightly on Jenkins, reports in Allure</li>
  </ul>
</section>
<section>
  <h2>Quick Automation Quiz</h2>
  <p>Q: Which tool is best for mobile automation?</p>
  <button onClick={() => alert('Correct! ✅')}>Appium</button>
  <button onClick={() => alert('Try again ❌')}>Cypress</button>
</section>

<section>
  <h2>Upload the file</h2>
  <form onSubmit={(e) => { e.preventDefault(); alert('File uploaded!'); }}>
    <input type="file" accept=".pdf,.doc,.docx" required />
    <button type="submit">Upload</button>
  </form>
</section>
        </div>
    );
}  