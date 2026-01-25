
export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description">
          The assignment is available online Submit a link to the landing page of
        </textarea>
        <br />
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>

          <label htmlFor="wd-assigments">Assignment Group</label>
          <select id="wd-assignments">
            <option value = "ASSIGNMENTS">ASSIGNMENTS</option>
            <option value = "QUIZZES">QUIZZES</option>
            <option value = "EXAMS">EXAMS</option>
            <option value = "PROJECT">PROJECT</option>
          </select>

          <h5></h5>
          <label htmlFor="wd-grade">Assignment Group</label>
          <select id="wd-grade">
            <option value = "percentage">percentage</option>
            <option value = "letter">letter</option>
          </select>

          <h5></h5>
          <label htmlFor="wd-submission">Submission Type</label>
          <select id="wd-submission">
            <option value = "online">online</option>
            <option value = "paper">paper</option>
          </select>
          
          <h5></h5>
          <label>Online Entry Options</label><br/>

          <input type="checkbox" name="check-entry" id="wd-chkbox-text"/>
          <label htmlFor="wd-chkbox-chkbox">Text Entry</label><br/>

          <input type="checkbox" name="check-entry" id="wd-chkbox-url"/>
          <label htmlFor="wd-chkbox-url">Website URL</label><br/>

          <input type="checkbox" name="check-entry" id="wd-chkbox-recording"/>
          <label htmlFor="wd-chkbox-recording">Media Recordings</label><br/>

          <h5></h5>
          <label htmlFor="wd-assign">Assign to</label>
          <input id="wd-assign" defaultValue="everyone" /><br /><br />


          <h5></h5>
          <label htmlFor="wd-due"> Due </label>
            <input type="date"
          defaultValue="2025-01-25"
          id="wd-text-fieldsdue-dob"/><br/>

          <h5></h5>
          <label htmlFor="wd-from"> Available from </label>
            <input type="date"
          defaultValue="2025-01-10"
          id="wd-from"/>

          <label htmlFor="wd-to"> Until </label>
            <input type="date"
          defaultValue="2025-01-30"
          id="wd-to"/>
        </table>
      </div>
  );}
  