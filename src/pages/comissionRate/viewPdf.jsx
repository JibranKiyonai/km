import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FilteredDataDisplay = () => {
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/getFilteredData', {
                params: {
                    // Example parameters - adjust as needed
                    policyNumber: '33052',
                    fromDate: '2024-01-01',
                    toDate: '2024-12-31',
                    premiumType: 'B'
                }
            });
            setFilteredData(response.data.users);
        } catch (err) {
            setError('Error fetching filtered data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div>Loadingsa...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Filtered Premium Data</h1>
            {filteredData.length === 0 ? (
                <p>No data found for the given filters.</p>
            ) : (
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-200 p-2">Policy Number</th>
                            <th className="border border-gray-200 p-2">Date Added</th>
                            <th className="border border-gray-200 p-2">Premium Type</th>
                            <th className="border border-gray-200 p-2">Status</th>
                            <th className="border border-gray-200 p-2">Reporting Month</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-100">
                                <td className="border border-gray-200 p-2">{user.policy}</td>
                                <td className="border border-gray-200 p-2">{user.dateAdded}</td>
                                <td className="border border-gray-200 p-2">{user.premiumtype}</td>
                                <td className="border border-gray-200 p-2">{user.status}</td>
                                <td className="border border-gray-200 p-2">
                                    {user.reportingmonthfrom} - {user.reportingmonthto} {user.reportingmonthfromyear}/{user.reportingmonthtoyear}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default FilteredDataDisplay;
