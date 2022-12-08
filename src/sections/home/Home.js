import React, { useState, useMemo } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import Button from '../../common/components/Button/Button'
import TextField from '../../common/components/TextField/TextField'
import FullPageLoader from '../../common/components/FullPageLoader/FullPageLoader'
import ConnectionStatus from '../../common/components/ConnectionStatus/ConnectionStatus'
import ProductImage from './components/ProductImage/ProductImage'

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
      <div className={styles.content}>
        <h2>{product.name}</h2>

        <ProductImage src={product.photo} />

        <p>{product.description}</p>

        <div className={styles.bid}>
          <h2>{lastBid?.value || product.initialPrice}€</h2>
          <div>
            <TextField onChange={(evt) => setBid(+evt.target.value)} value={bid} type="number" />
            <Button onClick={handleClickSendMessage}>Bid</Button>
          </div>
        </div>
      </div>
      <ConnectionStatus connectionStatus={connectionStatus} />
    </>
  )
}
