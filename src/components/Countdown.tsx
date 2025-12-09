import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown = () => {
  const { t } = useTranslation();
  const [time, setTime] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();

      // Calculate the next Wednesday at 9:00 AM
      const currentDay = now.getDay();
      const daysUntilWednesday = (3 - currentDay + 7) % 7 || 7;

      const nextWednesday = new Date(now);
      nextWednesday.setDate(now.getDate() + daysUntilWednesday);
      nextWednesday.setHours(9, 0, 0, 0);

      const difference = nextWednesday.getTime() - now.getTime();

      if (difference > 0) {
        setTime({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center space-y-4">
      <div className="grid grid-cols-4 gap-4 justify-center">
        <div className="bg-white/70 dark:bg-gradient-primary/10 backdrop-blur-md border border-gray-300 dark:border-border/50 rounded-lg p-4 shadow-sm">
          <div className="text-3xl md:text-4xl font-bold text-black dark:text-primary">
            {String(time.days).padStart(2, "0")}
          </div>
          <div className="text-sm text-gray-600 dark:text-muted-foreground mt-2">
            {t("countdown.days")}
          </div>
        </div>

        <div className="bg-white/70 dark:bg-gradient-primary/10 backdrop-blur-md border border-gray-300 dark:border-border/50 rounded-lg p-4 shadow-sm">
          <div className="text-3xl md:text-4xl font-bold text-black dark:text-primary">
            {String(time.hours).padStart(2, "0")}
          </div>
          <div className="text-sm text-gray-600 dark:text-muted-foreground mt-2">
            {t("countdown.hours")}
          </div>
        </div>

        <div className="bg-white/70 dark:bg-gradient-primary/10 backdrop-blur-md border border-gray-300 dark:border-border/50 rounded-lg p-4 shadow-sm">
          <div className="text-3xl md:text-4xl font-bold text-black dark:text-primary">
            {String(time.minutes).padStart(2, "0")}
          </div>
          <div className="text-sm text-gray-600 dark:text-muted-foreground mt-2">
            {t("countdown.minutes")}
          </div>
        </div>

        <div className="bg-white/70 dark:bg-gradient-primary/10 backdrop-blur-md border border-gray-300 dark:border-border/50 rounded-lg p-4 shadow-sm">
          <div className="text-3xl md:text-4xl font-bold text-black dark:text-primary">
            {String(time.seconds).padStart(2, "0")}
          </div>
          <div className="text-sm text-gray-600 dark:text-muted-foreground mt-2">
            {t("countdown.seconds")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
