import { useState } from "react";
import { useTranslation } from "react-i18next";
import RegistrationForm from "@/components/RegistrationForm";
import { SuccessMessage } from "@/components/SuccessMessage";
import Countdown from "@/components/Countdown";

interface FormData {
  name: string;
  number: string;
  email: string;
  speciality: string;
  year: string;
  previousEvents: string;
  mainObjective: string;
}

const Index = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    number: "",
    email: "",
    speciality: "",
    year: "",
    previousEvents: "",
    mainObjective: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      number: "",
      email: "",
      speciality: "",
      year: "",
      previousEvents: "",
      mainObjective: "",
    });
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto space-y-8 px-4">
        {/* Header Section */}
        <div className="animate-fade-in">
          <div className="text-start">
            <h1 className="text-6xl md:text-6xl font-bold text-foreground mb-6">
              {t("registration.title")}
            </h1>
            <p className="text-muted-foreground mt-2">
              {t("registration.description")}
            </p>
          </div>
        </div>

        {/* Countdown Section */}
        <div className="animate-fade-in">
          <Countdown />
        </div>

        {/* Form or Success Message */}
        {submitted ? (
          <SuccessMessage onReset={handleReset} />
        ) : (
          <div className="animate-fade-in">
            <RegistrationForm
              onSubmit={handleSubmit}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
