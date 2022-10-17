import Link from "next/link";
import styled from "styled-components";

export const DefaultLayout = (props) => {
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
        </Container>
      </Header>
      {props.children}
    </>
  );
};

const Nav = styled.nav``;

const Container = styled.div`
  margin: 0 auto;
  width: 1280px;
`;

const Anchor = styled.a``;

const Header = styled.header`
  background-color: red;
  padding: 24px;

  ${Anchor} {
    background-color: green;
  }
`;
