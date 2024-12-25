import React, { useState } from 'react';
import { DollarSign, Download, Search, Edit, Trash, Print } from 'lucide-react';

const payrollData = [
  { id: 1, employee: 'John Doe', basicSalary: 5000, bonus: 500, deductions: 200, netPay: 5300 },
  { id: 2, employee: 'Sarah Smith', basicSalary: 4500, bonus: 400, deductions: 180, netPay: 4720 },
];

const Payroll = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().split('T')[0].substring(0, 7));
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isPayslipPopupOpen, setIsPayslipPopupOpen] = useState(false);
  const [isProcessingPayroll, setIsProcessingPayroll] = useState(false);

  const [allowances, setAllowances] = useState([
    { type: 'Fuel Allowance', amount: 0 },
    { type: 'Food Allowance', amount: 0 },
    { type: 'Annual Allowance', amount: 0 },
  ]);
  const [deductions, setDeductions] = useState([
    { type: 'No Pay', amount: 0 },
    { type: 'Advance', amount: 0 },
    { type: 'Loan Repayment', amount: 0 },
    { type: 'EPF 8%', amount: 0 },
  ]);

  const [epfEmployer, setEpfEmployer] = useState(0);
  const [etfEmployer, setEtfEmployer] = useState(0);

  const openPopup = (employee) => {
    setSelectedEmployee(employee);
    setAllowances([
      { type: 'Fuel Allowance', amount: 0 },
      { type: 'Food Allowance', amount: 0 },
      { type: 'Annual Allowance', amount: 0 },
    ]);
    setDeductions([
      { type: 'No Pay', amount: 0 },
      { type: 'Advance', amount: 0 },
      { type: 'Loan Repayment', amount: 0 },
      { type: 'EPF 8%', amount: 0 },
    ]);
    setIsPopupOpen(true);
  };

  const closePopup = () => setIsPopupOpen(false);
  const closePayslipPopup = () => setIsPayslipPopupOpen(false);

  const handleSave = () => {
    const totalAllowance = allowances.reduce((total, allowance) => total + allowance.amount, 0);
    const totalDeductions = deductions.reduce((total, deduction) => total + deduction.amount, 0);

    const netPay = selectedEmployee.basicSalary + totalAllowance - totalDeductions;

    const epfEmployerContribution = (netPay * 12) / 100;
    const etfEmployerContribution = (netPay * 3) / 100;

    setEpfEmployer(epfEmployerContribution);
    setEtfEmployer(etfEmployerContribution);
    setIsPopupOpen(false);
  };

  const handleAllowanceChange = (index, value) => {
    const updatedAllowances = [...allowances];
    updatedAllowances[index].amount = parseFloat(value);
    setAllowances(updatedAllowances);
  };

  const handleDeductionChange = (index, value) => {
    const updatedDeductions = [...deductions];
    updatedDeductions[index].amount = parseFloat(value);
    setDeductions(updatedDeductions);
  };

  const addAllowanceField = () => {
    setAllowances([...allowances, { type: 'New Allowance', amount: 0 }]);
  };

  const addDeductionField = () => {
    setDeductions([...deductions, { type: 'New Deduction', amount: 0 }]);
  };

  const removeAllowance = (index) => {
    const updatedAllowances = allowances.filter((_, i) => i !== index);
    setAllowances(updatedAllowances);
  };

  const removeDeduction = (index) => {
    const updatedDeductions = deductions.filter((_, i) => i !== index);
    setDeductions(updatedDeductions);
  };

  const handlePayslipView = (employee) => {
    setSelectedEmployee(employee);
    setIsPayslipPopupOpen(true);
  };

  const handleProcessPayroll = () => {
    setIsProcessingPayroll(true);
  };

  const filteredPayroll = payrollData.filter(record =>
    record.employee.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payroll</h1>
        <div className="flex gap-4">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />
          <button onClick={handleProcessPayroll} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            <DollarSign size={20} />
            Process Payroll
          </button>
        </div>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search employees..."
          className="w-full px-4 py-2 pl-10 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Base Salary</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Allowance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deductions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net Pay</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payslip</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPayroll.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 cursor-pointer">
                  {record.employee}
                </td>
                <td className="px-6 py-4">{`$${record.basicSalary}`}</td>
                <td className="px-6 py-4">{`${
                  allowances.reduce((total, allowance) => total + allowance.amount, 0)
                }`}</td>
                <td className="px-6 py-4">{`${
                  deductions.reduce((total, deduction) => total + deduction.amount, 0)
                }`}</td>
                <td className="px-6 py-4">{`$${record.netPay}`}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handlePayslipView(record)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                  >
                    View Payslip
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => openPopup(record)}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup for Employee Details */}
      {isPopupOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96 h-[80vh] overflow-auto">
            <h2 className="text-xl font-bold mb-4">{selectedEmployee.employee}</h2>

            <div className="mb-4">
              <label className="block mb-2">Basic Salary:</label>
              <input
                type="number"
                value={selectedEmployee.basicSalary}
                className="w-full border px-4 py-2 rounded-lg mb-4"
                disabled
              />
            </div>

            {/* Allowances Section */}
            <div className="mb-4">
              <h3 className="font-semibold">Allowances</h3>
              {allowances.map((allowance, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                  <input
                    type="text"
                    value={allowance.type}
                    className="w-1/2 border px-4 py-2 rounded-lg mb-2"
                    disabled
                  />
                  <input
                    type="number"
                    value={allowance.amount}
                    onChange={(e) => handleAllowanceChange(index, e.target.value)}
                    className="w-1/4 border px-4 py-2 rounded-lg"
                  />
                  <button
                    onClick={() => removeAllowance(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              ))}
              <button
                onClick={addAllowanceField}
                className="text-blue-600 hover:text-blue-800"
              >
                Add Allowance
              </button>
            </div>

            {/* Deductions Section */}
            <div className="mb-4">
              <h3 className="font-semibold">Deductions</h3>
              {deductions.map((deduction, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                  <input
                    type="text"
                    value={deduction.type}
                    className="w-1/2 border px-4 py-2 rounded-lg mb-2"
                    disabled
                  />
                  <input
                    type="number"
                    value={deduction.amount}
                    onChange={(e) => handleDeductionChange(index, e.target.value)}
                    className="w-1/4 border px-4 py-2 rounded-lg"
                  />
                  <button
                    onClick={() => removeDeduction(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              ))}
              <button
                onClick={addDeductionField}
                className="text-blue-600 hover:text-blue-800"
              >
                Add Deduction
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <label className="block">EPF (Employer):</label>
                <input
                  type="number"
                  value={epfEmployer}
                  className="border px-4 py-2 rounded-lg mb-2"
                  disabled
                />
              </div>
              <div>
                <label className="block">ETF (Employer):</label>
                <input
                  type="number"
                  value={etfEmployer}
                  className="border px-4 py-2 rounded-lg"
                  disabled
                />
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={closePopup}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payslip Popup */}
      {isPayslipPopupOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Payslip for {selectedEmployee.employee}</h2>

            {/* Payslip details */}
            <div className="mb-4">
              <p><strong>Basic Salary:</strong> {selectedEmployee.basicSalary}</p>
              <p><strong>Allowances:</strong> {allowances.reduce((total, allowance) => total + allowance.amount, 0)}</p>
              <p><strong>Deductions:</strong> {deductions.reduce((total, deduction) => total + deduction.amount, 0)}</p>
              <p><strong>Net Pay:</strong> {selectedEmployee.netPay}</p>
            </div>

            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={closePayslipPopup}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Print
              </button>
              <button
                onClick={() => alert("Email sent")}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payroll;
