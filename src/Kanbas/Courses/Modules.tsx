export default function Modules() {
    return (
      <div>
        {/* Implement Collapse All button, View Progress button, etc. */}
        <div id="wd-modules-buttons">
            <button id="wd-button-collapse-all">Collapse All</button> <button id="wd-button-view-progess">View Progress</button> <select id="wd-select-publish">
                <option value="publish-all">Publish All</option>
                <option value="week1">Week1</option>
                <option value="week2">Week2</option>
                <option value="week3">Week3</option>
            </select> <button id="wd-button-module">+ Module</button>
        </div>

        <ul id="wd-modules">
          <li className="wd-module">
            <div className="wd-title">Week 1</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to the course</li>
                  <li className="wd-content-item">Learn what is Web Development</li>
                  <li className="wd-content-item">Creating a development environment</li>
                  <li className="wd-content-item">Creating a Web Application</li>
                </ul>
                <span className="wd-title">READING</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Full Stack Developer - Chapter 1 - Introduction</li>
                  <li className="wd-content-item">Full Stack Developer - Chapter 2 - Creating User Interfaces With HTML</li>
                </ul>
                <span className="wd-title">SLIDES</span>
                    <li className="wd-content-item">Introduction to Web Development</li>
                    <li className="wd-content-item">Creating an HTTP server with Node.js</li>
                    <li className="wd-content-item">Creating a React Application</li> 
              </li>
            </ul>
          </li>
          <li className="wd-module">
            <div className="wd-title">Week 2</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                    <li className="wd-content-item">Learn how to create user interfaces with HTML</li>
                    <li className="wd-content-item">Deploy the assignment to Netlify</li>
                </ul>
                <span className="wd-title">SLIDES</span>
                <ul className="wd-content">
                    <li className="wd-content-item">Embedding content with Iframes</li>
                    <li className="wd-content-item">Drawing with Scalable Vector Graphics</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
  );}
  