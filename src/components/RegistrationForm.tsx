import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  number: string;
  email: string;
  speciality: string;
  year: string;
  previousEvents: string;
  mainObjective: string;
}

interface RegistrationFormProps {
  onSubmit: (data: FormData) => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export const RegistrationForm = ({
  onSubmit,
  formData,
  setFormData,
}: RegistrationFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { toast } = useToast();

  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.number ||
      !formData.email ||
      !formData.speciality ||
      !formData.year ||
      !formData.previousEvents ||
      !formData.mainObjective
    ) {
      toast({
        variant: "destructive",
        title: t("registration.error") || "Error",
        description:
          t("registration.fillAllFields") || "Please fill all required fields",
      });
      return;
    }

    setIsLoading(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone_number: formData.number,
          speciality: formData.speciality,
          university_year: formData.year,
          previous_events: formData.previousEvents,
          main_objective: formData.mainObjective,
        },
        EMAILJS_PUBLIC_KEY
      );

      toast({
        title: t("registration.success") || "Success!",
        description:
          t("registration.emailSent") ||
          "Your registration has been submitted successfully.",
      });

      onSubmit(formData);
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        variant: "destructive",
        title: t("registration.error") || "Error",
        description:
          t("registration.errorSending") ||
          "Failed to send registration. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6 space-y-5 bg-card/60 backdrop-blur-md border-border/50 shadow-card">
        {/* Full Name */}
        <div className="space-y-2">
          <Label className="text-foreground font-medium">
            {t("registration.fullName")}
          </Label>
          <Input
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            required
            placeholder={t("registration.fullNamePlaceholder")}
            className="input backdrop-blur-sm"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label className="text-foreground font-medium">
            {t("registration.phone")}
          </Label>
          <Input
            type="tel"
            value={formData.number}
            onChange={(e) => updateField("number", e.target.value)}
            required
            placeholder={t("registration.phonePlaceholder")}
            className="input backdrop-blur-sm"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label className="text-foreground font-medium">
            {t("registration.email")}
          </Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            required
            placeholder={t("registration.emailPlaceholder")}
            className="input backdrop-blur-sm"
          />
        </div>

        {/* Speciality */}
        <div className="space-y-2">
          <Label className="text-foreground font-medium">
            {t("registration.speciality")}
          </Label>
          <Input
            value={formData.speciality}
            onChange={(e) => updateField("speciality", e.target.value)}
            required
            placeholder={t("registration.specialityPlaceholder")}
            className="input backdrop-blur-sm"
          />
        </div>

        {/* University Year */}
        <div className="space-y-2">
          <Label className="text-foreground font-medium">
            {t("registration.year")}
          </Label>
          <Select
            value={formData.year}
            onValueChange={(value) => updateField("year", value)}
            required
          >
            <SelectTrigger className="select backdrop-blur-sm">
              <SelectValue placeholder={t("registration.yearPlaceholder")} />
            </SelectTrigger>
            <SelectContent className="bg-popover/95 backdrop-blur-md border-border/50 z-50">
              <SelectItem value="L1">{t("registration.L1")}</SelectItem>
              <SelectItem value="L2">{t("registration.L2")}</SelectItem>
              <SelectItem value="L3">{t("registration.L3")}</SelectItem>
              <SelectItem value="M1">{t("registration.M1")}</SelectItem>
              <SelectItem value="M2">{t("registration.M2")}</SelectItem>
              <SelectItem value="graduate">
                {t("registration.graduate")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Previous Entrepreneurship Events */}
        <div className="space-y-2">
          <Label className="text-foreground font-medium">
            {t("registration.previousEvents")}
          </Label>
          <Select
            value={formData.previousEvents}
            onValueChange={(value) => updateField("previousEvents", value)}
            required
          >
            <SelectTrigger className="select backdrop-blur-sm">
              <SelectValue
                placeholder={t("registration.previousEventsPlaceholder")}
              />
            </SelectTrigger>
            <SelectContent className="bg-popover/95 backdrop-blur-md border-border/50 z-50">
              <SelectItem value="yes">{t("registration.yes")}</SelectItem>
              <SelectItem value="no">{t("registration.no")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Main Objective */}
        <div className="space-y-2">
          <Label className="text-foreground font-medium">
            {t("registration.mainObjective")}
          </Label>
          <Textarea
            value={formData.mainObjective}
            onChange={(e) => updateField("mainObjective", e.target.value)}
            required
            placeholder={t("registration.mainObjectivePlaceholder")}
            className="textarea min-h-[100px] resize-none backdrop-blur-sm"
          />
        </div>
      </Card>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-glow font-semibold py-6"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            {t("registration.sending")}
          </>
        ) : (
          t("registration.submit")
        )}
      </Button>
    </form>
  );
};

export default RegistrationForm;
