// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Format date to YYYY-MM-DD
export const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

// Format date for display
export const formatDisplayDate = (date) => {
  if (!date) return "N/A";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Format currency
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Calculate days until renewal
export const daysUntilRenewal = (renewalDate) => {
  if (!renewalDate) return null;
  const today = new Date();
  const renewal = new Date(renewalDate);
  const diffTime = renewal - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Get status badge color
export const getStatusColor = (status) => {
  switch (status) {
    case "In Use":
      return "success";
    case "In Repair":
      return "warning";
    case "In Stock":
      return "info";
    case "Retired":
      return "danger";
    default:
      return "info";
  }
};

// Get category icon
export const getCategoryIcon = (category) => {
  switch (category) {
    case "Laptop":
      return "💻";
    case "Desktop":
      return "🖥️";
    case "Server":
      return "🖥️";
    case "Network":
      return "🌐";
    case "Mobile":
      return "📱";
    case "Peripheral":
      return "🖱️";
    case "Software":
      return "💾";
    case "Other":
      return "📦";
    default:
      return "📦";
  }
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate IP address format
export const isValidIP = (ip) => {
  const ipRegex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipRegex.test(ip);
};

// Calculate depreciation value
export const calculateDepreciation = (cost, depreciationRate, acquiredDate) => {
  if (!cost || !depreciationRate || !acquiredDate) return cost;

  const today = new Date();
  const acquired = new Date(acquiredDate);
  const yearsDiff = (today - acquired) / (1000 * 60 * 60 * 24 * 365.25);

  if (yearsDiff <= 0) return cost;

  const depreciationAmount = ((cost * depreciationRate) / 100) * yearsDiff;
  return Math.max(0, cost - depreciationAmount);
};

// Export data to CSV
export const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          if (Array.isArray(value)) {
            return `"${value.join("; ")}"`;
          }
          if (typeof value === "string" && value.includes(",")) {
            return `"${value}"`;
          }
          return value || "";
        })
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Export data to JSON
export const exportToJSON = (data, filename) => {
  if (!data) return;

  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.json`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Import data from file
export const importFromFile = (file, type = "json") => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        console.log(
          `[Import] Processing ${type} file with content length: ${e.target.result.length}`
        );

        if (type === "json") {
          const data = JSON.parse(e.target.result);
          console.log(`[Import] JSON parsed successfully:`, data);
          resolve(data);
        } else if (type === "csv") {
          const csv = e.target.result;
          console.log(`[Import] CSV content preview:`, csv.substring(0, 200));

          const lines = csv.split("\n").filter((line) => line.trim()); // Remove empty lines
          if (lines.length < 2) {
            throw new Error(
              "CSV file must have at least a header row and one data row"
            );
          }

          const headers = lines[0]
            .split(",")
            .map((h) => h.trim().replace(/"/g, ""));
          console.log(`[Import] CSV headers:`, headers);

          const data = lines
            .slice(1)
            .map((line, index) => {
              try {
                const values = line
                  .split(",")
                  .map((v) => v.trim().replace(/"/g, ""));
                const obj = {};
                headers.forEach((header, headerIndex) => {
                  let value = values[headerIndex] || "";
                  obj[header] = value;
                });
                return obj;
              } catch (lineError) {
                console.warn(
                  `[Import] Error processing CSV line ${index + 2}:`,
                  lineError,
                  line
                );
                return null;
              }
            })
            .filter(Boolean); // Remove any null entries

          console.log(`[Import] CSV parsed successfully:`, data);
          resolve(data);
        } else {
          throw new Error(
            `Unsupported file type: ${type}. Please use CSV or JSON.`
          );
        }
      } catch (error) {
        console.error(`[Import] Error parsing ${type} file:`, error);
        reject(error);
      }
    };

    reader.onerror = (error) => {
      console.error("[Import] FileReader error:", error);
      reject(new Error("Failed to read file"));
    };

    reader.readAsText(file);
  });
};

// Debounce function for search
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Generate asset tag
export const generateAssetTag = (category, count) => {
  const prefix = category.substring(0, 3).toUpperCase();
  return `${prefix}-${String(count + 1).padStart(3, "0")}`;
};
