// import type { NextPage } from 'next'
// import Head from 'next/head'
// import Image from '../components/Image'
// import Link from 'next/link'
import LoadButton from './components/LoadButton'
import ClipTable from './components/ClipTable';
import FixTitlesButton from './components/FixTitlesButton';
import ExportButton from './components/ExportButton';
import ChangelogModal from './components/ChangelogModal'
import fs from 'fs/promises'
import TrovaESostituisci from './components/TrovaESostituisci';

type HomeProps = {
  changelogMd: string,
  currentVersion: string
}

export default function Home({ changelogMd, currentVersion }: HomeProps) {
  return (
    <div>
      <ChangelogModal changelogMd={changelogMd} currentVersion={currentVersion} />
      <div style={{ display: 'inline-flex', marginBottom: '15px' }}>
        <LoadButton />
        <FixTitlesButton style={{ marginLeft: '15px' }} />
        <TrovaESostituisci style={{ marginLeft: '15px' }} />
        <ExportButton fileName='output.fcpxml' />
      </div>

      <div style={{ 
        // height: 'calc(100vh - 125 px)' 
        }}>
        <ClipTable />
      </div>
    </div>
  )
}

// const Home: NextPage = () => {
//   return (
//     <div className={styles.container}>
//       <main className={styles.main}>
//         <h1 className={styles.title}>
//           Welcome to <a href="https://nextjs.org">Next.js!</a>
//         </h1>

//         <p className={styles.description}>
//           Read{' '}
//           <Link href="/posts/first-post">
//             <a>this page!</a>
//           </Link>
//         </p>

//         <div className={styles.grid}>
//           <a href="https://nextjs.org/docs" className={styles.card}>
//             <h2>Documentation &rarr;</h2>
//             <p>Find in-depth information about Next.js features and API.</p>
//           </a>

//           <a href="https://nextjs.org/learn" className={styles.card}>
//             <h2>Learn &rarr;</h2>
//             <p>Learn about Next.js in an interactive course with quizzes!</p>
//           </a>

//           <a
//             href="https://github.com/vercel/next.js/tree/canary/examples"
//             className={styles.card}
//           >
//             <h2>Examples &rarr;</h2>
//             <p>Discover and deploy boilerplate example Next.js projects.</p>
//           </a>

//           <a
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//           >
//             <h2>Deploy &rarr;</h2>
//             <p>
//               Instantly deploy your Next.js site to a public URL with Vercel.
//             </p>
//           </a>
//         </div>
//       </main>

//       <footer className={styles.footer}>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by{' '}
//           <span className={styles.logo}>
//             <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
//           </span>
//         </a>
//       </footer>
//     </div>
//   )
// }

// export default Home

export async function getStaticProps() {
  const [changelogMd, packageJson] = await Promise.all([
    fs.readFile('./Changelog.md', { encoding: 'utf-8' }),
    fs.readFile('./package.json', { encoding: 'utf8' })
  ])

  return {
    props: {
      changelogMd,
      currentVersion: JSON.parse(packageJson).version
    },
  }
}
