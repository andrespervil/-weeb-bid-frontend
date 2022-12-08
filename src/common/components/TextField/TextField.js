import styles from './TextField.module.css'

export default function TextField({ ...props }) {
  return <input className={styles.textField} type="text" {...props} />
}
