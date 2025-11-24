import { Card } from "@/components/ui/card";
import {
  Users,
  Code,
  Palette,
  Video,
  Megaphone,
  Lightbulb,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface Department {
  id: string;
  icon: React.ReactNode;
}

const departments: Department[] = [
  {
    id: "organization",
    icon: <Users className="w-8 h-8" />,
  },
  {
    id: "development",
    icon: <Code className="w-8 h-8" />,
  },
  {
    id: "design",
    icon: <Palette className="w-8 h-8" />,
  },
  {
    id: "media",
    icon: <Video className="w-8 h-8" />,
  },
  {
    id: "marketing",
    icon: <Megaphone className="w-8 h-8" />,
  },
  {
    id: "innovation",
    icon: <Lightbulb className="w-8 h-8" />,
  },
];

interface DepartmentCardsProps {
  selectedDepartment: string;
  onSelect: (dept: string) => void;
}

export const DepartmentCards = ({
  selectedDepartment,
  onSelect,
}: DepartmentCardsProps) => {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Choose Your Department
        </h2>
        <p className="text-muted-foreground">
          Select the department you'd like to join
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((dept) => {
          const isSelected = selectedDepartment === dept.name;
          return (
            <Card
              key={dept.name}
              onClick={() => onSelect(dept.name)}
              className={`
                p-6 cursor-pointer transition-all duration-300 hover:scale-105
                ${
                  isSelected
                    ? "bg-gradient-primary border-primary shadow-glow"
                    : "card-blur hover:border-primary/50 shadow-card"
                }
              `}
            >
              <div
                className={`
                flex flex-col items-center text-center space-y-3
                ${isSelected ? "text-primary-foreground" : "text-foreground"}
              `}
              >
                <div
                  className={`
                  p-3 rounded-full transition-colors
                  ${isSelected ? "bg-primary-foreground/10" : "bg-primary/10"}
                `}
                >
                  {dept.icon}
                </div>
                <h3 className="font-semibold text-lg">{dept.name}</h3>
                <p
                  className={`text-sm ${
                    isSelected
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  }`}
                >
                  {dept.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
