// components/CategoryDropdown.jsx
import React from 'react';

// Define available categories as an array of objects
const CATEGORY_OPTIONS = [
  { value: "All", label: "All Categories" },
  { value: "Software", label: "Software Engineering" },
  { value: "Marketing", label: "Marketing" },
  { value: "Data", label: "Data Analysis" },
  { value: "Finance", label: "Finance" },
  // Add more options here for different page types if needed
];

/**
 * A modular dropdown component for filtering opportunities by category.
 * @param {string} category - The currently selected category value.
 * @param {function} setCategory - Function to update the category state.
 * @param {function} setCurrentPage - Function to reset the page to 1.
 */
const CategoryDropdown = ({ category, setCategory, setCurrentPage }) => {

    const handleChange = (e) => {
        const newValue = e.target.value;
        setCategory(newValue);
        setCurrentPage(1); // Crucial: Reset to page 1 whenever the filter changes
    };

    return (
        <div className="w-full md:w-64">
            <select 
                value={category}
                onChange={handleChange}
                // Tailwind classes for styling (appearance-none hides default browser arrow)
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
            >
                {CATEGORY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoryDropdown;