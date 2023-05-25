import { Signup } from '../pages/export';

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function App() {
  
  return (
    <main className="overflow-hidden">
      <Signup />
    </main>
  )
}
