/**
 * Utilitas untuk format tanggal dan waktu
 */

export const formatDate = (date) => {
  if (!date) return "";

  const now = new Date();
  const articleDate = new Date(date);
  const diffMs = now - articleDate;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Baru saja";
  if (diffMins < 60) return `${diffMins} menit yang lalu`;
  if (diffHours < 24) return `${diffHours} jam yang lalu`;
  if (diffDays < 7) return `${diffDays} hari yang lalu`;

  return articleDate.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Truncate teks dengan ellipsis
 * @param {string} text - Text yang akan di-truncate
 * @param {number} maxLength - Panjang maksimal
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

/**
 * Format kategori text ke display text
 */
export const formatCategoryName = (category) => {
  return category
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Capitalize text
 */
export const capitalize = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};
