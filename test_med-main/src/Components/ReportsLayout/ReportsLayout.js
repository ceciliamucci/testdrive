import React from 'react';
import './ReportsLayout.css';

function ReportsLayout() {
    const reports = [
        { id: 1, doctorName: 'Dr. John Doe', speciality: 'Cardiology', title: 'Blood Test Report', date: '2023-10-01', reportUrl: '/blood_test_report.pdf' },
        { id: 2, doctorName: 'Dr. Jane Smith', speciality: 'Dermatology', title: 'X-Ray Report', date: '2023-09-15', reportUrl: '/xray_report.pdf' },
        // Add more reports as needed
    ];

    return (
        <div className="reports-container">
            <h1>Your Reports</h1>
            <table className="reports-table">
                <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>Doctor Name</th>
                        <th>Doctor Speciality</th>
                        <th>Report Title</th>
                        <th>Date</th>
                        <th>View Report</th>
                        <th>Download Report</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report, index) => (
                        <tr key={report.id}>
                            <td>{index + 1}</td>
                            <td>{report.doctorName}</td>
                            <td>{report.speciality}</td>
                            <td>{report.title}</td>
                            <td>{report.date}</td>
                            <td>
                                <a href={report.reportUrl} target="_blank" rel="noopener noreferrer" className="btn-view">
                                    View Report
                                </a>
                            </td>
                            <td>
                                <a href={report.reportUrl} download className="btn-download">
                                    Download Report
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ReportsLayout;