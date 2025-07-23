import { useState } from 'react';
import './testhub.css';
import { Link } from 'react-router-dom';
import Photo from '../../Assets/Bug.png'


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

const initialReportData = [
  {
    testCaseId: 'TC001',
    testDescription: 'Verify login with valid credentials',
    status: 'Pass',
    executionTime: '5s',
    environment: 'Chrome',
    defectId: '-',
    executedBy: 'Selenium',
    timestamp: '2025-07-23 14:30',
  },
  {
    testCaseId: 'TC002',
    testDescription: 'Verify search API response',
    status: 'Fail',
    executionTime: '8s',
    environment: 'Firefox',
    defectId: 'BUG123',
    executedBy: 'Postman',
    timestamp: '2025-07-23 14:32',
  },
  {
    testCaseId: 'TC003',
    testDescription: 'Verify form submission',
    status: 'Skipped',
    executionTime: '0s',
    environment: 'Edge',
    defectId: '-',
    executedBy: 'Cypress',
    timestamp: '2025-07-23 14:35',
  },
];

export default function TestAutomationHub() {
    const [search, setSearch] = useState('');
    const [showPassword, setShowPassword] = useState(false); // 👁️
    const [regForm, setRegForm] = useState({
        username: '',
        password: '',
        email: '',
        phone: '',
        address: ''
    });

    const [regErrors, setRegErrors] = useState({});
    const [regSubmitted, setRegSubmitted] = useState(false);
    const [dragSuccess, setDragSuccess] = useState(false);

    const passwordInfo = "Password must be at least 8 characters, include a number, an uppercase letter, and a special character.";
    
    const filteredResources = resources.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
    );
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

    const handleDragStart = (e) => {
      e.dataTransfer.setData('text/plain', 'dragged-item');
      e.target.setAttribute('aria-grabbed', 'true');
        };

    const handleDragEnd = (e) => {
        e.target.setAttribute('aria-grabbed', 'false');
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e) => {
      e.preventDefault();
      const data = e.dataTransfer.getData('text/plain');
      if (data === 'dragged-item') {
        setDragSuccess(true);
        setTimeout(() => setDragSuccess(false), 3000);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setDragSuccess(true);
        setTimeout(() => setDragSuccess(false), 3000);
      }
    };

    const [tableData, setTableData] = useState([
      {
        testCase: 'Login Functionality',
        tool: 'Selenium',
        steps: 'Open URL → Enter credentials → Click Login',
        expectedResult: 'User is logged in and dashboard appears',
      },
      {
        testCase: 'Search API Status',
        tool: 'Postman',
        steps: 'Send GET request to /search',
        expectedResult: '200 OK with JSON response',
      },
      {
        testCase: 'Form Submission',
        tool: 'Cypress',
        steps: 'Fill form → Submit',
        expectedResult: 'Form submitted successfully',
      },
    ]);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const handleSort = (column) => {
      const newDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
      const sortedData = [...tableData].sort((a, b) => {
        const aValue = a[column].toLowerCase();
        const bValue = b[column].toLowerCase();
        if (aValue < bValue) return newDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return newDirection === 'asc' ? 1 : -1;
        return 0;
      });
      setTableData(sortedData);
      setSortColumn(column);
      setSortDirection(newDirection);
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
  <h2>Test Automation Strategy</h2>
  <ul>
    <li>📌 Unit Tests: Fast, low-level (Jest, Mocha)</li>
    <li>🧪 Integration Tests: Test module interaction</li>
    <li>🌐 UI Tests: Selenium/Cypress/Playwright for E2E</li>
    <li>⚙️ Run nightly on Jenkins, reports in Allure</li>
    <li>🛠 Run Automated scripts via Jenkins</li>
    <li>📦 Execute tests in GitHub Actions</li>
    <li>✅ Get test reports on Slack via webhook</li>
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

<section>
  <h2>Selectors</h2>
  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
    {/* Radio Buttons */}
    <div>
      <label><strong>Non Functional Test:</strong></label><br />
      <label>
        <input type="radio" name="radioOption" value="optiona" /> Accesibility Test
      </label>
      <label style={{ marginLeft: '1rem' }}>
        <input type="radio" name="radioOption" value="optionb" /> Performance Test
      </label>
      <label style={{ marginLeft: '1rem' }}>
        <input type="radio" name="radioOption" value="optionc" /> Security Test
      </label>
      <label style={{ marginLeft: '1rem' }}>
        <input type="radio" name="radioOption" value="optiond" /> All of them
      </label>
    </div>

    {/* Separator */}
    <div style={{ borderLeft: '2px solid #e0e0e0', height: '48px' }}></div>

    {/* Checkboxes */}
    <div>
      <label><strong>Non Functional Test:</strong></label><br />
      <label>
        <input type="checkbox" name="checkOptionA" /> Exploratory Test
      </label>
      <label style={{ marginLeft: '1rem' }}>
        <input type="checkbox" name="checkOptionB" />  A/B Test
      </label>
      <label style={{ marginLeft: '1rem' }}>
        <input type="checkbox" name="checkOptionC" /> Usability test
      </label>
    </div>

    {/* Separator */}
    <div style={{ borderLeft: '2px solid #e0e0e0', height: '48px' }}></div>

    {/* DateTime Picker */}
    <div>
      <label htmlFor="datetime"><strong>Date & Time:</strong></label><br />
      <input type="datetime-local" id="datetime" name="datetime" />
    </div>

    {/* Separator */}
    <div style={{ borderLeft: '2px solid #e0e0e0', height: '48px' }}></div>

    {/* Dropdown */}
    <div>
      <label htmlFor="selectorDropdown"><strong>Dropdown:</strong></label><br />
      <select id="selectorDropdown" className="dropdown-box" defaultValue="">
        <option value="" disabled></option>
        <option value="option1">Smoke Test</option>
        <option value="option2">Sanity Test </option>
        <option value="option3"> Regression test</option>
      </select>
    </div>
  </div>
</section>

<section>
  <h2>Image Navigation</h2>
  <div className="image-cropper ">

  <Link to="/about">
    <img src={Photo}
    //   src="https://via.placeholder.com/180x100?text=About+Me"
      alt="About Me"
      className='image'
    />
  </Link>
<img src={Photo} alt="Logo" className="image" />
</div>
</section>

<section>
  <h2>Quiz: Test Automation</h2>
  <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
    {/* Question 1 */}
   <div className="quiz-question" style={{ minWidth: 220 }}>
      <p>1. What is Test Automation?</p>
      <div onChange={e => {
        if (e.target.value === "d") {
          alert("Correct! ✅\nTest automation is all of the above: automating manual testing, using tools to execute tests, and increasing testing speed.");
        } else if (e.target.value) {
          alert("Try again ❌");
        }
      }}>
        <label>
          <input type="radio" name="quiz1" value="a" /> a) Automating manual testing
        </label><br />
        <label>
          <input type="radio" name="quiz1" value="b" /> b) Using tools to execute tests
        </label><br />
        <label>
          <input type="radio" name="quiz1" value="c" /> c) Increasing testing speed
        </label><br />
        <label>
          <input type="radio" name="quiz1" value="d" /> d) All of the above
        </label>
      </div>
    </div>
    {/* Separator */}
    <div style={{ borderLeft: '2px solid #e0e0e0', height: '100px' }}></div>
    
    {/* Question 2 */}
   <div className="quiz-question" style={{ minWidth: 220 }}>
      <p>2. What is a Test Automation Framework?</p>
      <div onChange={e => {
        if (e.target.value === "b") {
          alert("Correct! ✅\nA test automation framework is a structured approach to organizing tests for maintainability and scalability.");
        } else if (e.target.value) {
          alert("Try again ❌");
        }
      }}>
        <label>
          <input type="radio" name="quiz2" value="a" /> a) A collection of test scripts
        </label><br />
        <label>
          <input type="radio" name="quiz2" value="b" /> b) A structured approach to organizing tests
        </label><br />
        <label>
          <input type="radio" name="quiz2" value="c" /> c) A type of testing tool
        </label><br />
        <label>
          <input type="radio" name="quiz2" value="d" /> d) A way to manage test data
        </label>
      </div>
    </div>
       {/* Separator */}
    <div style={{ borderLeft: '2px solid #e0e0e0', height: '100px' }}></div>
    {/* Question 3 */}
   <div className="quiz-question" style={{ minWidth: 220 }}>
      <p>3. What is the purpose of an assertion in test automation?</p>
      <div onChange={e => {
        if (e.target.value === "b") {
          alert("Correct! ✅\nAssertions verify that the actual outcome matches the expected outcome in a test.");
        } else if (e.target.value) {
          alert("Try again ❌");
        }
      }}>
        <label>
          <input type="radio" name="quiz3" value="a" /> a) To define test data
        </label><br />
        <label>
          <input type="radio" name="quiz3" value="b" /> b) To verify expected outcomes
        </label><br />
        <label>
          <input type="radio" name="quiz3" value="c" /> c) To start a test
        </label><br />
        <label>
          <input type="radio" name="quiz3" value="d" /> d) To stop a test
        </label>
      </div>
    </div>
  </div>
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
          <h2>Drag and Drop</h2>
          <div className="drag-drop">
            <div
              className="draggable"
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="button"
              aria-grabbed="false"
              aria-label="Drag this item to the drop zone"
            >
              Drag Me
            </div>
            <div
              className="drop-zone"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="region"
              aria-dropeffect="move"
              aria-label="Drop zone for draggable item"
            >
              Drop Here
            </div>
          </div>
          {dragSuccess && <div className="form-success">Item dropped successfully!</div>}
          <p>
            Use Selenium (Actions class) or Cypress (drag command) to automate dragging the item to the drop zone. Check for the success message.
          </p>
        </section>

        <section>
          <h2>Sortable Data Tables</h2>
          <table className="sample-table" aria-label="Sortable test cases table">
            <thead>
              <tr>
                <th
                  scope="col"
                  onClick={() => handleSort('testCase')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSort('testCase');
                    }
                  }}
                  tabIndex={0}
                  aria-sort={sortColumn === 'testCase' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                  role="button"
                  aria-label="Sort by Test Case"
                >
                  Test Case {sortColumn === 'testCase' && (sortDirection === 'asc' ? '▲' : '▼')}
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort('tool')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSort('tool');
                    }
                  }}
                  tabIndex={0}
                  aria-sort={sortColumn === 'tool' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                  role="button"
                  aria-label="Sort by Tool"
                >
                  Tool {sortColumn === 'tool' && (sortDirection === 'asc' ? '▲' : '▼')}
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort('steps')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSort('steps');
                    }
                  }}
                  tabIndex={0}
                  aria-sort={sortColumn === 'steps' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                  role="button"
                  aria-label="Sort by Steps"
                >
                  Steps {sortColumn === 'steps' && (sortDirection === 'asc' ? '▲' : '▼')}
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort('expectedResult')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSort('expectedResult');
                    }
                  }}
                  tabIndex={0}
                  aria-sort={sortColumn === 'expectedResult' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                  role="button"
                  aria-label="Sort by Expected Result"
                >
                  Expected Result {sortColumn === 'expectedResult' && (sortDirection === 'asc' ? '▲' : '▼')}
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.testCase}</td>
                  <td>{row.tool}</td>
                  <td>{row.steps}</td>
                  <td>{row.expectedResult}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
             Automate clicking a column header and verify the rows are sorted correctly. Check the first row’s content to confirm.
          </p>
        </section>

        </div>
    );
    
}  