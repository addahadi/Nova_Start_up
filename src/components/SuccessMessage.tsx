import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface SuccessMessageProps {
  onReset: () => void;
}

export const SuccessMessage = ({ onReset }: SuccessMessageProps) => {
  const { t } = useTranslation();
  return (
    <Card className="p-8 bg-card border-border shadow-card text-center space-y-6 animate-scale-in">
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-primary" />
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">
          {t("success.title")} 🎉
        </h2>
        <p className="text-muted-foreground text-lg">{t("success.message")}</p>
      </div>
      <Button
        onClick={onReset}
        variant="outline"
        className="border-border hover:bg-secondary"
      >
        {t("registration.submit")}
      </Button>
    </Card>
  );
};
