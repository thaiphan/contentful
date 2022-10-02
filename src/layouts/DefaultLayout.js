import Link from "next/link";

export const DefaultLayout = (props) => {
  return (
    <>
      <header>
        <Link href="/">Home</Link>
        <Link href="/franchises">Franchises</Link>
        <Link href="/news">News</Link>
      </header>
      {props.children}
    </>
  );
};
