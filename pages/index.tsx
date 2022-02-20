// import type { NextPage } from 'next'
// import Head from 'next/head'
// import Image from '../components/Image'
// import Link from 'next/link'
import FileSaver from 'file-saver';
import correggiTitoli from '../utils/correggi-titoli'
import LoadButton from './components/LoadButton'
import ClipTable from './components/ClipTable';
import * as xml from '../utils/xml'
import { useState } from 'react';
import FixTitlesButton from './components/FixTitlesButton';
import ExportButton from './components/ExportButton';

export default function Home() {
  const [fcpxml, setFcpxml] = useState({})

  const handleOnInputFile = async (files: FileList | null) => {
    if (!files || files.length == 0) return
    if (files.item(0)) {
      const fileName = files.item(0)?.name || "ciao"
      const fileText: string | undefined = await files.item(0)?.text()
      console.log('fileText', fileText)
      if (fileText) {
        try {
          setFcpxml(xml.parse(fileText));
        } catch (error) {
          alert('File non valido')
        }
      }
    }
  }

  const handleOnClickFixTitles = (event: any) => {
    setFcpxml(event);
  }

  return (
    <div>
      <div style={{ display: 'inline-flex' }}>
        <LoadButton
          onChange={e => { handleOnInputFile(e.target.files); e.target.value = '' }}
          text="Carica fcpxml"
        />
        <FixTitlesButton
          style={{ marginLeft: '15px' }}
          fcpxml={fcpxml}
          onClick={handleOnClickFixTitles}
        />
      </div>

      <div style={{ height: 'calc(100vh - 125 px)' }}>
        <ClipTable fcpxml={fcpxml} />
      </div>
      <ExportButton fcpxml={fcpxml} fileName='output.fcpxml' />
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
