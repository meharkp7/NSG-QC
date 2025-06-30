// EMP ID Mapping
const empIDMap = {
  "Vijay Khanna": "TMP-002",
  "Farha Mughees": "TMP-003",
  "Subhankar Jana": "TMP-004",
  "Soukat Kazi": "TMP-005",
  "Dibyajiban Parida": "TMP-015",
  "Sidharth Kumar Rout": "TMP-007",
  "Nilanjana Banjare": "TMP-008",
  "Rashi Verma": "TMP-009",
  "Aakansha Karki": "TMP-010",
  "Ram Singh": "TMP-33",
  "Divya Tyagi": "TMP-021",
  "Kashish Kumari": "TMP-022",
  "Md. Rashid": "TMP-023",
  "Ankur Das": "TMP-024",
  "Sudhir Kumar Prasad": "TMP-026",
  "Sandeep": "TMP-029",
  "Kiran": "TMP-006",
  "Akshat Singh": "TMP-027",
  "Muskan Rajput": "TMP-018",
  "Sakshi": "TMP-019",
  "Priynaka": "TMP-030",
  "Mohit Saini": "TMP-031",
  "Srinjoy Roy": "TMP-032",
  "Abhishak Chauhan": "N03055",
  "Ashok Kumar": "N04843",
  "Vikky Kataria": "N03214",
  "Sandeep Rawat": "N07061",
  "Arvind Kumar Jeminy": "N07071",
  "Ram Niwas": "N03438",
  "Krishan Kumar": "N07041",
  "Mehar Chand": "N07043",
  "Sonu": "N03807",
  "Krishan Kumar Patel": "N03792",
  "Praveen Sharma": "N03455",
  "Usha Samberwal": "N07078",
  "Manendra": "N07057",
  "Abhinav": "N07058",
  "Satyam Thandar": "N07077",
  "Pankaj Kumar": "N07074",
  "Vinay": "N07070",
  "Aarti Kumari": "N07073",
  "Imraan Khan": "N07060",
  "Neeraj Singh": "N07059",
  "Balvinder Singh": "N07064",
  "Anjana": "N07068",
  "Pradip Das": "N07075",
  "Shyam Sunder Maurya": "N06435",
  "Yogesh Kumar": "N07079",
  "Vinod Triphati": "N07080",
  "Rahul Bhartari": "N07076",
  "Bhaskar": "N06425",
  "Surrender Singh": "N00178",
  "Vipin Updhyay": "N03971",
  "Anish Kumar": "N03888",
  "Sushil Bassi": "N00896",
  "Soman": "N07082",
  "Anuj Kumar": "N07067",
  "Rahul Pandey": "N07066",
  "Shiva Krishna": "N07040",
  "Shanish": "N03779",
  "Manish Kumar": "N03973"
};

// Fill EMP ID based on morning user name
function fillEmpID() {
  const name = document.getElementById("userName").value;
  document.getElementById("empID").value = empIDMap[name] || "";
}

// Fill EMP ID based on evening user name
function fillEmpIDEvening() {
  const name = document.getElementById("userNameEvening").value;
  document.getElementById("empIDEvening").value = empIDMap[name] || "";
}

// Toggle between Morning and Evening Modes
function toggleMode() {
  const mode = document.getElementById("mode").value;
  const morningDiv = document.querySelector(".morning");
  const eveningDiv = document.querySelector(".evening");

  if (mode === "morning") {
    morningDiv.style.display = "block";
    eveningDiv.style.display = "none";
    const now = new Date();
    document.getElementById("startDate").value = now.toLocaleDateString();
    document.getElementById("startTime").value = now.toLocaleTimeString();
  } else {
    morningDiv.style.display = "none";
    eveningDiv.style.display = "block";
    const now = new Date();
    document.getElementById("endTime").value = now.toLocaleTimeString();
  }
}

// Submit with 15-second delay
function submitForm() {
  const submitBtn = document.querySelector("button[onclick='submitForm()']");
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  const mode = document.getElementById("mode").value;

  const data = {
    mode,
    teamLead: document.getElementById("teamLead")?.value || "",
    userName: document.getElementById("userName")?.value || "",
    empID: document.getElementById("empID")?.value || "",
    userNameEvening: document.getElementById("userNameEvening")?.value || "",
    empIDEvening: document.getElementById("empIDEvening")?.value || "",
    workType: document.getElementById("workType")?.value || "",
    imageNo: document.getElementById("imageNo")?.value || "",
    imageNoEvening: document.getElementById("imageNoEvening")?.value || "",
    layer: document.getElementById("layer")?.value || "",
    startDate: document.getElementById("startDate")?.value || "",
    startTime: document.getElementById("startTime")?.value || "",
    workPercent: document.getElementById("workPercent")?.value || "",
    status: document.getElementById("status")?.value || "",
    endTime: document.getElementById("endTime")?.value || "",
    remarks: document.getElementById("remarks")?.value || ""
  };

  fetch("https://script.google.com/macros/s/AKfycbzA-o28IlaRk9CyMItc_05gHQHrShr75KQhXsBJ_Gsbv9318F8oHko-VqrUyVtS8cOn/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(response => {
    if (response === "Success") {
      alert("Submitted successfully!");
      document.getElementById("entryForm").reset();
      toggleMode();
    } else if (response === "DUPLICATE") {
      alert("Duplicate entry! This submission was already recorded.");
    } else {
      alert("Something went wrong. Please try again.");
    }
  })
  .catch(err => {
    alert("Network error. Please check your connection.");
    console.error(err);
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
  });
}

// Initialize on page load
window.onload = () => {
  toggleMode();
};
