import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ServiceRequestForm = () => {
  const [serviceOptions, setServiceOptions] = useState({
    individual: {
      student: [],
      employee: []
    },
    enterprise: {
      services: []
    }
  });

  const [ehcDivisions, setehcDivisions] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/services")
      .then((response) => {
        const data = response.data;
        const updatedEchDivision = [];
        const updatedServiceOptions = {
          individual: {
            student: [],
            employee: []
          },
          enterprise: {
            services: []
          }
        };

        data.forEach((service) => {
          switch (service.serviceCategory) {
            case "STUDENT":
              updatedServiceOptions.individual.student.push(service.name);
              break;
            case "EMPLOYEE":
              updatedServiceOptions.individual.employee.push(service.name);
              break;
            case "COMPANY":
              updatedEchDivision.push(service.name);
              break;
            default:
              console.warn(`Unknown service category: ${service.serviceCategory}`);
          }
        });

        setServiceOptions(updatedServiceOptions);
        setehcDivisions(updatedEchDivision);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    serviceType: "",
    status: "",
    customFunction: "",
    division: "",
    requestedService: ""
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return re.test(phone);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "fullName":
        if (value.length < 2) error = "Le nom doit contenir au moins 2 caractères";
        break;
      case "email":
        if (!validateEmail(value)) error = "Veuillez entrer une adresse email valide";
        break;
      case "phone":
        if (!validatePhone(value)) error = "Veuillez entrer un numéro de téléphone valide";
        break;
      case "serviceType":
        if (!value) error = "Veuillez sélectionner un type de service";
        break;
      case "status":
        if (formData.serviceType === "individual" && !value) {
          error = "Veuillez sélectionner votre statut";
        }
        break;
      case "customFunction":
        if (formData.serviceType === "enterprise" && !value) {
          error = "Veuillez entrer votre fonction";
        }
        break;
      case "division":
        if (formData.serviceType === "enterprise" && !value) {
          error = "Veuillez sélectionner une division";
        }
        break;
      case "requestedService":
        if (!value) error = "Veuillez sélectionner un service";
        break;
      default:
        break;
    }
    return error;
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "serviceType" && {
        status: "",
        customFunction: "",
        division: "",
        requestedService: ""
      }),
      ...(name === "status" && { requestedService: "" }),
      ...(name === "division" && { requestedService: "" })
    }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const newTouched = {};

    Object.keys(formData).forEach((field) => {
      newTouched[field] = true;
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    setTouched(newTouched);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const newForm = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        serviceRequested: formData.requestedService
      };

      setLoading(true); // Start loading
      try {
        await axios.post("http://localhost:8081/api/service-requests", newForm);
        toast.success("la demande de service a été bien envoyer!");
      } catch (error) {
        toast.error("erreur ! essayer une autre fois");
      } finally {
        setLoading(false); // End loading
      }
    } else {
      console.log("Form has errors");
    }
  };

  const getAvailableServices = () => {
    if (formData.serviceType === "individual") {
      return formData.status ? serviceOptions.individual[formData.status] : [];
    } else if (formData.serviceType === "enterprise") {
      return formData.division ? serviceOptions.enterprise.services : [];
    }
    return [];
  };

  const renderError = (fieldName) => {
    if (touched[fieldName] && errors[fieldName]) {
      return <span className="text-red-500 text-sm mt-1">{errors[fieldName]}</span>;
    }
    return null;
  };

  return (
    <div className="w-full max-w-lg p-6 mx-auto bg-white">
      <h2 className="text-xl font-semibold mb-6">Formulaire simple de demande de service</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-2">
          <label htmlFor="fullName" className="block text-sm font-medium">
            Nom complet
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded-md ${
              errors.fullName && touched.fullName ? "border-red-500" : ""
            }`}
            required
          />
          {renderError("fullName")}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Adresse e-mail
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded-md ${
              errors.email && touched.email ? "border-red-500" : ""
            }`}
            required
          />
          {renderError("email")}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium">
            Numéro de téléphone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded-md ${
              errors.phone && touched.phone ? "border-red-500" : ""
            }`}
            required
          />
          {renderError("phone")}
        </div>

        {/* Service Type */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Service (Individuel ou Entreprise)</label>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="serviceType"
                value="individual"
                checked={formData.serviceType === "individual"}
                onChange={handleChange}
                onBlur={handleBlur}
                className="rounded"
              />
              <span>Individuel</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="serviceType"
                value="enterprise"
                checked={formData.serviceType === "enterprise"}
                onChange={handleChange}
                onBlur={handleBlur}
                className="rounded"
              />
              <span>Entreprise</span>
            </label>
          </div>
          {renderError("serviceType")}
        </div>

        {/* Conditional sections based on service type */}
        {formData.serviceType === "individual" ? (
          <div className="space-y-2">
            <label className="block text-sm font-medium">Fonction</label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="status"
                  value="student"
                  checked={formData.status === "student"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="rounded"
                />
                <span>Étudiant</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="status"
                  value="employee"
                  checked={formData.status === "employee"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="rounded"
                />
                <span>Salarié/fonctionnaire</span>
              </label>
            </div>
            {renderError("status")}
          </div>
        ) : formData.serviceType === "enterprise" && (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Fonction</label>
              <input
                type="text"
                name="customFunction"
                value={formData.customFunction}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-2 border rounded-md ${
                  errors.customFunction && touched.customFunction ? "border-red-500" : ""
                }`}
                placeholder="Entrez votre fonction"
                required
              />
              {renderError("customFunction")}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Division</label>
              <select
                name="division"
                value={formData.division}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-2 border rounded-md ${
                  errors.division && touched.division ? "border-red-500" : ""
                }`}
                required
              >
                <option value="">Sélectionnez une division</option>
                {ehcDivisions.map((division, index) => (
                  <option key={index} value={division}>
                    {division}
                  </option>
                ))}
              </select>
              {renderError("division")}
            </div>
          </>
        )}

        {/* Dynamic Service Selection */}
        {((formData.serviceType === "individual" && formData.status) ||
          (formData.serviceType === "enterprise" && formData.division)) && (
          <div className="space-y-2">
            <label className="block text-sm font-medium">Type de Service Demandé</label>
            <select
              name="requestedService"
              value={formData.requestedService}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-2 border rounded-md ${
                errors.requestedService && touched.requestedService ? "border-red-500" : ""
              }`}
              required
            >
              <option value="">Sélectionnez un service</option>
              {getAvailableServices().map((service, index) => (
                <option key={index} value={service}>
                  {service}
                </option>
              ))}
            </select>
            {renderError("requestedService")}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          style={{ color: "white" }}
          className={`w-full bg-teal-600 py-2 px-4 rounded-md transition-colors ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:bg-teal-700"
          }`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 12h2zm2 5.291A7.962 7.962 0 014 12H2c0 3.352 1.722 6.258 4.293 8.002l1.414-1.411z"
                ></path>
              </svg>
              En cours...
            </div>
          ) : (
            "Envoyer"
          )}
        </button>
      </form>
    </div>
  );
};

export default ServiceRequestForm;
