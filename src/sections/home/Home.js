import React, { useState, useMemo } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import Button from '../../common/components/Button/Button'
import TextField from '../../common/components/TextField/TextField'
import FullPageLoader from '../../common/components/FullPageLoader/FullPageLoader'
import ConnectionStatus from '../../common/components/ConnectionStatus/ConnectionStatus'
import ProductImage from './components/ProductImage/ProductImage'

// Utils
import { getConnectionStatus } from '../../common/utils/connectionStatus'

import styles from './Home.module.css'

export default function HomeSection({}) {
  //Public API that will echo messages sent to it back to the client
  const { sendJsonMessage, lastMessage, readyState } = useWebSocket(
    process.env.NEXT_PUBLIC_SOCKET_URL,
    {
      shouldReconnect: () => true, // Attempt to reconnect
      reconnectInterval: 1000,
    }
  )

  const { product, lastBid } = useMemo(() => {
    if (lastMessage) {
      console.log(`lastMessage (${typeof lastMessage}):`, lastMessage)

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

  const [bid, setBid] = useState(undefined)

  const handleClickSendMessage = () => {
    sendJsonMessage({
      event: 'bid',
      bidValue: bid,
    })

    setBid(null)
  }

  const connectionStatus = getConnectionStatus(readyState)

  if (!product || readyState === ReadyState.CONNECTING) return <FullPageLoader />

  return (
    <>
      <div className={styles.content}>
        <h2>{product.name}</h2>

        <ProductImage src={product.photo} alt={product.name} />

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
