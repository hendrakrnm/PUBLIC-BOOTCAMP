import { WagmiConfig, createClient } from 'wagmi'
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit'
import { Chain, configureChains, createClient as createWagmiClient } from 'wagmi'
import { mainnet, polygon } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public' // Menggunakan public provider
import '@rainbow-me/rainbowkit/styles.css'

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, polygon], // Menentukan jaringan yang akan digunakan
  [
    publicProvider(), // Gunakan public provider tanpa memerlukan API Key
  ]
)

// Create wagmiClient
const wagmiClient = createWagmiClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

function App({ Component, pageProps }: any) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={lightTheme()}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
