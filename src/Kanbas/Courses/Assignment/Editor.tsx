export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <h3><label htmlFor="wd-name">Assignment Name</label></h3>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description" rows={10} cols={40}>
          The assignment is available online Submit a link to the landing page of
        </textarea>
        <br /><br />
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={100} />
            </td>
          </tr>
          <br />
          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
                <select id="wd-group">
                    <option value="ASSIGNMENTS">Assignments</option>
                    <option value="LABS">Labs</option>
                </select>
            </td>
          </tr>
          <br />
          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
                <select id="wd-display-grade-as">
                    <option value="PERCENTAGE">Percentage</option>
                    <option value="POINTS">Points</option>
                </select>
            </td>
          </tr>
          <br />
          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
                <select id="wd-submission-type">
                    <option value="ONLINE">Online</option>
                    <option value="OFFLINE">Offline</option>
                </select> 
                <br />
                <br />
                <label htmlFor="wd-online-entry">Online Entry Options</label><br />
                <input type="checkbox" id="wd-text-entry" name="wd-online-entry" />
                <label htmlFor="wd-text-entry">Text Entry</label> <br />
                <input type="checkbox" id="wd-website-url" name="wd-online-entry" />
                <label htmlFor="wd-website-url">Website URL</label> <br />
                <input type="checkbox" id="wd-media-recordings" name="wd-online-entry" />
                <label htmlFor="wd-media-recordings">Media Recording</label> <br />
                <input type="checkbox" id="wd-student-annotation" name="wd-online-entry" />
                <label htmlFor="wd-student-annotation">Student Annotation</label> <br />
                <input type="checkbox" id="wd-file-upload" name="wd-online-entry" />
                <label htmlFor="wd-file-upload">File Upload</label> <br />
                <br />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-assign-to">Assign</label>
            </td>
            <td>
                <label htmlFor="wd-assign-to">Assign to</label><br />
                <input id="wd-assign-to" value="Everyone" /> <br /><br />
                <label htmlFor="wd-due-date">Due</label><br />
                <input type="date" id="wd-due-date" value="2024-05-13" /> <br /><br /> 
                <tr>
                    <td align="left" valign="top">
                    <label htmlFor="wd-available-from">Available from</label><br />
                    <input type="date" id="wd-available-from" value="2024-05-06" /><br />
                    </td>
                    <td>
                    <label htmlFor="wd-available-until">Until</label><br />
                    <input type="date" id="wd-available-until" value="2024-05-20" />
                    </td>
                </tr>
            </td>
          </tr>
        </table>
        <hr />
        <table width="100%">
            <tr>
                <td align="right">
                    <button type="button" id="wd-buttons">Cancel</button> <button type="button" id="wd-buttons">Save</button>
                </td>
            </tr>
        </table>
      </div>
  );}
  