import Image from 'next/image'
import styles from './page.module.css'
import Designer from './designer'

export default function Home() {
  return (
    <main className={styles.main}>
      <Designer />
    </main>
  )
}
