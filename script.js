const branchSelect = document.getElementById('branches');

const branches = {
  "BY": "BIO MEDICAL ENGINEERING (SS)",
  "CE": "CIVIL  ENGINEERING",
  "CM": "COMPUTER SCIENCE AND ENGINEERING (SS)",
  "CS": "COMPUTER SCIENCE AND ENGINEERING",
  "EC": "ELECTRONICS AND COMMUNICATION ENGINEERING",
  "EE": "ELECTRICAL AND ELECTRONICS ENGINEERING",
  "EL": "Electronics Engineering (VLSI Design and Technology) (SS)",
  "EM": "ELECTRONICS AND COMMUNICATION ENGINEERING (SS)",
  "GI": "GEO INFORMATICS",
  "IE": "INDUSTRIAL ENGINEERING",
  "IM": "INFORMATION TECHNOLOGY (SS)",
  "MA": "MATERIAL SCIENCE AND ENGINEERING (SS)",
  "ME": "MECHANICAL ENGINEERING",
  "MI": "MINING ENGINEERING",
  "MN": "MANUFACTURING ENGINEERING",
  "PT": "PRINTING & PACKING TECHNOLOGY",
  "XC": "CIVIL ENGINEERING (TAMIL MEDIUM)",
  "XM": "MECHANICAL ENGINEERING (TAMIL MEDIUM)",
  "AP": "APPAREL TECHNOLOGY (SS)",
  "CH": "CHEMICAL  ENGINEERING",
  "CL": "CHEMICAL  ENGINEERING (SS)",
  "CR": "CERAMIC TECHNOLOGY (SS)",
  "FS": "FOOD TECHNOLOGY (SS)",
  "IB": "INDUSTRIAL BIO TECHNOLOGY",
  "IS": "INDUSTRIAL BIO TECHNOLOGY (SS)",
  "LE": "LEATHER TECHNOLOGY",
  "PM": "PHARMACEUTICAL TECHNOLOGY (SS)",
  "PP": "PETROLEUM ENGINEERING AND TECHNOLOGY (SS)",
  "TX": "TEXTILE TECHNOLOGY",
  "BP": "B.Plan",
  "AE": "AERONAUTICAL ENGINEERING",
  "AT": "ARTIFICIAL INTELLIGENCE AND DATA SCIENCE (SS)",
  "AU": "AUTOMOBILE ENGINEERING",
  "EI": "ELECTRONICS AND INSTRUMENTATION ENGINEERING",
  "PR": "PRODUCTION ENGINEERING",
  "RA": "ROBOTICS AND AUTOMATION (SS)",
  "RP": "RUBBER AND PLASTIC TECHNOLOGY",
  "AM": "COMPUTER SCIENCE AND ENGINEERING (AI AND MACHINE LEARNING)",
  "CF": "COMPUTER SCIENCE AND ENGINEERING (DATA SCIENCE)",
  "CZ": "CIVIL AND STRUCTUTURAL ENGINEERING",
  "IT": "INFORMATION TECHNOLOGY",
  "MM": "MECHANICAL ENGINEERING (MANUFACTURING)",
  "AD": "Artificial Intelligence and Data Science",
  "CB": "COMPUTER SCIENCE AND BUSSINESS SYSTEM",
  "SC": "Computer Science and Engineering (Cyber Security)",
  "CO": "COMPUTER AND  COMMUNICATION ENGINEERING",
  "RM": "ROBOTICS AND AUTOMATION",
  "FD": "FOOD TECHNOLOGY",
  "BT": "BIO TECHNOLOGY",
  "AL": "Artificial Intelligence and Machine Learning",
  "CD": "COMPUTER SCIENCE AND DESIGN",
  "EA": "Electronics and Communication (Advanced Communication Technology)",
  "EV": "Electronics Engineering (VLSI Design and Technology)",
  "BM": "BIO MEDICAL ENGINEERING",
  "MD": "MEDICAL ELECTRONICS",
  "MU": "MECHANICAL AND AUTOMATION ENGINEERING",
  "PH": "PHARMACEUTICAL TECHNOLOGY",
  "MR": "MARINE ENGINEERING",
  "AG": "AGRICULTURAL ENGINEERING",
  "MZ": "Mechatronics Engineering",
  "PE": "PETROLEUM ENGINEERING",
  "CI": "Computer Science and Engineering (Internet of Things)",
  "MB": "Mechanical Engineering (Automobile)",
  "AO": "AEROSPACE ENGINEERING",
  "FT": "FASHION TECHNOLOGY",
  "CJ": "M.Tech. Computer Science and Engineering (Integrated 5 years)",
  "PA": "PLASTIC TECHNOLOGY",
  "DA": "Bachelor of Design",
  "IX": "Electronic Instrumentation and Control Engineering",
  "CY": "Cyber Security",
  "IC": "INSTRUMENTATION AND CONTROL ENGINEERING",
  "PC": "PETRO CHEMICAL TECHNOLOGY",
  "AS": "AUTOMOBILE ENGINEERING (SS)",
  "BS": "BIO TECHNOLOGY (SS)",
  "CG": "Computer Science and Engineering (Artificial Intelligence and Machine Learning) (SS)",
  "CN": "CIVIL  ENGINEERING (SS)",
  "ES": "ELECTRICAL AND ELECTRONICS (SANDWICH) (SS)",
  "FY": "FASHION TECHNOLOGY (SS)",
  "IY": "INSTRUMENTATION AND CONTROL ENGINEERING (SS)",
  "MF": "MECHANICAL ENGINEERING (SS)",
  "MS": "MECHANICAL ENGINEERING (SANDWICH) (SS)",
  "MT": "METALLURGICAL ENGINEERING",
  "MY": "METALLURGICAL ENGINEERING (SS)",
  "PN": "PRODUCTION ENGINEERING (SS)",
  "PS": "PRODUCTION ENGINEERING (SANDWICH) (SS)",
  "TT": "TEXTILE TECHNOLOGY (SS)",
  "EY": "ELECTRICAL AND ELECTRONICS ENGINEERING (SS)",
  "XS": "COMPUTER SCIENCE AND ENGINEERING (TAMIL)",
  "HT": "HANDLOOM AND TEXTILE TECHNOLOGY",
  "SF": "Safety and Fire Engineering",
  "TC": "TEXTILE CHEMISTRY",
  "EF": "Electrical and Computer Engineering",
  "EX": "Electronics and Computer Engineering",
  "TS": "Computer Science and Technology",
  "PD": "PETRO CHEMICAL ENGINEERING",
  "MO": "Mechanical and Mechatronics Engineering (Additive Manufacturing)",
  "SB": "Computer Science and Engineering (Internet of Things and Cyber Security including Block Chain Technology)",
  "EN": "ENVIRONMENTAL ENGINEERING",
  "BC": "Bio Technology and Bio Chemical Engineering",
  "CK": "Civil Engineering (Environmental Engineering)",
  "MJ": "Mechanical and Smart Manufacturing",
  "IN": "INDUSTRIAL ENGINEERING AND MANAGEMENT",
  "CW": "Computer Science and Business System (SS)",
  "ID": "Interior Design (SS)",
  "MG": "MECHATRONICS (SS)",
  "CC": "CHEMICAL AND ELECTRO CHEMICAL  ENGINEERING (SS)"
};

