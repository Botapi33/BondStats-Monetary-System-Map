const bondStatsBaseUrl = "https://www.bondstats.org";

const nodes = {
  "central-banks": {
    title: "Central Banks",
    category: "Core system",
    impact: "High impact",
    group: "core",
    keywords: "central banks federal reserve ecb monetary policy liquidity interest rates reserves",
    text: "Central banks influence liquidity, interest rates, and confidence in money. Their policy choices affect banks, bonds, currencies, inflation, and the real economy.",
    link: "/learn/central-banks-explained"
  },
  "commercial-banks": {
    title: "Commercial Banks",
    category: "Core system",
    impact: "Money creation",
    group: "core",
    keywords: "commercial banks deposits lending money creation fractional reserve banking credit",
    text: "Commercial banks create most modern money through lending. Loans create deposits, linking credit growth directly to money creation and economic activity.",
    link: "/learn/fractional-reserve-banking"
  },
  "government": {
    title: "Government",
    category: "Core system",
    impact: "Fiscal authority",
    group: "core",
    keywords: "government treasury spending taxation deficits debt issuance fiscal policy",
    text: "Governments tax, spend, borrow, and issue debt. Their financing decisions connect public budgets with bond markets and investor demand.",
    link: "/learn/government-bonds"
  },
  "bond-market": {
    title: "Bond Market",
    category: "Core system",
    impact: "Pricing money over time",
    group: "core",
    keywords: "bond market treasury bonds yields yield curve sovereign debt government bonds",
    text: "Bond markets determine the cost of borrowing across time. Yields transmit expectations about inflation, growth, central banks, and sovereign risk.",
    link: "/learn/what-are-bonds"
  },
  "investors": {
    title: "Investors",
    category: "Core system",
    impact: "Capital allocation",
    group: "core",
    keywords: "investors pension funds insurance companies asset managers foreign central banks sovereign wealth funds",
    text: "Investors allocate capital across bonds, equities, currencies, commodities, and real assets. Their decisions turn savings into market prices.",
    link: "/learn/capital-flows"
  },
  "financial-markets": {
    title: "Financial Markets",
    category: "Core system",
    impact: "Price discovery",
    group: "core",
    keywords: "financial markets stocks bonds commodities currencies risk assets prices liquidity",
    text: "Financial markets price risk, liquidity, growth, and future expectations. They connect policy, capital, and the real economy through asset prices.",
    link: "/learn/financial-markets"
  },
  "real-economy": {
    title: "Real Economy",
    category: "Core system",
    impact: "Output and employment",
    group: "core",
    keywords: "real economy consumers businesses employment wages output investment consumption",
    text: "The real economy is where households work, businesses invest, goods are produced, and income is spent. Monetary conditions eventually reach this layer.",
    link: "/learn/economy-explained"
  },
  "interest-rates": {
    title: "Interest Rates",
    category: "Policy",
    impact: "Cost of money",
    group: "policy",
    keywords: "interest rates policy rates borrowing costs central bank rates discount rate",
    text: "Interest rates influence borrowing, saving, asset prices, currencies, and bond yields. They are one of the primary channels of monetary policy.",
    link: "/learn/interest-rates"
  },
  "inflation": {
    title: "Inflation",
    category: "Risk",
    impact: "Purchasing power",
    group: "risk",
    keywords: "inflation prices purchasing power cpi cost of living money value",
    text: "Inflation reduces purchasing power and changes the real value of money. It affects interest rates, bond yields, wages, currencies, and central bank policy.",
    link: "/learn/inflation-explained"
  },
  "qe-qt": {
    title: "QE / QT",
    category: "Policy",
    impact: "Balance sheet policy",
    group: "policy",
    keywords: "quantitative easing quantitative tightening qe qt asset purchases liquidity reserves balance sheet",
    text: "Quantitative easing injects liquidity by purchasing financial assets. Quantitative tightening reduces liquidity by shrinking central bank balance sheets.",
    link: "/learn/quantitative-easing"
  },
  "currencies": {
    title: "Currencies",
    category: "Global",
    impact: "Exchange rates",
    group: "global",
    keywords: "currencies exchange rates fx dollar euro yen pound swiss franc",
    text: "Currencies connect national monetary systems. Exchange rates move with interest rates, inflation, capital flows, confidence, and trade balances.",
    link: "/learn/why-currencies-rise-and-fall"
  },
  "reserve-currencies": {
    title: "Reserve Currencies",
    category: "Global",
    impact: "International trust",
    group: "global",
    keywords: "reserve currencies dollar euro central bank reserves foreign exchange reserves",
    text: "Reserve currencies are held by central banks and governments for trade, reserves, and financial stability. They sit at the core of global monetary power.",
    link: "/learn/reserve-currencies"
  },
  "dollar-system": {
    title: "Dollar System",
    category: "Global",
    impact: "Global financial backbone",
    group: "global",
    keywords: "dollar system usd treasury market petrodollar eurodollar reserve currency global finance",
    text: "The Dollar system links trade, reserves, commodities, banking, and Treasury markets. It gives the U.S. Dollar a central role in global finance.",
    link: "/learn/the-dollar-system"
  },
  "capital-flows": {
    title: "Capital Flows",
    category: "Global",
    impact: "Cross-border movement",
    group: "global",
    keywords: "capital flows investment cross border flows global liquidity foreign investment reserves",
    text: "Capital flows move savings across borders. They influence currencies, bond yields, financial stability, and the balance of power between economies.",
    link: "/learn/capital-flows"
  },
  "currency-crises": {
    title: "Currency Crises",
    category: "Risk",
    impact: "Confidence breakdown",
    group: "risk",
    keywords: "currency crisis depreciation capital flight inflation reserves devaluation confidence",
    text: "Currency crises occur when confidence breaks down and a currency rapidly loses value. They often expose deeper problems in debt, reserves, inflation, or policy credibility.",
    link: "/learn/currency-crisis"
  }
};

