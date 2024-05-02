// LanguageSelector.js
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const changeLanguage = (language) => {
    //i18n.changeLanguage(language);
    router.push(router.pathname, router.asPath, { locale: language });
  };

  return (
    <select
      className="language-selector dropdown langDropdown navbar-purple text-white"
      onChange={(e) => changeLanguage(e.target.value)}
      value={router.locale}
      //defaultValue={i18n.language}
    >
      <option value="fr" className="bg-white text-dark">FR</option>
      <option value="ar" className="bg-white text-dark">AR</option>
      <option value="en" className="bg-white text-dark">EN</option>
    </select>
  );
};

export default LanguageSelector;
