import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import Select from "react-select";

const countryOptions = [
  { value: "+91", label: "🇮🇳 +91 (India)" },
  { value: "+1", label: "🇺🇸 +1 (United States)" },
  { value: "+44", label: "🇬🇧 +44 (United Kingdom)" },
  { value: "+61", label: "🇦🇺 +61 (Australia)" },
  { value: "+86", label: "🇨🇳 +86 (China)" },
  { value: "+81", label: "🇯🇵 +81 (Japan)" },
];

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);

  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [country, setCountry] = useState("");
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [geolocationStatus, setGeolocationStatus] = useState("");

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

const navigate = useNavigate();

  useEffect(() => {
    if (step === 4 && !geolocationStatus) {

      setGeolocationStatus("Capturing geolocation...");


      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setGeolocationStatus(
            `Geolocation captured: ${latitude}, ${longitude}`
          );
          console.log(latitude, longitude);
        },
        (error) => {
          console.error(error);
          setGeolocationStatus("Geolocation capture failed.");
        }
      );
    }
  }, [step, geolocationStatus]);
  console.log(import.meta.env.VITE_MY_TOKEN)
  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };
  const handleMultiFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files).slice(0, 5);
    setFiles(uploadedFiles);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const phoneNumber = `${selectedCountry.value} + "-" + ${phone}`;

    const requestBody = {
      id: 0,
      created_at: "now",
      name,
      email,
      phone_number: phoneNumber,
      address_1: addressLine1,
      address_2: addressLine2,
      city,
      state,
      pincode: parseInt(pinCode),
      country,
      geolocation: geolocationStatus,
      single_file: file,
      multi_file: files,
    };

    try {
     
      const response = await fetch(
        "https://x8ki-letl-twmt.n7.xano.io/apidoc:XooRuQbs/form",
        {
          method: "POST",
           headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.MY_TOKEN}`,            body: JSON.stringify(requestBody),
          },

          withCredentials: false,
        }
      );

      if (response.ok) {
        setIsFormSubmitted(true);
      } else {
        throw new Error("Form submission failed.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-[200px] max-w-lg mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">Multi Step Form</h1>
        <div className="bg-gray-200 h-2 rounded-full">
          <div
            className={`bg-blue-500 h-2 rounded-full ${
              step === 1
                ? "w-1/5"
                : step === 2
                ? "w-2/5"
                : step === 3
                ? "w-3/5"
                : step === 4
                ? "w-4/5"
                : "w-full"
            }`}
          ></div>
        </div>
              
      </div>

      <form onSubmit={handleFormSubmit} className="block p-6 bg-white border border-gray-200 rounded-lg shadow">
        {step === 1 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Step 1: Basic Details</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
                Phone
              </label>
              <div className="flex">
                <Select
                  id="countryCode"
                  className="w-2/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1 mx-1"
                  options={countryOptions}
                  value={selectedCountry}
                  onChange={setSelectedCountry}
                  required
                />
                <input
                  type="text"
                  id="phoneNumber"
                  placeholder="123-45-6780"
                  className="w-2/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 mx-1"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md"
                onClick={handlePreviousStep}
                disabled={step === 1}
              >
                Previous
              </button>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Step 2: Address</h2>

            <div className="mb-4">
              <label htmlFor="addressLine1" className="block mb-2 text-sm font-medium text-gray-900">
                Address Line 1
              </label>
              <input
                type="text"
                id="addressLine1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="addressLine2" className="block mb-2 text-sm font-medium text-gray-900">
                Address Line 2
              </label>
              <input
                type="text"
                id="addressLine2"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">
                City
              </label>
              <input
                type="text"
                id="city"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900">
                State
              </label>
              <input
                type="text"
                id="state"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="pinCode" className="block mb-2 text-sm font-medium text-gray-900">
                Pin Code
              </label>
              <input
                type="text"
                id="pinCode"
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900">
                Country
              </label>
              <input
                type="text"
                id="country"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md"
                onClick={handlePreviousStep}
              >
                Previous
              </button>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Step 3: File Upload</h2>

            <div className="mb-4">
              <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900">
                Upload File (PNG or PDF)
              </label>
              <input
                type="file"
                id="file"
                accept=".png,.pdf"
                className="p-2.5 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
                onChange={handleFileUpload}
                required
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md"
                onClick={handlePreviousStep}
              >
                Previous
              </button>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                onClick={handleNextStep}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-lg font-bold mb-4">
              Step 4: Multi File Upload
            </h2>

            <div className="mb-4">
              <label htmlFor="multiFile" className="block mb-2 text-sm font-medium text-gray-900">
                Upload Multiple Files (PNG or PDF)
              </label>
              <input
                type="file"
                id="multiFile"
                accept=".png,.pdf"
                className="p-2.5 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"

                multiple
                onChange={handleMultiFileUpload}
                required
              />
            </div>
            <div className="mb-4">
              <p className="font-medium mb-2">
                Geolocation Status: {geolocationStatus}
              </p>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md"
                onClick={handlePreviousStep}
              >
                Previous
              </button>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              
                onClick={() => {
                  handleNextStep();
                  handleFormSubmit(event);
        }}
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-lg font-bold mb-4">Step 5: Status</h2>

            {isFormSubmitted ? (
              <h1 className="text-green-500">Form submitted successfully!</h1>
            ) : (
              <h1 className="text-red-500">Form submission failed!</h1>
            )}
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md"
                onClick={handlePreviousStep}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={()=>navigate("/")}

                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Go to Home
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default MultiStepForm;
