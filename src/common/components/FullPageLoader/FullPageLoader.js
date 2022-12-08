import styles from './FullPageLoader.module.css'

export default function FullPageLoader({}) {
  return (
    <div className={styles.container}>
      <div className={styles.fullPageLoader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
