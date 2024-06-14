import Footer from '../components/footer';
import Header from "../components/header";
import Service from "../components/services";
import Slider from "../components/slider";
import Contacts from "../components/contacts";
import Inscription from "../components/inscription";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Product from "../components/product";
import { useTranslation } from 'next-i18next';
import TopPack from '../components/toppack';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    },
  };
}
export default function Home({}) {

  return (
    <>
      <Header />
      <Slider />
      <TopPack />
      <Service />
      <Product />
      <Contacts />
      <Inscription />
      <Footer />
    </>
  );
}
