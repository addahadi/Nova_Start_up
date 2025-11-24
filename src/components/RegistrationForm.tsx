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
  eventReason: string;
  hasProject: string;
  challenges: string;
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

  // EmailJS Configuration from environment variables
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields are filled
    if (
      !formData.name ||
      !formData.number ||
      !formData.email ||
      !formData.speciality ||
      !formData.hasProject ||
      !formData.eventReason ||
      (formData.hasProject === "yes" && !formData.challenges)
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
      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone_number: formData.number,
          speciality: formData.speciality,
          event_reason: formData.eventReason,
          has_project: formData.hasProject,
          challenges: formData.challenges,
        },
        EMAILJS_PUBLIC_KEY
      );

      console.log("Email sent successfully!");
      toast({
        title: t("registration.success") || "Success!",
        description:
          t("registration.emailSent") ||
          "Your registration has been sent successfully",
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
      <Card className="p-6 space-y-5 bg-card/30 backdrop-blur-md border-border/50 shadow-card">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground font-medium">
            {t("registration.fullName")}
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            required
            className="input backdrop-blur-sm"
            placeholder={t("registration.fullNamePlaceholder")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="number" className="text-foreground font-medium">
            {t("registration.phone")}
          </Label>
          <Input
            id="number"
            type="tel"
            value={formData.number}
            onChange={(e) => updateField("number", e.target.value)}
            required
            className="input backdrop-blur-sm"
            placeholder={t("registration.phonePlaceholder")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground font-medium">
            {t("registration.email")}
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            required
            className="input backdrop-blur-sm"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="speciality" className="text-foreground font-medium">
            {t("registration.speciality")}
          </Label>
          <Input
            id="speciality"
            value={formData.speciality}
            onChange={(e) => updateField("speciality", e.target.value)}
            required
            className="input backdrop-blur-sm"
            placeholder={t("registration.specialityPlaceholder")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hasProject" className="text-foreground font-medium">
            {t("registration.hasProject")}
          </Label>
          <Select
            value={formData.hasProject}
            onValueChange={(value) => updateField("hasProject", value)}
            required
          >
            <SelectTrigger className="select backdrop-blur-sm">
              <SelectValue
                placeholder={t("registration.hasProjectPlaceholder")}
              />
            </SelectTrigger>
            <SelectContent className="bg-popover/80 backdrop-blur-md border-border/50 z-50">
              <SelectItem value="yes">{t("registration.yes")}</SelectItem>
              <SelectItem value="no">{t("registration.no")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.hasProject === "yes" && (
          <div className="space-y-2">
            <Label htmlFor="challenges" className="text-foreground font-medium">
              {t("registration.challenges")}
            </Label>
            <Textarea
              id="challenges"
              value={formData.challenges}
              onChange={(e) => updateField("challenges", e.target.value)}
              required
              className="textarea min-h-[100px] resize-none backdrop-blur-sm"
              placeholder={t("registration.challengesPlaceholder")}
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="eventReason" className="text-foreground font-medium">
            {t("registration.eventReason")}
          </Label>
          <Textarea
            id="eventReason"
            value={formData.eventReason}
            onChange={(e) => updateField("eventReason", e.target.value)}
            required
            className="textarea min-h-[100px] resize-none backdrop-blur-sm"
            placeholder={t("registration.eventReasonPlaceholder")}
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
