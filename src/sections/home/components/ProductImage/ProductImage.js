import Image from 'next/image'

import styles from './ProductImage.module.css'

export default function ProductImage({ src, alt }) {
  return (
    <div className={styles.imageWrapper}>
      <Image src={src} layout="fill" className={styles.image} alt={alt} />
    </div>
  )
}
