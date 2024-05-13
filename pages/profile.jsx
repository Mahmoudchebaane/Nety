import { useEffect, useState } from "react";
import Header from "../components/header";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";
import Footer from "../components/footer";
import { useRouter } from "next/router";

export default function Profile() {
  const [user, setUser] = useState();
  async function getInfo() {
    const response = await fetch("/api/auth/profil", {
      method: "GET",
    });
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getInfo();
      setUser(userData.psdata);
    };
    fetchData();
  }, []);

  const router = useRouter();
  const handleModifierInformation = () => {
    router.push("/myInformations");
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          <div className="col">
            {user && (
              <div className="card card-img">
                <div className="card-header">
                  <i className="bi bi-person-check"></i>
                  <p>
                    Bienvenue <b>{user.firstname}</b> dans votre profil !
                  </p>
                </div>
                <div className="card-body text-center">
                  <p className="card-text">
                    <Link href="#mail" className="nav-link">
                      <i className="bi bi-envelope"></i>
                      {user.email}
                    </Link>
                  </p>
                </div>
                <div className="card-footer">
                  <button
                    className="btn btn-primary"
                    onClick={handleModifierInformation}
                  >
                    Modifier mes informations
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="col">
            <div className="card card-img">
              <img
                src="/image/pub_profile.png"
                className="card-img-top"
                alt="..."
              />
            </div>
          </div>

          <div className="col">
            <div className="card card-img">
              <img
                src="/image/pub_profile2.png"
                className="card-img-top"
                alt="..."
              />
            </div>
          </div>
          <div className="col">
            <div className="card card-img">
              <img
                src="/image/pub3_profile.png"
                className="card-img-top"
                alt="..."
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
