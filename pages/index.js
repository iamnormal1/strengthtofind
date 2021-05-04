//The homepage
import { getPosts } from '@lib/firebase';
import styles from '@styles/index.module.scss';
import { Layout } from '@components';
import { getFormattedDate } from '@lib/utils';


const HomePage = ({ posts }) => (
  <Layout>
    <div className={styles.HomePage}>
      <h1>Blog Posts</h1>
      {posts.map((post) => (
        <article key={post.slug}>
          <img src={post.coverImage} alt={post.coverImageAlt} />
          <div>
            <h2>{post.title}</h2>
            <span>{getFormattedDate(post.dateCreated)}</span>
            <p
              dangerouslySetInnerHTML={{
                __html: `${post.content.substring(0, 200)}...`,
              }}
            ></p> 
            <a href={`/post/${post.slug}`}>Continue Reading</a>
          </div>
        </article>
      ))}
    </div>
  </Layout>  
);

//This is for fetching data every time the page is visited. We do this
// so that we don't have to redploy the site every time we add a blog post.
export async function getServerSideProps() {
    const posts = await getPosts();
   
    return {
      props: {
        posts,
      },
    };
  }


 
export default HomePage;