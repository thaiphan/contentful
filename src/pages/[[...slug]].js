import * as contentful from "contentful";
import { DefaultLayout } from "../layouts/DefaultLayout";

export default function Page(props) {
  return (
    <DefaultLayout>
      <h1>{props.title}</h1>
      <div>{props.description}</div>
    </DefaultLayout>
  );
}

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
    locale: props.locale,
  });

  if (response.items.length > 0) {
    return {
      props: response.items[0].fields,
    };
  } else {
    return {
      notFound: true,
    };
  }
};
