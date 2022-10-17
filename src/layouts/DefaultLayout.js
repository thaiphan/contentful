import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

export const DefaultLayout = (props) => {
  const router = useRouter();
  const { asPath, locale } = router;

  const newLocale = locale === "en-CA" ? "fr-CA" : "en-CA";

  return (
    <>
      <Header>
        <Container>
          <Nav>
            <Link href="/" passHref>
              <Anchor>Home</Anchor>
            </Link>
            <Link href="/contact-us" passHref>
              <Anchor>Contact Us</Anchor>
            </Link>
          </Nav>
          <Link href={asPath} locale={newLocale} passHref>
            <Anchor>{newLocale.substring(0, 2).toUpperCase()}</Anchor>
          </Link>
        </Container>
      </Header>
      {props.children}
    </>
  );
};

const Nav = styled.nav`
  display: flex;
  gap: 24px;
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 1280px;
`;

const Anchor = styled.a`
  color: white;
  :hover {
    text-decoration: underline;
  }
`;

const Header = styled.header`
  background-color: black;
  padding: 24px;
`;
