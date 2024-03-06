import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import AboutUsSection from "../../../components/AboutUsSection";
import GroupActionsSection from "../../../components/GroupActionsSection";
import WhatWeDoSection from "../../../components/WhatWeDoSection";
import PublicationsSection from "../../../components/PublicationsSection";
import TeamSection from "../../../components/TeamSection";
import PortfolioSection from "../../../components/PortfolioSection";
import Footer from "../../../components/Footer";
import api from "../../../resources/api";

function Home() {
  const [info, setInfo] = useState({});
  const [groupImage, setGroupImage] = useState({});
  const [posts, setPosts] = useState([]);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    async function loadInformations() {
      let { image, ...info } = (await api.get("/info/")).data;
      setGroupImage(image);
      setInfo(info);
    }

    async function loadPosts() {
      let { docs } = (await api.get("/post?public=true")).data;
      setPosts(docs);
    }

    async function loadTeam() {
      let participants = (await api.get("/participant?public=true")).data;
      setTeam(participants);
    }

    loadInformations();
    loadPosts();
    loadTeam();
  }, []);

  async function loadMoreParticipants() {
    if (team.hasNextPage) {
      let params = { page: team.page + 1 };
      let participants = (await api.get("/participant?public=true", { params }))
        .data;
      participants.docs = team.docs.concat(participants.docs);
      setTeam(participants);
    }
  }

  loadMoreParticipants();
  return (
    <React.Fragment>
      <Header home />
      <main>
        <AboutUsSection img={groupImage?.url} caption={groupImage?.alt} />
        <GroupActionsSection />
        <WhatWeDoSection />
        <PublicationsSection posts={posts} />
        <TeamSection
          participants={team?.docs}
          key={team.docs ? team?.docs.length : 0}
          loadMoreParticipants={loadMoreParticipants}
        />
        <PortfolioSection
          awards={info?.awardsNumber}
          projects={info?.projectsNumber}
          articles={info?.publicationsNumber}
        />
      </main>
      <Footer email={info.email} />
    </React.Fragment>
  );
}

export default Home;
