export const sanitizeCategory = (category) => {
    if (!category || category.length > 0) {
        return category.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase());
    }
    else {
        return category;
    }
};