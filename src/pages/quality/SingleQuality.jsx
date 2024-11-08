import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Layout from "../../Layouts/Layout";
import GermanComponent from "../../components/quality/GermanComponent";
import Material from "../../components/quality/Material";
import Mobel from "../../components/quality/Mobel";
import NachComponent from "../../components/quality/NachComponent";

const SingleQuality = () => {
  const pathname = useParams();
  const [page, setPage] = useState("");
  const slug = pathname?.slug;
  const title = slug && slug.charAt(0).toUpperCase() + slug.slice(1);

  useEffect(() => {
    setPage("");
    if (slug === "nachhaltigkeit") {
      setPage("nachhaltigkeit");
    } else if (slug === "made in Germany") {
      setPage("made in Germany");
    } else if (slug === "materialien") {
      setPage("materialien");
    } else if (slug === "möbel nach Skizze & Sonderwünsche") {
      setPage("möbel nach Skizze & Sonderwünsche");
    }
  }, [slug]);
  return (
    <Layout>
      {page === "nachhaltigkeit" && <NachComponent title={title} />}
      {page === "made in Germany" && <GermanComponent title={title} />}
      {page === "materialien" && <Material title={title} />}
      {page === "möbel nach Skizze & Sonderwünsche" && <Mobel title={title} />}
    </Layout>
  );
};

export default SingleQuality;
