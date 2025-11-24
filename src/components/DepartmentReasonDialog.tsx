import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface DepartmentReasonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  department: string;
  reason: string;
  onReasonChange: (reason: string) => void;
  onConfirm: () => void;
}

export const DepartmentReasonDialog = ({
  isOpen,
  onClose,
  department,
  reason,
  onReasonChange,
  onConfirm,
}: DepartmentReasonDialogProps) => {
  const { t } = useTranslation();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-popover border-border shadow-card sm:max-w-[500px] animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-foreground text-xl">
            {t("departments.reasonDialog.title")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => onReasonChange(e.target.value)}
              className="bg-input border-border focus:ring-primary min-h-[150px] resize-none"
              placeholder={t("departments.reasonDialog.placeholder")}
            />
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-border hover:bg-secondary"
            >
              {t("departments.reasonDialog.cancel")}
            </Button>
            <Button
              type="button"
              onClick={onConfirm}
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
              disabled={!reason.trim()}
            >
              {t("departments.reasonDialog.submit")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
