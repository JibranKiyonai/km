import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchModal from '../comissionRate/searchModal'; // Adjust the import path accordingly
import { Api } from '../../Api';

const CustomConfirmationModal = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(true); // Initially, show the search modal
  const [error, setError] = useState('');

  const fetchData = async (policyNumber, premiumType) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${Api}/commission/getFilteredData`, { policyNumber, premiumType }
      );
      setFilteredData(response.data.users);
      console.log(response.data.users)
      setSearchModalOpen(false); // Hide the search modal after successful fetch
    } catch (err) {
      setError('Error fetching filtered data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = async (policyNumber, fromDate, toDate, premiumType) => {
    await fetchData(policyNumber, fromDate, toDate, premiumType);
  };

  const handleCancel = () => {
    setSearchModalOpen(false);
    // Optionally reset the state or handle cancel actions
  };

  return (
    <div className="p-6">
      {searchModalOpen && (
        <SearchModal
          isOpen={searchModalOpen}
          onConfirm={handleSearchSubmit}
          onCancel={handleCancel}
        />
      )}

      {!searchModalOpen && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Filtered Premium Data</h1>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              {error && <div className="text-red-500">{error}</div>}
              {filteredData.length === 0 ? (
                <p>No data found for the given filters.</p>
              ) : (
                filteredData.map((data) => (
                  <div key={data._id} className="mb-6">
                    <h2 className="text-xl font-semibold">Details for Policy: {data.policy}</h2>
                    <div className="border border-gray-300 rounded p-4 mb-4">
                      <p><strong>Policy:</strong> {data.policy}</p>
                      <p><strong>Reporting Month From:</strong> {data.datefromMonth}</p>
                      <p><strong>Reporting Month To:</strong> {data.datetoMonth}</p>
                      <p><strong>Reporting Month From Year:</strong> {data.datefromYear}</p>
                      <p><strong>Reporting Month To Year:</strong> {data.datetoYear}</p>
                      <p><strong>Division:</strong> {data.division}</p>
                      <p><strong>Health Premium:</strong> {data.healthpremium ? 'Yes' : 'No'}</p>
                      <p><strong>Dental Premium:</strong> {data.dentalpremium ? 'Yes' : 'No'}</p>
                      {/* <p><strong>Status:</strong> {data.status}</p> */}
                    </div>

                    <h2 className="text-xl font-semibold mb-2">Table Columns</h2>
                    <table className="min-w-full border-collapse border border-gray-200 mb-4">
                      <thead>
                        <tr className="bg-gray-200">
                          {data.tablecolumnsHeadings.map((heading, index) => (
                            <th key={index} className="border border-gray-200 p-2">{heading}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {data.tablecolumnsvalues.map((row, rowIndex) => (
                          <tr key={rowIndex} className="hover:bg-gray-600">
                            {row.map((value, colIndex) => (
                              <td key={colIndex} className="border border-gray-200 p-2">{value}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <br/>
                    <br/> 
                    <hr/> 
                  </div>
                ))
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomConfirmationModal;
