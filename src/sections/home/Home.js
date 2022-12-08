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

  const { product, currentBid } = useMemo(() => {
    if (lastMessage) {
      console.log(`lastMessage (${typeof lastMessage}):`, lastMessage)

      const _product = JSON.parse(lastMessage.data)

      return {
        product: _product,
        currentBid: [...(_product.bids || [])].pop().value || _product.initialPrice,
      }
    }

    return {
      product: null,
      currentBid: null,
    }
  }, [lastMessage])

  const [bid, setBid] = useState(undefined)

  // TODO: Implement debounce
  const handleSetBid = (evt) => setBid(evt.target.value)

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
          <h2>{currentBid}€</h2>
          <div>
            <div className={styles.bidInput}>
              <TextField onChange={handleSetBid} type="number" value={bid} />
              <Button onClick={handleClickSendMessage} disabled={!bid || bid <= currentBid}>
                Bid
              </Button>
            </div>
            {bid > 0 && bid <= currentBid && (
              <div className={styles.helperText}>
                <p>La puja debe ser mayor a la actual!</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <ConnectionStatus connectionStatus={connectionStatus} />
    </>
  )
}
