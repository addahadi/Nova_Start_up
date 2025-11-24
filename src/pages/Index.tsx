import { useState } from "react";
import { useTranslation } from "react-i18next";
import RegistrationForm from "@/components/RegistrationForm";
import { DepartmentCards } from "@/components/DepartmentCards";
import { DepartmentReasonDialog } from "@/components/DepartmentReasonDialog";
import { SuccessMessage } from "@/components/SuccessMessage";
import Countdown from "@/components/Countdown";
import clubLogo from "@/assets/club-logo.png";

interface FormData {
  name: string;
  number: string;
  email: string;
  speciality: string;
  eventReason: string;
  hasProject: string;
  challenges: string;
}

const Index = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    number: "",
    email: "",
    speciality: "",
    eventReason: "",
    hasProject: "",
    challenges: "",
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
      eventReason: "",
      hasProject: "",
      challenges: "",
    });
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen py-12 ">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Logo Section */}
        <div className=" animate-fade-in">
          <div className="text-start">
            <h1 className="text-6xl md:text-6xl font-bold  text-white mb-6">
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

        {submitted ? (
          <SuccessMessage onReset={handleReset} />
        ) : (
          <>
            {/* Registration Form */}
            <div className="animate-fade-in">
              <RegistrationForm
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
