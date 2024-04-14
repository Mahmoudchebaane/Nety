import Footer from "@/components/footer";
import Header from "@/components/header";
import Navbar from "@/components/navbar";
import Service  from "@/components/services";
import Produit from "@/components/produit";
import Slider from "@/components/slider";
import Contacts from "@/components/contacts";
import Inscription from "@/components/inscription";
import MonCarrousel from "@/components/test";

export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <Slider />
     
      <Service />
      <Contacts/>
      <Inscription/>
      
      
      <Footer />
    </>
  );
}
