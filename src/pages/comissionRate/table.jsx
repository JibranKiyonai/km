import React, { useState, useEffect, useRef } from 'react';
import { CiEdit } from "react-icons/ci";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import CommissionRateModal from './SupplierModal.jsx';
import CustomConfirmationModal from './CustomConfirmationModal.jsx';  // Importing confirmation modal
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // For auto table export
import * as XLSX from 'xlsx';
import { LineWave } from 'react-loader-spinner'; // Import the loader
import { IoGitCompareOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Searchmodal from './searchModal.jsx'
import { Api } from '../../Api.jsx';

const TableOne = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [CommissionRates, setCommissionRates] = useState([]);
    const [CommissionRateToEdit, setCommissionRateToEdit] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editCommissionRate, setEditCommissionRate] = useState(null);
    const [isViewing, setIsViewing] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);  // Manage confirmation modal state
    const [CommissionRateToDelete, setCommissionRateToDelete] = useState(null);  // Track CommissionRate to delete
    const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null); // To reference the dropdown area
    const dropdownRef1 = useRef(null); // To reference the dropdown area
    const [selectedFile, setSelectedFile] = useState(null);
    const [isModalOpend, setIsModalOpend] = useState(false);
    const [loading, setLoading] = useState(true); // State to manage loading
    const [isverifying, setisverifying] = useState(false); // State to manage loading
    const [openViewPdf, setopenViewPdf] = useState(false); // State to manage loading
    const [openViewPdfid, setopenViewPdfid] = useState(0); // State to manage loading
    const [opensearchmodal, setopensearchmodal] = useState(false); // State to manage loading
    const [searchid, setsearchid] = useState(0); // State to manage loading
    const navigate = useNavigate()

    useEffect(() => { const handleClickOutside = (event) => { if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) { setIsDropdownOpen(false); } }; document.addEventListener("mousedown", handleClickOutside); return () => { document.removeEventListener("mousedown", handleClickOutside); }; }, [dropdownRef1]);
    useEffect(() => { const handleClickOutside = (event) => { if (dropdownRef.current && !dropdownRef.current.contains(event.target)) { setIsDropdownOpen1(false); } }; document.addEventListener("mousedown", handleClickOutside); return () => { document.removeEventListener("mousedown", handleClickOutside); }; }, [dropdownRef]);

    const itemsPerPage = 11;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = CommissionRates.filter((order) => {

        // Filter by search term and date range
        return (
            order.policy.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }).slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(CommissionRates.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleOpenModal = () => {

        setIsModalOpen(true);
    };

    const handleCloseModal = () => { setIsModalOpen(false); };
    const handleOpenViewPDF = (id) => { navigate(`/viewcomissionrate/${params.id}`) };
    const handleCloseViewPDF = () => { setopenViewPdf(false); };
    const handleOpenviewmodal = (id) => { setopensearchmodal(true); setsearchid(id) };
    const handleCloseviewmodal = () => { setopensearchmodal(false); };

    const fetchCommissionRates = async () => {
        try {
            const response = await axios.get(`${Api}/commission/allUser`);
            setCommissionRates(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching CommissionRates:', error);
            setLoading(false);
        }
    };

    useEffect(() => { fetchCommissionRates(); }, []);

    const confirmDeleteCommissionRate = (id) => {
        setCommissionRateToDelete(id);
        setIsConfirmationOpen(true);  // Show the confirmation modal
    };

    const handleDeleteCommissionRate = async () => {
        try {
            const response = await axios.delete(`${Api}/commission/dltUser/${CommissionRateToDelete}`);
            toast.success('Commission Rate deleted successfully!');
            fetchCommissionRates();
            setIsConfirmationOpen(false);  // Close the confirmation modal
        } catch (error) {
            console.error('Error deleting CommissionRate:', error);

            // Check if the error response exists and status is 403
            if (error.response && error.response.status === 403) {
                toast.error(error.response.data.message); // Display the error message from the server
            } else {
                toast.error('An unexpected error occurred.'); // Handle other errors
            }
        }
    };

    const handleVerifyCommissionRate = async (id) => {
        try {
            setIsViewing(false)
            console.log(id)
            const response = await axios.get(`${Api}/commission/singledata/${id}`);
            setEditCommissionRate(response.data.User);
            setisverifying(true);
            handleOpenModal();
        } catch (error) {
            console.error('Error fetching CommissionRate for edit:', error);
        }
    };

    const handleViewCommissionRate = async (id) => {
        try {
            const response = await axios.get(`${Api}/commission/singledata/${id}`);
            setEditCommissionRate(response.data.CommissionRate);
            setIsViewing(true);
            handleOpenModal();
        } catch (error) {
            console.error('Error fetching CommissionRate for view:', error);
        }
    };

    const exportToExcel = () => {
        setIsDropdownOpen(false); // Close the dropdown if clicking outside

        const selectedFields = CommissionRates.map((CommissionRate, index) => ({
            Sno: index + 1,                  // Serial number starts from 1
            ID: CommissionRate.policy,       // Example field
            Comission_Rate: CommissionRate.comrate,           // Example field
            Status: CommissionRate.status, // Example field
            Date: CommissionRate.dateAdded   // Example field
        }));

        const worksheet = XLSX.utils.json_to_sheet(selectedFields);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'CommissionRate.xlsx');
    };

    const exportToPDF = () => {
        setIsDropdownOpen(false); // Close the dropdown if clicking outside

        const doc = new jsPDF();

        // Prepare the columns and rows for the PDF
        const columns = [
            { header: 's.no', dataKey: 'sno' },
            { header: 'Policy', dataKey: 'Policy' },
            { header: 'Comission Rate', dataKey: 'ComissionRate' },
            { header: 'Status', dataKey: 'Status' },
            { header: 'Date', dataKey: 'dateAdded' }
        ];

        // Map the products to rows
        const rows = CommissionRates.map((product, index) => ({
            sno: index + 1,
            Policy: product.policy,
            ComissionRate: product.comrate,
            Status: product.status,
            dateAdded: product.dateAdded
        }));

        // Use autoTable to generate the PDF with all products
        doc.autoTable({
            head: [columns.map(col => col.header)],
            body: rows.map(row => Object.values(row)),
        });

        // Save the generated PDF
        doc.save('CommissionRate.pdf');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen); // Toggles the dropdown state
    };

    return (
        <>
            <div className="mb-3 -mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-[26px] font-bold leading-[30px] text-dark dark:text-white"> Commission Rates </h2>
                <nav>
                    <ol className="flex items-center gap-4">
                        {/* Add Button */}

                        {/* Export Dropdown */}
                        <li className="relative" ref={dropdownRef1}>
                            <button onClick={toggleDropdown} className="px-3 py-2 bg-blue-500 text-white rounded focus:outline-none"> Export ▼ </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48   border bg-slate-300 dark:bg-slate-600 border-gray-900 rounded-xl                shadow-lg z-[90000]">
                                    <ul className="py-2">
                                        <li> <button onClick={exportToExcel} className="block w-full px-4 py-2 text-left text- dark:hover:bg-gray-900 hover:bg-gray-200"> Export to Excel </button> </li>
                                        <li> <button onClick={exportToPDF} className="block w-full px-4 py-2 text-left dark:hover:bg-gray-900 hover:bg-gray-200"> Export to PDF </button> </li>
                                    </ul>
                                </div>
                            )}
                        </li>
                        {/* <li className="relative" ref={dropdownRef}>
                            <button onClick={toggleDropdown1} className="px-3 py-2 bg-green-500 text-white rounded focus:outline-none"> Import ▼ </button>

                            {isDropdownOpen1 && (
                                <div className="absolute right-0 mt-2 w-48   border bg-slate-300 dark:bg-slate-600 border-gray-900 rounded-xl                shadow-lg z-[90000]">
                                    <ul className="py-2">
                                        <li> <button onClick={handleDownloadTemplate} className="block w-full px-4 py-2  text-left dark:text-slate-200 text-slate-600 dark:hover:bg-slate-900  hover:bg-slate-200"> Download Template </button> </li>
                                        <li>
                                            <hr />
                                            <hr />
                                            <form onSubmit={handleConfirm} className="w-full">
                                                <label className="cursor-pointer block w-full px-4 py-2 text-left dark:text-slate-200 text-slate-600 dark:hover:bg-slate-900  hover:bg-slate-200"> Import XLS <input type="file" onChange={handleFileChange} className="hidden" /> </label>
                                                <div className="mt-2">
                                                    {selectedFile ? (<button type="submit" className="block w-full bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-colors" > Upload File </button>) : (<></>)}
                                                </div>
                                            </form>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li> */}
                        <button onClick={() => handleOpenViewPDF()} className="px-3 py-2 bg-green-600 text-white rounded focus:outline-none"> Search </button>
                        <li> <button onClick={handleOpenModal} className="px-3 py-2 dark:bg-gray-700 bg-gray-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none"> Add <span className="text-xl">+</span> </button> </li>

                    </ol>
                </nav>
            </div>

            <CommissionRateModal isOpen={isModalOpen} onClose={handleCloseModal} onSuccess={fetchCommissionRates} CommissionRateToEdit={CommissionRateToEdit} isEditing={isEditing} editCommissionRate={editCommissionRate} setIsEditing={setIsEditing} isViewing={isViewing} isverifying={isverifying} setisverifying={setisverifying} />
            <CustomConfirmationModal isOpen={isConfirmationOpen} onConfirm={handleDeleteCommissionRate} onCancel={() => setIsConfirmationOpen(false)} />
            {/* <ViewPdf isOpen={openViewPdf} onConfirm={handleDeleteCommissionRate} onCancel={() => setopenViewPdf(false)} id={openViewPdfid} /> */}
            <Searchmodal isOpen={opensearchmodal} onConfirm={handleDeleteCommissionRate} onCancel={() => setopensearchmodal(false)} id={searchid} />

            <div className="rounded-[10px] bg-white px-7.5 pt-4 pb-2 shadow-1 dark:bg-gray-dark dark:shadow-card">
                <div className="flex justify-end items-center mb-3">
                    <div className="relative">
                        <input type="text" placeholder="Search CommissionRates..." className="border border-gray-300 rounded-full py-2 pl-4 bg-white dark:bg-gray-dark pr-10 text-sm focus:outline-none" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
                        <FaSearch className="absolute right-3 top-3 text-gray-400" />
                    </div>
                </div>

                <div className="flex flex-col">
                    {loading ? ( // Conditional rendering based on loading state
                        <div className="flex justify-center items-center h-32">
                            <LineWave
                                visible={true}
                                height="100"
                                width="100"
                                color="#4fa94d"
                                ariaLabel="line-wave-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        </div>
                    ) : (
                        <>
                            {currentItems.length === 0 ? (
                                <div className="text-center py-2 dark:text-white text-lg"> No data found 😌 </div>
                            ) : (
                                <>
                                    <div className="overflow-x-auto">
                                        <div className="grid grid-cols-3 sm:grid-cols-[_1fr_1fr_1fr_1fr_1fr_1fr_1fr] bg-slate-300 dark:bg-slate-600 rounded-2xl justify-center align-middle py-2 mb-2">
                                            <div className="px-2"><h5 className="text-sm font-medium uppercase xsm:text-base">s.no</h5></div>
                                            <div className="px-2"><h5 className="text-sm font-medium uppercase xsm:text-base">Policy</h5></div>
                                            <div className="px-2"><h5 className="text-center justify-center text-sm font-medium uppercase xsm:text-base">Comission Rate</h5></div>
                                            <div className="px-2"><h5 className="text-center justify-center text-sm font-medium uppercase xsm:text-base">Total Premium</h5></div>
                                            <div className="hidden px-2  sm:block"><h5 className="text-center justify-center mr-1 text-sm font-medium uppercase xsm:text-base">Comission Amount</h5></div>
                                            <div className="hidden px-2 text-center mr-8 sm:block"><h5 className="text-sm font-medium uppercase xsm:text-base">Date</h5></div>
                                            <div className="hidden px-2 text-center sm:block"><h5 className="text-sm font-medium uppercase xsm:text-base mr-1">Actions</h5></div>
                                        </div>
                                    </div>

                                    {currentItems.map((CommissionRate, key) => {
                                        // Remove commas and convert totalpremium to a float for calculation
                                        const totalPremiumCleaned = parseFloat(CommissionRate.totalpremium.replace(/,/g, ''));
                                        const comRate = parseFloat(CommissionRate.comrate);

                                        // Calculate the commission amount (percentage of totalpremium based on comrate)
                                        const commissionAmount = ((totalPremiumCleaned * comRate) / 100).toFixed(2);

                                        return (
                                            <div
                                                className={`grid grid-cols-3 sm:grid-cols-[_1fr_1fr_1fr_1fr_1fr_1fr_1fr] ${key === currentItems.length - 1 ? "" : "border-b border-stroke dark:border-black"}`}
                                                key={key}
                                            >
                                                <div className="flex items-center gap-3.5 px-2 py-1">
                                                    <p className="font-medium text-dark dark:text-white">
                                                        {(currentPage - 1) * itemsPerPage + key + 1}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-3.5 px-2 py-1">
                                                    <p className="font-medium text-dark dark:text-white">
                                                        {CommissionRate.policy}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-3.5 px-2 py-1 text-center justify-center">
                                                    <p className="font-medium text-dark dark:text-white">
                                                        {comRate}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-3.5 px-2 py-1 text-center justify-center">
                                                    <p className="font-medium text-dark dark:text-white">
                                                        {totalPremiumCleaned.toLocaleString()} {/* Display formatted total premium */}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-3.5 px-2 py-1 text-center justify-center">
                                                    <p className="font-medium text-dark dark:text-white">
                                                        {commissionAmount} {/* Display the calculated commission with 2 decimals */}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-3.5 px-2 py-1">
                                                    <p className="font-medium text-dark dark:text-white">
                                                        {CommissionRate.dateAdded}
                                                    </p>
                                                </div>
                                                <div className="hidden items-center justify-center px-2 py-1 sm:flex">
                                                    <div className="flex items-center justify-end space-x-3.5">
                                                         {/* <button className="hover:text-primary"><IoGitCompareOutline size={22} onClick={() => handleVerifyCommissionRate(CommissionRate._id)} /></button> */}
                                                    <button className="hover:text-red-600"><MdDeleteOutline size={22} onClick={() => confirmDeleteCommissionRate(CommissionRate._id)} /></button>
                                                    {/* <button className="hover:text-green-600"><IoEyeOutline onClick={() => handleOpenViewPDF(CommissionRate._id)} size={22} /></button> */}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                </>
                            )}
                        </>
                    )}
                </div>

                <div className="flex justify-between items-center mt-4">
                    <div className="flex-grow text-center"><p className="text-sm dark:text-white">Page {currentPage} of {totalPages}</p></div>
                    <div className="flex gap-4">
                        <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-2 py-1 rounded-md text-white dark:bg-gray-900 bg-gray-600 dark:disabled:bg-gray-900 disabled:bg-gray-300"><FaArrowLeft /></button>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-2 py-1 rounded-md text-white dark:bg-gray-900 bg-gray-600 dark:disabled:bg-gray-900 disabled:bg-gray-300"><FaArrowRight /></button>
                    </div>
                </div>
            </div>

            <Toaster position="top-center" />
        </>
    );
};

export default TableOne;
