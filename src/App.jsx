import { useState } from 'react';
import { IoMdAddCircle } from 'react-icons/io';

import { RiDeleteBin5Fill } from 'react-icons/ri';

function App() {
  const [formFields, setFormFields] = useState([
    { name: '', designation: '', errors: { name: '', designation: '' } },
  ]);
  const [submittedData, setSubmittedData] = useState([]);

  const handleChange = (index, field, value) => {
    const updatedFields = [...formFields];
    updatedFields[index][field] = value;
    updatedFields[index].errors[field] = '';
    setFormFields(updatedFields);
  };

  const handleAddField = () => {
    setFormFields([
      ...formFields,
      { name: '', designation: '', errors: { name: '', designation: '' } },
    ]);
  };

  const handleDeleteField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    const updatedFields = formFields.map((field) => {
      const errors = { name: '', designation: '' };
      if (!field.name) {
        errors.name = 'Name is required.';
        isValid = false;
      }
      if (!field.designation) {
        errors.designation = 'Designation is required.';
        isValid = false;
      }
      return { ...field, errors };
    });

    setFormFields(updatedFields);

    if (isValid) {
      const sanitizedData = formFields.map(({ name, designation }) => ({
        name,
        designation,
      }));
      setSubmittedData(sanitizedData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <form
        onSubmit={handleSubmit}
        className="m-auto w-full max-w-lg rounded-lg bg-white p-6 shadow-lg"
      >
        <h2 className="mb-4 text-center text-2xl font-semibold text-gray-800">
          Frontend Developer Challenge Form
        </h2>
        {formFields.map((field, index) => (
          <div key={index} className="mb-6 space-y-2">
            <div className="flex items-start space-x-2">
              <div className="w-3/5">
                <input
                  className={`w-full rounded-lg border ${
                    field.errors.name
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  } p-2 text-gray-700 focus:outline-none`}
                  type="text"
                  placeholder="Enter your name"
                  value={field.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                />
                {field.errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {field.errors.name}
                  </p>
                )}
              </div>

              <div className="w-2/5">
                <select
                  className={`w-full rounded-lg border ${
                    field.errors.designation
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  } p-2 text-gray-700 focus:outline-none`}
                  value={field.designation}
                  onChange={(e) =>
                    handleChange(index, 'designation', e.target.value)
                  }
                >
                  <option value="" disabled>
                    Select your role
                  </option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="manager">Manager</option>
                </select>
                {field.errors.designation && (
                  <p className="mt-1 text-sm text-red-500">
                    {field.errors.designation}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleDeleteField(index)}
                className="rounded-lg border px-1 py-1 text-3xl text-zinc-400 hover:bg-gray-200"
              >
                <RiDeleteBin5Fill />
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddField}
          className="mb-4 w-fit rounded-lg border px-1 py-1 text-2xl text-zinc-400 transition-all duration-300 ease-in-out hover:bg-gray-200 hover:text-red-300"
        >
          <IoMdAddCircle />
        </button>

        <button
          type="submit"
          className="w-full rounded-lg bg-green-500 px-4 py-2 text-white transition-all duration-300 ease-in-out hover:bg-green-600"
        >
          Submit
        </button>
      </form>

      <div className="m-auto mt-6 w-full max-w-lg rounded-lg bg-white p-4 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-semibold text-gray-800">
          Form State
        </h2>
        {formFields.length > 0 ? (
          <div className="space-y-4">
            {formFields.map((field, index) => {
              const isActive = field.name || field.designation;
              if (isActive) {
                return (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm"
                  >
                    <h3 className="mb-2 text-center text-lg font-semibold text-gray-700">
                      # {index + 1}
                    </h3>
                    <p className="text-center text-lg">
                      <span className="font-semibold text-gray-600">Name:</span>{' '}
                      <span
                        className={`${
                          field.name
                            ? 'capitalize text-gray-800'
                            : 'italic text-gray-400'
                        }`}
                      >
                        {field.name || 'Not provided'}
                      </span>
                    </p>
                    <p className="text-center text-lg">
                      <span className="font-semibold text-gray-600">
                        Designation:
                      </span>{' '}
                      <span
                        className={`${
                          field.designation
                            ? 'capitalize text-gray-800'
                            : 'italic text-gray-400'
                        }`}
                      >
                        {field.designation || 'Not selected'}
                      </span>
                    </p>
                  </div>
                );
              }
              return null; // Skip fields that are inactive
            })}
          </div>
        ) : (
          <p className="text-center text-sm text-gray-500">
            No active fields to display.
          </p>
        )}
      </div>

      {submittedData.length > 0 && (
        <div class="mt-6 flex flex-col items-center justify-center gap-4 px-3 md:px-0">
          <h3 className="font-bold uppercase text-gray-600">Data Table</h3>
          <div class="mx-3 overflow-hidden rounded-lg bg-white shadow-lg md:mx-4">
            <table class="min-w-96">
              <thead>
                <tr class="bg-gray-300">
                  <th class="w-1/4 px-6 py-4 text-left font-bold uppercase text-gray-600">
                    Name
                  </th>
                  <th class="w-1/4 px-6 py-4 text-left font-bold uppercase text-gray-600">
                    Designation
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white">
                {submittedData.map((data, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0
                        ? 'bg-gray-50 hover:bg-gray-100'
                        : 'bg-white hover:bg-gray-100'
                    }
                  >
                    <td className="px-6 py-3">{data.name}</td>
                    <td className="px-6 py-3">{data.designation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
