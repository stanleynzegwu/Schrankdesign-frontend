import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Layout from "../../Layouts/Layout";
import BestEllung from "../../components/service/BestEllung";
import Konkat from "../../components/service/Konkat";
import Life from "../../components/service/Life";
import Muster from "../../components/service/Muster";

const SingleService = () => {
  const pathname = useParams();
  const [page, setPage] = useState("");
  const slug = pathname?.slug;
  const title = slug && slug.charAt(0).toUpperCase() + slug.slice(1);
  useEffect(() => {
    setPage("");
    if (slug === "bestellung & Konfiguration") {
      setPage("bestellung & Konfiguration");
    } else if (slug === "kontakt") {
      setPage("kontakt");
    } else if (slug === "lieferung & Montage") {
      setPage("lieferung & Montage");
    } else if (slug === "muster") {
      setPage("muster");
    }
  }, [pathname, slug]);
  return (
    <Layout>
      {page === "bestellung & Konfiguration" && (
        <>
          <BestEllung title={title} />
        </>
      )}
      {page === "kontakt" && (
        <>
          <Konkat title={title} />
        </>
      )}
      {page === "lieferung & Montage" && (
        <>
          <Life title={title} />
        </>
      )}
      {page === "muster" && (
        <>
          <Muster title={title} />
        </>
      )}
    </Layout>
  );
};

export default SingleService;