const computerCentricCodes = [
  "AD", "AL", "AM", "AT", "CB", "CD", "CF", "CG", "CI", "CJ", "CM", "CO", "CS", "CW", "CY",
  "EA", "EC", "EE", "EI", "EF", "EL", "ES", "EM", "IM", "EV", "EX", "IT", "SB", "SC", "TS"
];

const specialOption = document.createElement("option");
specialOption.value = "ALL_CS";
specialOption.textContent = "💻 All Computer-Centric Courses";
branchSelect.appendChild(specialOption);

for (const [code, name] of Object.entries(branches)) {
  const option = document.createElement("option");
  option.value = code;
  option.textContent = `${code} — ${name}`;
  branchSelect.appendChild(option);
}

const choices = new Choices(branchSelect, {
  removeItemButton: true,
  placeholderValue: "Select branches...",
  searchPlaceholderValue: "Type to search branches",
});

branchSelect.addEventListener('change', () => {
  const selected = choices.getValue(true);
  if (selected.includes("ALL_CS")) {
    choices.removeActiveItemsByValue("ALL_CS");
    computerCentricCodes.forEach(code => {
      if (!choices.getValue(true).includes(code)) {
        choices.setChoiceByValue(code);
      }
    });
  }
});

document.getElementById('predictForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const cutoff = parseFloat(document.getElementById('cutoff').value);
  const category = document.getElementById('category').value;
  const entries = parseInt(document.getElementById('entries').value);
  const selectedBranches = choices.getValue(true);

  if (isNaN(cutoff) || !category || isNaN(entries) || selectedBranches.length === 0) {
    alert("Please fill all fields correctly.");
    return;
  }

  try {
    const res = await fetch('data.json');
    const json = await res.json();
    const data = json.user;

    let results = [];

    for (const entry of data) {
      if (selectedBranches.includes(entry.brc) && entry[category] !== "") {
        const entryCutoff = parseFloat(entry[category]);
        if (!isNaN(entryCutoff) && entryCutoff <= cutoff) {
          results.push({
            college_name: entry.con,
            college_code: entry.coc,
            branch_name: entry.brn,
            branch_code: entry.brc,
            cutoff: entryCutoff
          });
        }
      }
    }

    results.sort((a, b) => b.cutoff - a.cutoff);
    results = results.slice(0, entries);

    const resultDiv = document.getElementById('results');
    resultDiv.innerHTML = results.length
      ? results.map(r =>
        `<div class="college-card">
          <strong>${r.college_name}</strong><br>
          <em>${r.branch_name}</em><br>
          <strong>Cutoff:</strong> ${r.cutoff}
        </div>`).join('')
      : `<p>No matching colleges found.</p>`;

  } catch (err) {
    console.error("Error fetching or processing data:", err);
    alert("Something went wrong while processing your request.");
  }
});
