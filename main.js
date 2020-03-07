document
  .getElementById("issueInputForm")
  .addEventListener("submit", submitIssue);
var issueNo = 0;
var issueSolvedNo = 0;

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue("issueDescription");
  const severity = getInputValue("issueSeverity");
  const assignedTo = getInputValue("issueAssignedTo");
  if (description == "") {
    alert("Please Inpute Description Field Correctly.");
    fetchIssues();
  } else if (assignedTo == "") {
    alert("Please Assaign The Problem To Someone.");
    fetchIssues();
  } else {
    const id = Math.floor(Math.random() * 100000000) + "";
    const status = "Open";

    const issue = { id, description, severity, assignedTo, status };
    let issues = [];
    if (localStorage.getItem("issues")) {
      issues = JSON.parse(localStorage.getItem("issues"));
    }
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));

    document.getElementById("issueInputForm").reset();
    // issue no
    localStorage.setItem("issueNo", ++issueNo);
    fetchIssues();
    e.preventDefault();
  }
}

const setStatusClosed = id => {
  const issues = JSON.parse(localStorage.getItem("issues"));

  const currentIssue = issues.find(issues => issues.id === id.toString());

  currentIssue.status = "Closed";

  currentIssue.description =
    "<strike>" + currentIssue.description + "</strike>";
  localStorage.setItem("issues", JSON.stringify(issues));
  localStorage.setItem("issueSolvedNo", ++issueSolvedNo);
  // document.querySelector("#close" + id).disabled = true;

  fetchIssues();
};

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const currentIssue = issues.find(issues => issues.id === id.toString());
  if (currentIssue.status == "Closed") {
    const remainingIssues = issues.filter(issues => issues.id != id);

    localStorage.setItem("issues", JSON.stringify(remainingIssues));

    if (localStorage.getItem("issueNo")) {
      issueNo = parseInt(localStorage.getItem("issueNo"));
      localStorage.setItem("issueNo", --issueNo);
      // localStorage.setItem("issueSolvedNo", --issueSolvedNo);
    }
    if (localStorage.getItem("issueSolvedNo")) {
      issueSolvedNo = parseInt(localStorage.getItem("issueSolvedNo"));
      localStorage.setItem("issueSolvedNo", --issueSolvedNo);
      // localStorage.setItem("issueSolvedNo", --issueSolvedNo);
    }

    fetchIssues();
  } else {
    alert("Issue Is Not Checked OR Closed Yet!");
    fetchIssues();
  }
};

// Btn Diasble

// function btnDisable(id) {
//   console.log(id);

//   document.querySelector("#close" + id).className += "btn-danger";
//   // document.querySelector("#close" + id).classList.remove("btn-warning");
// }

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const issuesList = document.getElementById("issuesList");
  issuesList.innerHTML = "";
  if (issues) {
    for (var i = 0; i < issues.length && issues.length != null; i++) {
      const { id, description, severity, assignedTo, status } = issues[i];

      if (status == "Closed") {
        issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning" id="close${id}" disabled>Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
      } else {
        issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning" id="close${id}">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
      }
    }
    issueCount();
  }
};

function issueCount() {
  document.getElementById("IR").innerHTML = localStorage.getItem("issueNo");
  document.getElementById("IS").innerHTML =
    localStorage.getItem("issueNo") - localStorage.getItem("issueSolvedNo");
}

// Issues List
/*
 1. Delete Button Not Working
 2. issues.length  null error
 3. close button => to strike through 
 4.empty form submission
 5. issue can be deleted with closing or checking  it
 6.not keeping the number solved issue and unsolved issue
*/
