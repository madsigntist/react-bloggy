import { GraphQLClient, gql } from "graphql-request";
import styles from "../../styles/Slug.module.css";
import Link from "next/link";
import Footer from "../../components/Footer";

const graphcms = new GraphQLClient(
  "https://api-us-west-2.hygraph.com/v2/cl810m7400tly01tb29yid2l1/master"
);

const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      datePublished
      author {
        id
        name
        avatar {
          url
        }
      }
      content {
        html
      }
      coverPhoto {
        id
        url
      }
    }
  }
`;

const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { posts } = await graphcms.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, { slug });
  const post = data.post;

  return {
    props: {
      post,
    },
    revalidate: 30,
  };
}

export default function BlogPost({ post }) {
  return (
    <main className={styles.blog}>
      <img
        className={styles.cover}
        src={post.coverPhoto.url}
        alt={post.title}
      />
      <div className={styles.title}>
        <div className={styles.authdetails}>
          <img src={post.author.avatar.url} alt={post.author.name} />
          <div className={styles.authtext}>
            <h6 className={styles.date}>{post.datePublished}</h6>
          </div>
        </div>
        <h2>{post.title}</h2>
      </div>

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content.html }}
      ></div>
      <Link href={"../"}>
        <div className={styles.goBack}>
          <h3>..go back</h3>
        </div>
      </Link>
      <Footer />
    </main>
  );
}