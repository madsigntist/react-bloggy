import Head from "next/head";
import styles from "../styles/Home.module.css";
import { GraphQLClient, gql } from "graphql-request";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";

const graphcms = new GraphQLClient(
  "https://api-us-west-2.hygraph.com/v2/cl810m7400tly01tb29yid2l1/master"
);

const QUERY = gql`
  {
    posts {
      id
      title
      datePublished
      slug
      content {
        html
      }
      author {
        name
        avatar {
          url
        }
      }
      coverPhoto {
        url
      }
    }
  }
`;

export async function getStaticProps() {
  const { posts } = await graphcms.request(QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bloggy - NextJS Blog App</title>
        <meta name="description" content="Bloggy - NextJS Blog App Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.title}>
        <h1>Bloggy - NextJS Blog Demo</h1>
      </div>
      <main className={styles.main}>
        {posts.map((post) => (
          <BlogCard
            title={post.title}
            author={post.author}
            coverPhoto={post.coverPhoto}
            key={post.id}
            datePublished={post.datePublished}
            slug={post.slug}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}
