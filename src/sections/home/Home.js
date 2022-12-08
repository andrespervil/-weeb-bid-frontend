import React, { useState, useCallback, useEffect, useMemo } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import Image from 'next/image'

import Button from '../../common/components/Button/Button'
import TextField from '../../common/components/TextField/TextField'
import FullPageLoader from '../../common/components/FullPageLoader/FullPageLoader'

import styles from './Home.module.css'

export default function HomeSection({}) {
  //Public API that will echo messages sent to it back to the client
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(
    process.env.NEXT_PUBLIC_SOCKET_URL,
    {
      shouldReconnect: (closeEvent) => true, // Attempt to reconnect
      reconnectInterval: 1000,
    }
  )

  const { product, lastBid } = useMemo(() => {
    if (lastMessage) {
      const _product = JSON.parse(lastMessage.data)

      return {
        product: _product,
        lastBid: [...(_product.bids || [])].pop(),
      }
    }

    return {
      product: null,
      lastBid: null,
    }
  }, [lastMessage])

  const [bid, setBid] = useState(null)

  const handleClickSendMessage = () => {
    sendJsonMessage({
      event: 'bid',
      bidValue: bid,
    })

    setBid(null)
  }

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState]

  if (!product && readyState === ReadyState.CONNECTING) return <FullPageLoader />

  if (!product) return 'No hay productos disponibles'

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>{product.name}</h2>

          <div className={styles.imageWrapper}>
            <div className={styles.image}>
              <Image src={product.photo} layout="fill" objectFit="contain" />
            </div>
          </div>

          <p>{product.description}</p>

          <div className={styles.bid}>
            <h2>{lastBid?.value || product.initialPrice}€</h2>
            <div>
              <TextField onChange={(evt) => setBid(+evt.target.value)} value={bid} />
              <Button onClick={handleClickSendMessage}>Bid</Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.connectionStatus} data-status={connectionStatus} />
    </>
  )
}
