import * as contentful from "contentful";
import { DefaultLayout } from "../layouts/DefaultLayout";
import styled from "styled-components";
import Head from "next/head";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

export default function Page(props) {
  return (
    <DefaultLayout>
      <Head>
        <title>{props.title}</title>
      </Head>
      {props.sections?.map((section) => {
        switch (section.fields.type) {
          case "FiftyFifty":
            console.log(section.fields.image.fields.file.details.image);
            return (
              <section>
                <FiftyFifty key={section.sys.id}>
                  <ImageContainer>
                    <Image
                      src={`https:${section.fields.image.fields.file.url}`}
                      layout="responsive"
                      height={
                        section.fields.image.fields.file.details.image.height
                      }
                      width={
                        section.fields.image.fields.file.details.image.width
                      }
                    />
                  </ImageContainer>
                  <FiftyFiftyContent>
                    <div>
                      <h1>{section.fields.title}</h1>
                      {documentToReactComponents(section.fields.description)}
                    </div>
                  </FiftyFiftyContent>
                </FiftyFifty>
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

const ImageContainer = styled.div`
  position: relative;
`;

const FiftyFiftyContent = styled.div`
  display: flex;
  align-items: center;
`;

const FiftyFifty = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  margin: 0 auto;
  max-width: 1280px;

  ${ImageContainer} {
    grid-column: 1 / span 6;
  }

  ${FiftyFiftyContent} {
    grid-column: 8 / -1;
  }
`;

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
