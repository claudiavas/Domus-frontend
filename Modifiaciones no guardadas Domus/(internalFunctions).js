(internalFunctions)
 // Search for an item in an array by code and return the name of the item
 export const findItemNameByCode = (dataArray, codeToFind, nameKey) => {
   const foundItem = dataArray.find((item) => item["CPRO"] === codeToFind);
   return foundItem ? foundItem[nameKey] : null;
 };
 
 
 

// Remove text in parentheses
export const removeTextInParentheses = (text) => {
   return text.replace(/\([^()]*\)/g, "").trim()
   };