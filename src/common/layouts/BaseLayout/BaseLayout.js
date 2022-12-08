import styles from './BaseLayout.module.css'

export default function BaseLayout({ children }) {
  return (
    <div className={styles.container}>
      <div>{children}</div>
    </div>
  )
}
