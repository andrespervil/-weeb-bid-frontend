import useCountdown from '../../hooks/useCountdown'

import styles from './CountDownTimer.module.css'

export default function CountDownTimer({ productWeek }) {
  const year = new Date(new Date().getFullYear(), 0, 1)
  const totalDays = productWeek * 7

  const targetDate = new Date(year.getTime() + totalDays * 24 * 60 * 60 * 1000)

  const [days, hours, minutes, seconds] = useCountdown(targetDate)

  if (days + hours + minutes + seconds <= 0) {
    return null
  } else {
    return (
      <div className={styles.container}>
        <h3>Tiempo restante</h3>
        <div className={styles.content}>
          <div className={days < 1 && styles.red}>
            {days}
            <p>DIAS</p>
          </div>
          <p>:</p>
          <div>
            {hours}
            <p>HORAS</p>
          </div>
          <p>:</p>
          <div>
            {minutes}
            <p>MINS</p>
          </div>
          <p>:</p>
          <div>
            {seconds}
            <p>SEGS</p>
          </div>
        </div>
      </div>
    )
  }
}
