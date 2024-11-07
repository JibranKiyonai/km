import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Api } from "../../Api";

const UserModal = ({ isOpen, onClose, onSuccess, isEditing, editCommissionRate, setIsEditing, isViewing, setisverifying, isverifying }) => {
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            comrate: "",
            pdfFile: null,
        },
        validationSchema: Yup.object({
            comrate: Yup.string()   .required("Comission rate required!"),
 
            pdfFile: Yup.mixed()
                .required("A PDF file is required")
                .test("fileType", "Only PDF files are allowed", (value) => {
                    return value && value.type === "application/pdf";
                }),
        }),
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true);
                const formData = new FormData();
                formData.append("comrate", values.comrate);
                formData.append("file", values.pdfFile);

                const url = isverifying ? `${Api}/commission/verifyUserComissionRate/${editCommissionRate._id}` : `${Api}/commission/add`;
                const method = isverifying ? "post" : "post";

                // Use `toast.promise` to track the axios request
                await toast.promise(
                    axios[method](url, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    }),
                    {
                        loading: <b>{`${isverifying ? "Verifying..." : "Adding..."}`}</b>,
                        success: <b>{`PDF ${isverifying ? "verify" : "added"} successfully! 🎉`}</b>,
                        error: <b>Something went wrong. ❌</b>,
                    }
                );

                setLoading(false);

                setTimeout(() => {
                    resetForm();
                    onSuccess();
                    onClose();
                    if (isverifying) setisverifying(false);
                }, 1000);

            } catch (error) {
                console.error(error);
                setLoading(false);
                // No need for an explicit error toast here because `toast.promise` handles it.
            }
        },
    });

    // useEffect(() => {
    //     if (editCommissionRate) {
    //         formik.setValues({
    //             comrate: editCommissionRate.comrate || "",
    //         });
    //     }
    // }, [editCommissionRate]);

    const handleFileChange = (event) => {
        formik.setFieldValue("pdfFile", event.currentTarget.files[0]);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[90000000] flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-dark rounded-lg p-8 shadow-lg w-full max-w-lg">
                <h2 className="text-xl font-semibold mb-4 text-dark dark:text-white">
                    {isverifying ? "Verify Comission Rate" : "Add New Data"}
                </h2>

                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 mb-4">
                        {isverifying ? <></> :
                            <div>
                                <label htmlFor="comrate" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Commission Rate
                                </label>
                                <input
                                    disabled={loading}

                                    type="number"
                                    id="comrate"
                                    {...formik.getFieldProps('comrate')}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-700 bg-gray-200 dark:border-gray-600 dark:text-white"
                                />
                                {formik.touched.comrate && formik.errors.comrate ? (
                                    <div className="text-red-600">{formik.errors.comrate}</div>
                                ) : null}
                            </div>}

                        <div className="mb-6">
                            <label htmlFor="pdfFile" className="block text-lg font-semibold text-gray-800 dark:text-gray-400 mb-2">
                                Upload PDF File
                            </label>

                            <div className="relative">
                                <input type="file"
                                    id="pdfFile"
                                    disabled={loading}
                                    name="pdfFile"
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                    className="file-input file-input-bordered dark:bg-gray-700 bg-gray-200 file-input-info w-full max-w-xs" />



                                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 italic">
                                    Only PDF files are accepted.
                                </div>

                                {formik.touched.pdfFile && formik.errors.pdfFile ? (
                                    <div className="text-red-600 mt-2 text-sm">{formik.errors.pdfFile}</div>
                                ) : null}
                            </div>

                        </div>

                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            onClick={() => {
                                formik.resetForm(); // Reset the form fields
                                onClose(); // Close the modal
                            }}
                        >
                            Cancel
                        </button>
                        {!isViewing && (
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                {isverifying ? "Verify" : "Add PDF"}
                            </button>
                        )}
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    );
};

export default UserModal;
