import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";

export function RootLayout() {
  const { i18n } = useTranslation();
  const { lang } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
      document.dir = lang === "ar" ? "rtl" : "ltr";
    }
  }, [lang, i18n]);

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "ar" : "en";
    navigate(`/${newLang}`);
  };

  return (
    <div
      className={`min-h-screen ${lang === "ar" ? "font-arabic" : "font-sans"}`}
    >
      <div className="  mx-auto p-4">
        <div className="flex justify-end mb-4">
          <Button onClick={toggleLanguage} variant="outline">
            {lang === "en" ? "العربية" : "English"}
          </Button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
