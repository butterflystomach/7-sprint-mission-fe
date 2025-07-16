import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useRouter } from "next/router";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex-grow: 1;
`;

const Layout = ({ children }) => {
  const router = useRouter();
  const isAuthPage =
    router.pathname === "/login" || router.pathname === "/signup";

  return (
    <PageContainer>
      {!isAuthPage && <Header />}
      <MainContent className={isAuthPage ? "" : "withHeader"}>
        {children}
      </MainContent>
      {!isAuthPage && <Footer />}
    </PageContainer>
  );
};

export default Layout;
