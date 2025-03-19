import { getCategories } from '../services/PublicServices';

let categoriesCache = null;

export const getCachedCategories = async () => {
    if (!categoriesCache) {
        categoriesCache = await getCategories();
        console.log("LLAMANDO SERVICIO CATEGORIES")
    }
    return categoriesCache;
};

export const clearCategoriesCache = () => {
    categoriesCache = null;
};