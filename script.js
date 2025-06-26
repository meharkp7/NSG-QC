const empIDMap = {
  "Vijay Khanna": "TMP-002", "Farha Mughees": "TMP-003", "Subhankar Jana": "TMP-004",
  "Soukat Kazi": "TMP-005", "Dibyajiban Parida": "TMP-015", "Sidharth Kumar Rout": "TMP-007",
  "Nilanjana Banjare": "TMP-008", "Rashi Verma": "TMP-009", "Aakansha Karki": "TMP-010",
  "Ram Singh": "TMP-33", "Divya Tyagi": "TMP-021", "Kashish Kumari": "TMP-022",
  "Md. Rashid": "TMP-023", "Ankur Das": "TMP-024", "Sudhir Kumar Prasad": "TMP-026",
  "Sandeep": "TMP-029", "Kiran": "TMP-006", "Akshat Singh": "TMP-027",
  "Muskan Rajput": "TMP-018", "Sakshi": "TMP-019", "Priynaka": "TMP-030",
  "Mohit Saini": "TMP-031", "Srinjoy Roy": "TMP-032"
};

window.onload = () => {
  const now = new Date();
  document.getElementById('startDate').value = now.toLocaleDateString();
  document.getElementById('startTime').value = now.toLocaleTimeString();
  document.getElementById('endTime').value = now.toLocaleTimeString();
  toggleMode();
};

function fillEmpID() {
  const user = document.getElementById("userName").value;
  document.getElementById("empID").value = empIDMap[user] || "NA";
}

function fillEmpIDEvening() {
  const user = document.getElementById("userNameEvening").value;
  const empID = empIDMap[user] || "NA";
  document.getElementById("empIDEvening").value = empID;

  if (!user) return;

  const url = `https://script.google.com/macros/s/AKfycbzQuwTCWSUPJqILF1qTotCYch_EEbrwAtgkau2KK4ST4MNwwLdwcN9XLBLm7zQAtsoI/exec?username=${encodeURIComponent(user)}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.found) {
        document.getElementById("imageNoEvening").value = data.imageNo || "";
        document.getElementById("layer").value = data.layer || "";
        document.getElementById("startDate").value = data.startDate || "";
        document.getElementById("startTime").value = data.startTime || "";
      } else {
        console.warn("No matching morning data found for:", user);
      }
    })
    .catch(err => {
      console.error("Error fetching morning data:", err);
    });
}

function toggleMode() {
  const mode = document.getElementById("mode").value;
  document.querySelector(".morning").style.display = mode === "morning" ? "" : "none";
  document.querySelector(".evening").style.display = mode === "evening" ? "" : "none";

  const now = new Date();
  if (mode === "morning") {
    document.getElementById('startDate').value = now.toLocaleDateString();
    document.getElementById('startTime').value = now.toLocaleTimeString();
  } else {
    document.getElementById('endTime').value = now.toLocaleTimeString();
  }
}

function submitForm() {
  const mode = document.getElementById("mode").value;

  const data = {
    mode,
    teamLead: document.getElementById("teamLead").value || "NA",
    userName: document.getElementById("userName").value || "",
    empID: document.getElementById("empID").value || "",
    userNameEvening: document.getElementById("userNameEvening").value || "",
    empIDEvening: document.getElementById("empIDEvening").value || "",
    workType: document.getElementById("workType").value || "",
    imageNo: document.getElementById("imageNo").value || "",
    imageNoEvening: document.getElementById("imageNoEvening").value || "",
    layer: document.getElementById("layer").value || "",
    startDate: document.getElementById("startDate").value || "",
    startTime: document.getElementById("startTime").value || "",
    workPercent: document.getElementById("workPercent").value || "",
    status: document.getElementById("status").value || "",
    endDate: new Date().toLocaleDateString(),
    endTime: document.getElementById("endTime").value || "",
    remarks: document.getElementById("remarks").value || ""
  };

  fetch("https://script.google.com/macros/s/AKfycbzQuwTCWSUPJqILF1qTotCYch_EEbrwAtgkau2KK4ST4MNwwLdwcN9XLBLm7zQAtsoI/exec", {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(() => {
    alert("Submitted successfully!");
    document.getElementById("entryForm").reset();
    document.getElementById("startTime").value = new Date().toLocaleTimeString();
    document.getElementById("endTime").value = new Date().toLocaleTimeString();
  });
}