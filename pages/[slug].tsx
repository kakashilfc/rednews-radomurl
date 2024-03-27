import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import { GetServerSideProps } from 'next';
import Container from '../components/container'
import PostBody from '../components/post-body'
import MoreStories from '../components/more-stories'
import Header from '../components/header'
import PostHeader from '../components/post-header'
import SectionSeparator from '../components/section-separator'
import Layout from '../components/layout'
import PostTitle from '../components/post-title'
import Tags from '../components/tags'
import { getAllPostsWithSlug, getPostAndMorePosts } from '../lib/api'
import { CMS_NAME } from '../lib/constants'



export default function Post({slug, host, post, posts, preview }) {
	const morePosts = posts?.edges
	const removeTags = (str: string) => {
		if (str === null || str === '') return '';
		else str = str.toString();
		return str.replace(/(<([^>]+)>)/gi, '').replace(/\[[^\]]*\]/, '');
	};


  return (
    <Layout preview={preview}>
      <Container>
        <Header />
   
          <>
            <article>
              <PostHeader
                title={post.title}
                coverImage={post.featuredImage}
                date={post.date}
                author={post.author}
                categories={post.categories}
                
              />
              <PostBody content={post.content} />
              <footer>
                <p>{slug}</p> 
                {post.tags.edges.length > 0 && <Tags tags={post.tags} />}
              </footer>
            </article>

            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </>
       
      </Container>
    </Layout>
  )
}


//////////////


export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
  preview = false,
  previewData,

}) => {
  console.log(params);
  console.log(params?.slug);
  const slug = params?.slug;
 
  const host = req.headers.host;

  const referringURL = req.headers?.referer || null;
  const domain_url = process.env.WORDPRESS_API_URL as string;
  const data = await getPostAndMorePosts(params?.slug, preview, previewData)


	if (referringURL?.includes('facebook.com')) {
		return {
			redirect: {
				permanent: false,
        destination:'https://rednews9.com/'+encodeURI(slug  as string),
				/*destination: `${
					//domain_url.replace(/(\/graphql)/, '/') + encodeURI(slug  as string)
          domain_url.replace(/(\/animalsgraphql)/, '/') + encodeURI(slug  as string)
				}`,*/
			},
		};
	}
  return {
    props: {
      
      slug,
      host,
      preview,
      post: data.post,
      posts: data.posts,
    }
  }
}
