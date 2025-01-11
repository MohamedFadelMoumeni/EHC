import React, { useState } from 'react';
import { Search, ChevronUp, ChevronDown, Trash2, Edit, Eye } from 'lucide-react';

const DataTable = ({
  data,
  columns,
  onEdit,
  onDelete,
  onView,
  onAdd,
  title,
  searchPlaceholder = "Search..."
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');

  // Sorting logic
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort data
  const filteredAndSortedData = React.useMemo(() => {
    let filteredData = [...data];

    // Apply search filter
    if (searchTerm) {
      filteredData = filteredData.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredData;
  }, [data, searchTerm, sortConfig]);

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#168187]">{title}</h1>

        {title !== "Manage Subscriptions" && title !== "Manage Contact Information" && title !== "Manage Applications" && (
          <button
            onClick={onAdd}
            className="px-4 py-2 bg-[#168187] text-white rounded-lg hover:bg-[#0f5c61] transition-all duration-200 focus:ring-2 focus:ring-[#168187] focus:ring-offset-2"
          >
            Add New
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="w-full pl-10 pr-4 py-2 border rounded focus:ring focus:ring-blue-300 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table with horizontal scrolling */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full min-w-max bg-white border rounded">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 md:px-6 py-3 text-left text-sm font-semibold text-gray-600"
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {sortConfig.key === column.key &&
                      (sortConfig.direction === 'asc' ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </div>
                </th>
              ))}
              <th className="px-4 md:px-6 py-3 text-right text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAndSortedData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-4 md:px-6 py-4 text-sm text-gray-800 whitespace-nowrap"
                  >
                    {column.render ? column.render(item[column.key]) : item[column.key]}
                  </td>
                ))}
                <td className="px-4 md:px-6 py-4 text-right space-x-2">

            
                  {title !== "Manage Subscriptions" && (
                    <>
                      {title !== "Manage Applications" && (
                        <>
                        <button
                        onClick={() => onView(item)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => onEdit(item)}
                        className="text-yellow-600 hover:text-yellow-800"
                      >
                        <Edit size={18} />
                      </button>
                      </>)}
                    </>
                  )}
                  {title !== "Manage Contact Information" && (
                    <>
                    
                    <button
                      onClick={() => onDelete(item)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                    </>
                  )}
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
