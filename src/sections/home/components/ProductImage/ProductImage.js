import Image from "next/image"

import styles from './ProductImage.module.css'

export default function ProductImage({ src }) {
  return (
    <div className={styles.imageWrapper}>
      <Image src={src} layout="fill" className={styles.image} />
    </div>
  )
}
