import * as contentful from "contentful";
import { DefaultLayout } from "../layouts/DefaultLayout";
import styled from "styled-components";
import Head from "next/head";

export default function Page(props) {
  return (
    <DefaultLayout>
      <Head>
        <title>{props.title}</title>
      </Head>
      {props.sections?.map((section) => {
        switch (section.fields.type) {
          case "FiftyFifty":
            return (
              <section key={section.sys.id}>
                <h1>{section.fields.title}</h1>
              </section>
            );
          case "Hero":
            return (
              <Hero key={section.sys.id}>
                <h1>{section.fields.title}</h1>
              </Hero>
            );
          default:
            return null;
        }
      })}
    </DefaultLayout>
  );
}

const Hero = styled.section`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 30vh;
`;

const client = contentful.createClient({
  space: "aijk8pnq8fax",
  accessToken:
    "a3342eb30c0493594c80c7cd12c936be228594754a37874b5d80a0f9c662bac0",
});

export const getStaticPaths = async (context) => {
  const entries = await client.getEntries({
    content_type: "page",
  });

  const paths = entries.items.map((item) => {
    let slug = undefined;
    if (item.fields.slug !== "/") {
      slug = [item.fields.slug];
    }

    return {
      params: {
        slug,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (props) => {
  const slug = props.params.slug?.join("/") ?? "/";

  const response = await client.getEntries({
    content_type: "page",
    "fields.slug": slug,
    limit: 1,
    locale: props.locale,
  });

  if (response.items.length > 0) {
    return {
      props: response.items[0].fields,
      revalidate: 10,
    };
  } else {
    return {
      notFound: true,
    };
  }
};