const moduleDescriptions = [
  ["Money Creation", "How bank lending expands deposits and increases the money supply.", "/learn/how-money-is-created"],
  ["Government Bonds", "How sovereign debt connects governments, investors, and central banks.", "/learn/government-bonds"],
  ["Reserve Currencies", "Why some currencies become central to global reserves and trade.", "/learn/reserve-currencies"],
  ["Currency Crises", "What happens when confidence in a currency breaks down.", "/learn/currency-crisis"],
  ["Quantitative Easing", "How central banks create liquidity through asset purchases.", "/learn/quantitative-easing"],
  ["The Dollar System", "Why the U.S. Dollar remains central to global finance.", "/learn/the-dollar-system"],
  ["Inflation", "How rising prices change purchasing power and monetary policy.", "/learn/inflation-explained"],
  ["Capital Flows", "How money moves across borders and reshapes markets.", "/learn/capital-flows"]
];

const nodeButtons = [...document.querySelectorAll(".map-node")];
const lines = [...document.querySelectorAll(".flow-line")];
const detailPanel = document.getElementById("detailPanel");
const detailTitle = document.getElementById("detailTitle");
const detailText = document.getElementById("detailText");
const detailCategory = document.getElementById("detailCategory");
const detailImpact = document.getElementById("detailImpact");
const detailLink = document.getElementById("detailLink");
const searchInput = document.getElementById("searchInput");
const mapStage = document.getElementById("mapStage");
const themeToggle = document.querySelector(".theme-toggle");
let currentFilter = "all";

function setActiveNode(id) {
  const node = nodes[id];
  if (!node) return;

  nodeButtons.forEach((button) => {
    const isActive = button.dataset.id === id;
    button.classList.toggle("active", isActive);
    button.classList.toggle("dim", !isActive && !isConnected(id, button.dataset.id));
  });

  lines.forEach((line) => {
    const active = line.dataset.from === id || line.dataset.to === id;
    line.classList.toggle("active", active);
    line.classList.toggle("dim", !active);
  });

  detailTitle.textContent = node.title;
  detailText.textContent = node.text;
  detailCategory.textContent = node.category;
  detailImpact.textContent = node.impact;
  detailLink.href = `${bondStatsBaseUrl}${node.link}`;
  detailPanel.classList.add("open");
}

function isConnected(source, target) {
  if (source === target) return true;
  return lines.some((line) =>
    (line.dataset.from === source && line.dataset.to === target) ||
    (line.dataset.to === source && line.dataset.from === target)
  );
}

function resetMap() {
  nodeButtons.forEach((button) => button.classList.remove("active", "dim"));
  lines.forEach((line) => line.classList.remove("active", "dim"));
  detailPanel.classList.remove("open");
  searchInput.value = "";
  currentFilter = "all";
  document.querySelectorAll(".filter-chip").forEach((chip) => chip.classList.toggle("active", chip.dataset.filter === "all"));
  applyFilters();
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  nodeButtons.forEach((button) => {
    const id = button.dataset.id;
    const data = nodes[id];
    const matchesFilter = currentFilter === "all" || data.group === currentFilter;
    const searchable = `${data.title} ${data.category} ${data.impact} ${data.keywords} ${data.text}`.toLowerCase();
    const matchesSearch = !query || searchable.includes(query);
    button.classList.toggle("hidden-by-filter", !matchesFilter);
    button.classList.toggle("hidden-by-search", !matchesSearch);
  });
}

function createModuleCards() {
  const grid = document.getElementById("moduleGrid");
  grid.innerHTML = moduleDescriptions.map(([title, text, link]) => `
    <article class="module-card">
      <h3>${title}</h3>
      <p>${text}</p>
      <a href="${bondStatsBaseUrl}${link}" target="_blank" rel="noopener">Open guide →</a>
    </article>
  `).join("");
}

function loadTheme() {
  const savedTheme = localStorage.getItem("bondstats-theme") || "dark";
  if (savedTheme === "light") {
    document.body.dataset.theme = "light";
    themeToggle.textContent = "Dark mode";
  } else {
    document.body.removeAttribute("data-theme");
    themeToggle.textContent = "Light mode";
  }
}

nodeButtons.forEach((button) => button.addEventListener("click", () => setActiveNode(button.dataset.id)));
document.querySelector(".detail-close").addEventListener("click", () => detailPanel.classList.remove("open"));
document.getElementById("resetMap").addEventListener("click", resetMap);
document.getElementById("resetMapTop").addEventListener("click", resetMap);
document.getElementById("animateFlows").addEventListener("click", () => mapStage.classList.toggle("animate"));
searchInput.addEventListener("input", applyFilters);

document.querySelectorAll(".filter-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    currentFilter = chip.dataset.filter;
    document.querySelectorAll(".filter-chip").forEach((item) => item.classList.remove("active"));
    chip.classList.add("active");
    applyFilters();
  });
});

themeToggle.addEventListener("click", () => {
  const light = document.body.dataset.theme === "light";
  if (light) {
    document.body.removeAttribute("data-theme");
    localStorage.setItem("bondstats-theme", "dark");
    themeToggle.textContent = "Light mode";
  } else {
    document.body.dataset.theme = "light";
    localStorage.setItem("bondstats-theme", "light");
    themeToggle.textContent = "Dark mode";
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
createModuleCards();
loadTheme();
setActiveNode("central-banks");
