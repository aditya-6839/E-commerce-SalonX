import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ThemeMenu } from './components/ThemeMenu'
import { Carrot, Menu, ShoppingBag, ShoppingCart } from 'lucide-react'

function App() {

  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <ThemeMenu />
        <Button className={`mt-4`}>Click me</Button>
        
      </div>
    </>
  )
}

export default App
