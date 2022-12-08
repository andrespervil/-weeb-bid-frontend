import styles from './ConnectionStatus.module.css'

export default function ConnectionStatus({ connectionStatus }) {
  return <div className={styles.connectionStatus} data-status={connectionStatus} />
}
