import * as contentful from "contentful";

export default function Page(props) {
  return (
    <div>
      <main>
        <h1>{props.title}</h1>
        <div>{props.description}</div>
      </main>
    </div>
  );
}

const client = contentful.createClient({
  space: "aijk8pnq8fax",
  accessToken:
    "a3342eb30c0493594c80c7cd12c936be228594754a37874b5d80a0f9c662bac0",
});

export const getStaticPaths = async () => {
  const entries = await client.getEntries({
    content_type: "page",
  });

  const paths = entries.items.map((item) => ({
    params: { slug: item.fields.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (props) => {
  const response = await client.getEntries({
    content_type: "page",
    "fields.slug": props.params.slug,
  });

  return {
    props: response.items[0].fields,
  };
};
