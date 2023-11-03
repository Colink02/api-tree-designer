"use client";

import Image from 'next/image'
import styles from './page.module.css'
import Designer from './designer'
import { ReactFlowProvider } from 'reactflow'

export default function Home() {
  return (
    <main className={styles.main}>
      <ReactFlowProvider>
        <Designer />
      </ReactFlowProvider>
    </main>
  )
}
